"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { taskSummaryArray, taskSummary } from "@/schema";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import NavigationButton from "@/components/NavigationButton";
import TrackerUI from "@/components/TrackerUI";

const Page = () => {
  const [isMobile, setIsMobile] = useState(false);

  // State for today, week, month
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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Fetch for today, this week and this month
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

        // Set the summary for today, week and month
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-3 rounded-lg bg-white/5">
            <TrackerUI
              progress={summary.progress}
              title={`${title} Progress`}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#0B1120] overflow-hidden relative">
      <Navigation />

      <Hero isMobile={isMobile} />
      <Projects />
      <NavigationButton text="View Timeline" targetId="timeline-section" />

      {/* Timeline Section: Today */}
      <section id="timeline-section" className="relative z-10 py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
            Today&apos;s Tasks
          </h2>
          <div className="relative max-w-screen-lg mx-auto px-2 sm:px-6">
            <div className="relative">
              {renderSummarySection("Today", todaySummary, loading, error)}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section: This Week */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
            This Week&apos;s Tasks
          </h2>
          <div className="relative max-w-screen-lg mx-auto px-2 sm:px-6">
            <div className="relative">
              {renderSummarySection("Week", weekSummary, loading, error)}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section: This Month */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
            This Month&apos;s Tasks
          </h2>
          <div className="relative max-w-screen-lg mx-auto px-2 sm:px-6">
            <div className="relative">
              {renderSummarySection("Month", monthSummary, loading, error)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
