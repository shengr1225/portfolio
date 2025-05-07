"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import TaskModal from "@/components/TaskModal";
import { task } from "@/schema";
import { z } from "zod";
import ImportTasksModal from "@/components/ImportTasksModal";
import { getWeekdayLabel } from "@/utils/date";
import WeeklyOverview from "@/components/WeeklyOverview";
import StudyPlan from "@/components/StudyPlan";
import DailyProgressLog from "@/components/DailyProgressLog";
import ImportTasksButton from "@/components/ImportTasksButton";
type TaskType = z.infer<typeof task>;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

// Helper to get start (Monday) and end (Sunday) of current week in YYYY-MM-DD
function getCurrentWeekRange() {
  const now = new Date();
  const day = now.getDay(); // 0 (Sun) - 6 (Sat)
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((day + 6) % 7));
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  function toYMD(date: Date) {
    return date.toISOString().slice(0, 10);
  }
  return { start: toYMD(monday), end: toYMD(sunday) };
}

export default function Progress() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType>();
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weeklyTasks, setWeeklyTasks] = useState<TaskType[]>([]);
  const [weeklyLoading, setWeeklyLoading] = useState(true);
  const [weeklyError, setWeeklyError] = useState<string | null>(null);
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/task");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    async function fetchWeeklyTasks() {
      setWeeklyLoading(true);
      setWeeklyError(null);
      const { start, end } = getCurrentWeekRange();
      try {
        const res = await fetch(
          `/api/task?start=${start}&end=${end}&status=complete`
        );
        if (!res.ok) throw new Error("Failed to fetch weekly tasks");
        const data = await res.json();
        setWeeklyTasks(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setWeeklyError(err.message);
        } else {
          setWeeklyError("Unknown error");
        }
      } finally {
        setWeeklyLoading(false);
      }
    }
    fetchWeeklyTasks();
  }, []);

  // Helper to map task type to color
  function getTaskColor(type: TaskType["type"]): "blue" | "green" | "purple" {
    if (type === "coding") return "blue";
    if (type === "system") return "green";
    return "purple";
  }

  // Group tasks by date
  const tasksByDate: { [date: string]: TaskType[] } = {};
  tasks.forEach((task) => {
    if (!tasksByDate[task.date]) tasksByDate[task.date] = [];
    tasksByDate[task.date].push(task);
  });

  const sortedDates = Object.keys(tasksByDate).sort();

  // Weekly Overview counts
  const codingCount = weeklyTasks.filter((t) => t.type === "coding").length;
  const systemCount = weeklyTasks.filter((t) => t.type === "system").length;
  const projectBehaviorCount = weeklyTasks.filter(
    (t) => t.type === "project" || t.type === "behavior"
  ).length;

  const handleStartTask = (task: TaskType) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/task/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      // Update the tasks state by removing the deleted task
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleTaskSubmit = async (taskData: TaskType) => {
    // Here you would typically save the task data to your backend
    const response = await fetch(`/api/task/${selectedTask?.id}`, {
      method: "PUT",
      body: JSON.stringify(taskData),
    });
    const task = await response.json();
    task.id = selectedTask?.id;
    //update the selected task in the tasks array
    setTasks(tasks.map((t) => (t.id === selectedTask?.id ? task : t)));
  };

  return (
    <>
      <Navigation />
      <div className="relative min-h-screen bg-[#0B1120]">
        <div className="relative pt-20 px-4 sm:px-6 lg:px-8 pb-8">
          {/* Import Tasks Button */}
          <div className="flex justify-end mb-4">
            <ImportTasksButton onClick={() => setIsImportModalOpen(true)} />
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                Interview Preparation Progress
              </h1>
              <p className="text-xl text-gray-300">
                Track your journey to success
              </p>
            </motion.div>

            {/* Weekly Overview */}
            <WeeklyOverview
              codingCount={codingCount}
              systemCount={systemCount}
              projectBehaviorCount={projectBehaviorCount}
              loading={weeklyLoading}
              error={weeklyError}
            />

            {/* Daily Plan */}
            <StudyPlan
              tasksByDate={tasksByDate}
              sortedDates={sortedDates}
              loading={loading}
              error={error}
              onStartTask={handleStartTask}
              onDeleteTask={handleDeleteTask}
              getTaskColor={getTaskColor}
              getWeekdayLabel={getWeekdayLabel}
            />

            {/* Daily Log */}
            <DailyProgressLog />
          </motion.div>
        </div>
      </div>
      {selectedTask && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(undefined);
          }}
          task={selectedTask}
          onSubmit={handleTaskSubmit}
        />
      )}
      <ImportTasksModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onSuccess={() => setIsImportModalOpen(false)}
      />
    </>
  );
}
