"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { z } from "zod";
import { task } from "@/schema";
import { generateTasks } from "@/ai/method";

interface ImportTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ImportTasksModal({
  isOpen,
  onClose,
  onSuccess,
}: ImportTasksModalProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validateResult, setValidateResult] = useState<string | null>(null);

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
    setValidateResult(null);
    let generatedTasks: unknown;
    try {
      generatedTasks = await generateTasks(input);
    } catch (err: unknown) {
      let message = "AI failed to generate tasks from your input.";
      if (err instanceof Error) {
        console.error(err);
        message = err.message;
      } else if (typeof err === "string") {
        message = err;
      }
      setError(message);
      setLoading(false);
      return;
    }
    const arr = Array.isArray(generatedTasks)
      ? generatedTasks
      : [generatedTasks];
    const result = z.array(task).safeParse(arr);
    if (!result.success) {
      setError(
        "Validation failed after AI generation:\n" +
          result.error.issues
            .map(
              (e) =>
                `- ${e.path.length ? `at ${e.path.join(".")}: ` : ""}${
                  e.message
                }`
            )
            .join("\n")
      );
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/task/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) throw new Error("Failed to import tasks");
      setSuccess(true);
      setInput("");
      setError(null);
      setValidateResult(null);
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      let message = "Failed to import tasks";
      if (err instanceof Error) message = err.message;
      setError(message);
    } finally {
      setLoading(false);
    }
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
          <div className="flex min-h-screen items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-[#1a2234] p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white mb-4"
                >
                  Import Tasks
                </Dialog.Title>
                <form onSubmit={handleImport} className="space-y-4">
                  <textarea
                    className="w-full h-40 p-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Describe your tasks or paste task details here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={loading}
                  />
                  {error && <div className="text-red-400 text-sm">{error}</div>}
                  {success && (
                    <div className="text-green-400 text-sm">
                      Tasks generated and imported successfully!
                    </div>
                  )}
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
                      onClick={onClose}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                      disabled={loading}
                    >
                      {loading
                        ? "Generating & Importing..."
                        : "Generate & Import"}
                    </button>
                  </div>
                  {validateResult && (
                    <div
                      className={
                        validateResult.startsWith("Validation successful")
                          ? "text-green-400 text-sm"
                          : "text-yellow-400 text-sm"
                      }
                    >
                      {validateResult}
                    </div>
                  )}
                </form>
                <div className="mt-4 text-xs text-gray-400">
                  Example: <br />
                  <pre className="whitespace-pre-wrap break-all bg-black/20 p-2 rounded mt-1 text-gray-300">
                    {`Write 3 tasks for my coding practice:
- 1 easy array/string problem
- 1 medium dynamic programming problem
- 1 hard graph problem`}
                  </pre>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
