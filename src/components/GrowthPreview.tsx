"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { taskSummaryArray, taskSummary } from "@/schema";
import Link from "next/link";
import { motion } from "framer-motion";

const GrowthPreview = () => {
  const [todaySummary, setTodaySummary] = useState<z.infer<
    typeof taskSummary
  > | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchToday() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/task/prompt", {
          method: "POST",
          body: JSON.stringify({
            type: "month",
          }),
        });
        const object = (await response.json()) as z.infer<
          typeof taskSummaryArray
        >;
        console.log(object);
        setTodaySummary(object.length > 0 ? object[0] : null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchToday();
  }, []);

  return (
    <section className="relative z-10 py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-screen-lg mx-auto">
          <div className="space-y-6">
            <div className="text-center space-y-2 pb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Personal AI Assistant
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                My dedicated AI companion for tracking and optimizing career
                growth, learning progress, and skill development
              </p>
            </div>

            {loading ? (
              <div className="text-center text-gray-400 py-8">
                Loading growth preview...
              </div>
            ) : error ? (
              <div className="text-center text-red-400 py-8">{error}</div>
            ) : !todaySummary ? (
              <div className="text-center text-gray-400 py-8">
                No growth data available.
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl p-6 hover:bg-white/[0.05] transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      This Month&apos;s Progress
                    </h3>
                  </div>
                  <Link
                    href="/growth"
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View All →
                  </Link>
                </div>

                <div className="space-y-4">
                  <div className="text-sm text-gray-400">
                    {todaySummary.date}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Milestones Card */}
                    <div className="p-4 rounded-lg bg-white/[0.05] border border-white/[0.1]">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <h4 className="text-sm font-medium text-white text-center mb-3">
                        Milestones Achieved
                      </h4>
                      <div className="space-y-2 text-center">
                        <div className="text-2xl font-bold text-green-400">
                          {todaySummary.progress.find(
                            (p) => p.type === "project"
                          )?.count || 0}
                        </div>
                        <p className="text-gray-300 text-sm line-clamp-3">
                          {todaySummary.majorMilestones}
                        </p>
                      </div>
                    </div>

                    {/* Productivity Card */}
                    <div className="p-4 rounded-lg bg-white/[0.05] border border-white/[0.1]">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                          </svg>
                        </div>
                      </div>
                      <h4 className="text-sm font-medium text-white text-center mb-3">
                        Overall Productivity
                      </h4>
                      <div className="space-y-2 text-center">
                        <div className="text-2xl font-bold text-blue-400">
                          {todaySummary.progress.reduce(
                            (sum, p) => sum + p.count,
                            0
                          )}
                        </div>
                        <p className="text-gray-300 text-sm line-clamp-3">
                          {todaySummary.productivity}
                        </p>
                      </div>
                    </div>

                    {/* Strategic Patterns */}
                    <div className="p-4 rounded-lg bg-white/[0.05] border border-white/[0.1]">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-yellow-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        </div>
                      </div>
                      <h4 className="text-sm font-medium text-white text-center mb-3">
                        Strategic Patterns
                      </h4>
                      <div className="space-y-2 text-center">
                        <div className="text-2xl font-bold text-yellow-400">
                          {todaySummary.progress.find(
                            (p) => p.type === "behavior"
                          )?.count || 0}
                        </div>
                        <p className="text-gray-300 text-sm line-clamp-3">
                          {todaySummary.strategyPatterns}
                        </p>
                      </div>
                    </div>
                  </div>

                  {todaySummary.improvement && (
                    <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <h4 className="text-sm font-medium text-blue-400 mb-1">
                        Areas for Improvement
                      </h4>
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {todaySummary.improvement}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {todaySummary.progress.map((item, index) => (
                      <div
                        key={index}
                        className="p-2 rounded-lg bg-white/5 text-center"
                      >
                        <div className="text-sm text-gray-400">{item.type}</div>
                        <div className="text-lg font-semibold text-white">
                          {item.count}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthPreview;
