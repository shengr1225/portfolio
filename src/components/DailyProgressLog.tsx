import { motion } from "framer-motion";

export default function DailyProgressLog() {
  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
      }}
      className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/10 p-8"
    >
      <h2 className="text-2xl font-semibold text-white mb-6">
        Daily Progress Log
      </h2>
      <div className="space-y-4">
        <motion.div
          className="relative overflow-hidden rounded-lg bg-white/5 p-4 hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-white">
                LeetCode #1: Two Sum (Easy)
              </h3>
              <p className="text-gray-300 mt-1">
                Completed with Time: O(n), Space: O(n)
              </p>
            </div>
            <span className="text-sm text-gray-400">Today</span>
          </div>
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-blue-600" />
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-lg bg-white/5 p-4 hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-white">
                System Design: URL Shortener
              </h3>
              <p className="text-gray-300 mt-1">
                Completed with focus on scalability and reliability
              </p>
            </div>
            <span className="text-sm text-gray-400">Yesterday</span>
          </div>
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-green-400 to-green-600" />
        </motion.div>
      </div>
    </motion.div>
  );
}
