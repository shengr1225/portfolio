"use client";

import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { z } from "zod";
import { attempt, task } from "@/schema";
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";

type TaskType = z.infer<typeof task>;

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskType;
  onSubmit: (taskData: TaskType) => void;
}

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function TaskModal({
  isOpen,
  onClose,
  task,
  onSubmit,
}: TaskModalProps) {
  const [attempts, setAttempts] = useState<z.infer<typeof attempt>[]>([
    { input: "function add(a, b) {\n  return a + b;\n}", timeUsed: 0 },
  ]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [comment, setComment] = useState("");
  const [currentAttemptIndex, setCurrentAttemptIndex] = useState(0);
  const [taskName, setTaskName] = useState("");
  const [taskType, setTaskType] = useState<TaskType["type"]>("coding");

  useEffect(() => {
    if (isOpen) {
      if (task.attempts && task.attempts.length > 0) {
        setAttempts(task.attempts);
      } else {
        setAttempts([
          { input: "function add(a, b) {\n  return a + b;\n}", timeUsed: 0 },
        ]);
      }
      setComment(task.comment || "");
      setTaskName(task.name);
      setTaskType(task.type);
      setCurrentAttemptIndex(0);
      setStartTime(null);
      setCurrentTime(0);
    }
  }, [isOpen, task]);

  useEffect(() => {
    if (startTime) {
      const timer = setInterval(() => {
        setCurrentTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAttempts = attempts.map((attempt, index) => {
      if (index === attempts.length - 1) {
        return { ...attempt, timeUsed: currentTime };
      }
      return attempt;
    });
    setAttempts(newAttempts);
    onSubmit({
      type: taskType,
      attempts: newAttempts,
      comment,
      status: "complete",
      name: taskName,
      date: task.date,
    });
    onClose();
  };

  const addAttempt = () => {
    // Save current attempt with current time
    const updatedAttempts = attempts.map((attempt, index) => {
      if (index === attempts.length - 1) {
        // Only update the time for the current (last) attempt
        return { ...attempt, timeUsed: currentTime };
      }
      return attempt;
    });

    // Add new attempt and reset timer
    setAttempts([...updatedAttempts, { input: "", timeUsed: 0 }]);
    setCurrentAttemptIndex(attempts.length);
    setStartTime(null);
    setCurrentTime(0);
  };

  const updateAttempt = (index: number, value: string) => {
    const newAttempts = [...attempts];
    newAttempts[index] = { ...newAttempts[index], input: value };
    setAttempts(newAttempts);
    if (!startTime) {
      setStartTime(Date.now());
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-screen h-screen transform overflow-hidden bg-[#1a2234] border-0 p-8 text-left align-middle shadow-xl transition-all">
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-medium leading-6 text-white"
                    >
                      Edit Task
                    </Dialog.Title>
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-gray-400 hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <form
                      onSubmit={handleSubmit}
                      className="h-full flex flex-col space-y-6"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-300">
                            Task Name
                          </label>
                          <input
                            type="text"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400"
                            placeholder="Enter task name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-300">
                            Task Type
                          </label>
                          <select
                            value={taskType}
                            onChange={(e) =>
                              setTaskType(e.target.value as TaskType["type"])
                            }
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                            required
                          >
                            <option value="coding">Coding</option>
                            <option value="system">System Design</option>
                            <option value="behavior">Behavioral</option>
                            <option value="project">Project</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-2">
                          {attempts.map((_, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {
                                // Only switch if clicking a different attempt
                                if (currentAttemptIndex !== index) {
                                  // Save current attempt time before switching
                                  const updatedAttempts = attempts.map(
                                    (attempt, i) => {
                                      if (i === currentAttemptIndex) {
                                        return {
                                          ...attempt,
                                          timeUsed: currentTime,
                                        };
                                      }
                                      return attempt;
                                    }
                                  );
                                  setAttempts(updatedAttempts);
                                  setCurrentAttemptIndex(index);
                                  setStartTime(null);
                                  setCurrentTime(0);
                                }
                              }}
                              className={`px-3 py-1 text-sm font-medium rounded-lg ${
                                currentAttemptIndex === index
                                  ? "bg-blue-500 text-white"
                                  : "bg-white/5 text-gray-300 hover:bg-white/10"
                              }`}
                            >
                              Attempt {index + 1}
                            </button>
                          ))}
                        </div>
                        {startTime && (
                          <span className="text-sm text-blue-400">
                            Time: {formatTime(currentTime)}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <CodeEditor
                          value={attempts[currentAttemptIndex].input}
                          onChange={(evn) =>
                            updateAttempt(currentAttemptIndex, evn.target.value)
                          }
                          placeholder="Enter your code here..."
                          language="js"
                          padding={16}
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            borderRadius: "0.5rem",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            fontSize: "13px",
                            lineHeight: "1.5",
                            minHeight: "300px",
                            color: "white",
                          }}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={addAttempt}
                        className="text-sm text-blue-400 hover:text-blue-300"
                      >
                        + Add another attempt
                      </button>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          Comments
                        </label>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Additional notes, learnings, or areas for improvement"
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 h-24"
                        />
                      </div>

                      <div className="flex justify-end gap-3 mt-auto pt-4 border-t border-white/10">
                        <button
                          type="button"
                          onClick={onClose}
                          className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Save Progress
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
