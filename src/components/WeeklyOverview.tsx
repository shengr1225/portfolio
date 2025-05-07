import { motion } from "framer-motion";

interface WeeklyOverviewProps {
  codingCount: number;
  systemCount: number;
  projectBehaviorCount: number;
  loading: boolean;
  error: string | null;
}

export default function WeeklyOverview({
  codingCount,
  systemCount,
  projectBehaviorCount,
  loading,
  error,
}: WeeklyOverviewProps) {
  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
      }}
      className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/10 p-8 mb-8"
    >
      <h2 className="text-2xl font-semibold text-white mb-6">
        Weekly Overview
      </h2>
      {loading ? (
        <div className="text-center text-gray-400">Loading weekly tasks...</div>
      ) : error ? (
        <div className="text-center text-red-400">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-6 backdrop-blur-sm border border-blue-500/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative z-10">
              <h3 className="font-medium text-blue-300">Coding Problems</h3>
              <p className="text-4xl font-bold text-blue-200 mt-2">
                {codingCount}/7
              </p>
              <p className="text-sm text-blue-300 mt-1">Target: 1-2/day</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/20 p-6 backdrop-blur-sm border border-green-500/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative z-10">
              <h3 className="font-medium text-green-300">System Design</h3>
              <p className="text-4xl font-bold text-green-200 mt-2">
                {systemCount}/2
              </p>
              <p className="text-sm text-green-300 mt-1">
                Target: Study + 1 Design
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent" />
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-6 backdrop-blur-sm border border-purple-500/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative z-10">
              <h3 className="font-medium text-purple-300">
                Project & Behavioral
              </h3>
              <p className="text-4xl font-bold text-purple-200 mt-2">
                {projectBehaviorCount}/3
              </p>
              <p className="text-sm text-purple-300 mt-1">
                Target: Daily Updates
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
