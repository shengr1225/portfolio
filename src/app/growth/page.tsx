"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { taskSummaryArray, taskSummary } from "@/schema";
import Navigation from "@/components/Navigation";
import TrackerUI from "@/components/TrackerUI";

const GrowthPage = () => {
  const [todaySummary, setTodaySummary] = useState<z.infer<
    typeof taskSummary
  > | null>(null);
  const [weekSummary, setWeekSummary] = useState<z.infer<
    typeof taskSummary
  > | null>(null);
  const [monthSummary, setMonthSummary] = useState<z.infer<
    typeof taskSummary
  > | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/task/prompt", {
          method: "POST",
          body: JSON.stringify({
            type: "all",
          }),
        });
        const object = (await response.json()) as z.infer<
          typeof taskSummaryArray
        >;

        setTodaySummary(object.filter((o) => o.type === "today")[0]);
        setWeekSummary(object.filter((o) => o.type === "week")[0]);
        setMonthSummary(object.filter((o) => o.type === "month")[0]);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const renderSummarySection = (
    title: string,
    summary: z.infer<typeof taskSummary> | null,
    loading: boolean,
    error: string | null
  ) => {
    if (loading) {
      return <div className="text-center text-gray-400">Loading tasks...</div>;
    }

    if (error) {
      return <div className="text-center text-red-400">{error}</div>;
    }

    if (!summary) {
      return (
        <div className="text-center text-gray-400">No tasks available.</div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-400">{summary.date}</div>
        <div className="text-gray-300">{summary.summary}</div>
        {summary.improvement && (
          <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <h4 className="text-sm font-medium text-blue-400 mb-2">
              Areas for Improvement
            </h4>
            <p className="text-gray-300 text-sm">{summary.improvement}</p>
          </div>
        )}
        {summary.progress && summary.progress.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-3 rounded-lg bg-white/5">
              <TrackerUI
                progress={summary.progress}
                title={`${title} Progress`}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#0B1120] overflow-hidden relative">
      <Navigation />

      <div className="pt-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-8">
            Growth & Progress
          </h1>

          {/* Today's Progress */}
          <section className="mb-16">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
              Today&apos;s Progress
            </h2>
            <div className="relative max-w-screen-lg mx-auto px-2 sm:px-6">
              <div className="relative">
                {renderSummarySection("Today", todaySummary, loading, error)}
              </div>
            </div>
          </section>

          {/* This Week's Progress */}
          <section className="mb-16">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
              This Week&apos;s Progress
            </h2>
            <div className="relative max-w-screen-lg mx-auto px-2 sm:px-6">
              <div className="relative">
                {renderSummarySection("Week", weekSummary, loading, error)}
              </div>
            </div>
          </section>

          {/* This Month's Progress */}
          <section className="mb-16">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
              This Month&apos;s Progress
            </h2>
            <div className="relative max-w-screen-lg mx-auto px-2 sm:px-6">
              <div className="relative">
                {loading ? (
                  <div className="text-center text-gray-400">
                    Loading tasks...
                  </div>
                ) : error ? (
                  <div className="text-center text-red-400">{error}</div>
                ) : !monthSummary ? (
                  <div className="text-center text-gray-400">
                    No tasks available.
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm text-gray-400">
                      {monthSummary.date}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Milestones Card */}
                      <div className="p-4 rounded-lg bg-white/[0.05] border border-white/[0.1]">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-green-400"
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
                          <h4 className="text-sm font-medium text-white">
                            Milestones Achieved
                          </h4>
                        </div>
                        <p className="text-gray-300 text-sm">
                          {monthSummary.majorMilestones}
                        </p>
                      </div>

                      {/* Productivity Card */}
                      <div className="p-4 rounded-lg bg-white/[0.05] border border-white/[0.1]">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-blue-400"
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
                          <h4 className="text-sm font-medium text-white">
                            Overall Productivity
                          </h4>
                        </div>
                        <p className="text-gray-300 text-sm">
                          {monthSummary.productivity}
                        </p>
                      </div>

                      {/* Accomplishments Card */}
                      <div className="p-4 rounded-lg bg-white/[0.05] border border-white/[0.1]">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-purple-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                              />
                            </svg>
                          </div>
                          <h4 className="text-sm font-medium text-white">
                            Key Accomplishments
                          </h4>
                        </div>
                        <p className="text-gray-300 text-sm">
                          {monthSummary.accomplishments}
                        </p>
                      </div>

                      {/* Strategic Patterns */}
                      <div className="p-4 rounded-lg bg-white/[0.05] border border-white/[0.1]">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-yellow-400"
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
                          <h4 className="text-sm font-medium text-white">
                            Strategic Patterns
                          </h4>
                        </div>
                        <p className="text-gray-300 text-sm">
                          {monthSummary.strategyPatterns}
                        </p>
                      </div>
                    </div>

                    {monthSummary.improvement && (
                      <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <h4 className="text-sm font-medium text-blue-400 mb-1">
                          Areas for Improvement
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {monthSummary.improvement}
                        </p>
                      </div>
                    )}

                    {monthSummary.progress &&
                      monthSummary.progress.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          {monthSummary.progress.map((item, index) => (
                            <div
                              key={index}
                              className="p-2 rounded-lg bg-white/5 text-center"
                            >
                              <div className="text-sm text-gray-400">
                                {item.type}
                              </div>
                              <div className="text-lg font-semibold text-white">
                                {item.count}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default GrowthPage;
