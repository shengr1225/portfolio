import { motion } from "framer-motion";
import TaskCard from "@/components/TaskCard";
import { z } from "zod";
import { task } from "@/schema";
import { useState } from "react";

type TaskType = z.infer<typeof task>;

interface StudyPlanProps {
  tasksByDate: { [date: string]: TaskType[] };
  sortedDates: string[];
  loading: boolean;
  error: string | null;
  onStartTask: (task: TaskType) => void;
  onDeleteTask: (taskId: string | undefined) => void;
  getTaskColor: (type: TaskType["type"]) => "blue" | "green" | "purple";
  getWeekdayLabel: (date: string) => string;
}

export default function StudyPlan({
  tasksByDate,
  sortedDates,
  loading,
  error,
  onStartTask,
  onDeleteTask,
  getTaskColor,
  getWeekdayLabel,
}: StudyPlanProps) {
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set());

  // Group dates by week
  const datesByWeek: { [weekStart: string]: string[] } = {};
  sortedDates.forEach((date) => {
    const weekStart = new Date(date);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Set to Sunday
    const weekKey = weekStart.toISOString().split("T")[0];
    if (!datesByWeek[weekKey]) {
      datesByWeek[weekKey] = [];
    }
    datesByWeek[weekKey].push(date);
  });

  // Get today's date in YYYY-MM-DD format in local timezone
  const today = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  });
  const [month, day, year] = today.split(",")[0].split("/");
  const formattedToday = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

  const toggleWeek = (weekKey: string) => {
    setExpandedWeeks((prev) => {
      const next = new Set(prev);
      if (next.has(weekKey)) {
        next.delete(weekKey);
      } else {
        next.add(weekKey);
      }
      return next;
    });
  };

  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
      }}
      className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/10 p-4 mb-4 md:p-8 md:mb-8"
    >
      <h2 className="text-lg md:text-2xl font-semibold text-white mb-4 md:mb-6">
        Study Plan
      </h2>
      <div className="space-y-4 md:space-y-6">
        {loading ? (
          <div className="text-center text-gray-400">Loading tasks...</div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : sortedDates.length === 0 ? (
          <div className="text-center text-gray-400">No tasks found.</div>
        ) : (
          Object.entries(datesByWeek).map(([weekKey, weekDates]) => {
            const isCurrentWeek = weekDates.some(
              (date) => date && date >= formattedToday
            );
            const isExpanded = expandedWeeks.has(weekKey) || isCurrentWeek;
            const weekStart = new Date(weekKey);
            const weekEnd = new Date(weekKey);
            weekEnd.setDate(weekEnd.getDate() + 6);
            const weekLabel = `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;

            return (
              <div
                key={weekKey}
                className="border border-white/10 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleWeek(weekKey)}
                  className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors flex justify-between items-center"
                >
                  <span className="text-white font-medium">{weekLabel}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transform transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isExpanded && (
                  <div className="p-4 space-y-4">
                    {weekDates.map((date) => (
                      <motion.div
                        key={date}
                        className={`relative overflow-hidden rounded-lg bg-white/5 p-3 md:p-6 hover:bg-white/10 transition-colors ${
                          date === formattedToday ? "ring-2 ring-blue-500" : ""
                        }`}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex flex-col">
                          <h3 className="text-base md:text-lg font-medium text-white">
                            {getWeekdayLabel(date)}
                            {date === formattedToday && (
                              <span className="ml-2 text-sm text-blue-400">
                                (Today)
                              </span>
                            )}
                          </h3>
                          <div className="mt-2 md:mt-4 space-y-1 md:space-y-2">
                            {tasksByDate[date].map((task) => (
                              <TaskCard
                                key={task.id}
                                label={task.name}
                                color={getTaskColor(task.type)}
                                checked={task.status === "complete"}
                                startLabel={
                                  task.status === "complete"
                                    ? "Review"
                                    : "Start"
                                }
                                onStart={() => {
                                  onStartTask(task);
                                }}
                                onDelete={() =>
                                  task.id && onDeleteTask(task.id)
                                }
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
