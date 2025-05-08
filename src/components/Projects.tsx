import { motion } from "framer-motion";

const Projects = () => {
  return (
    <section
      id="projects-section"
      className="relative z-10 py-24 bg-gradient-to-b from-[#0B1120] to-[#0B1120]/95"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Featured Projects & Expertise
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Building innovative solutions with cutting-edge technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Pominis AI Platform */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl p-6 hover:bg-white/[0.05] transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
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
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Pominis AI</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Enterprise AI platform for intelligent automation and
              decision-making
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-full">
                React Flow
              </span>
              <span className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-full">
                Multi-Agent
              </span>
              <span className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-full">
                React
              </span>
              <span className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-full">
                Firebase
              </span>
              <span className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-full">
                Google Sheets API
              </span>
            </div>
          </motion.div>

          {/* Tomsms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl p-6 hover:bg-white/[0.05] transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Tomsms</h3>
            </div>
            <p className="text-gray-400 mb-4">
              AI-powered SMS marketing platform with advanced analytics
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 text-sm bg-purple-500/10 text-purple-400 rounded-full">
                Node.js
              </span>
              <span className="px-3 py-1 text-sm bg-purple-500/10 text-purple-400 rounded-full">
                Chart.js
              </span>
              <span className="px-3 py-1 text-sm bg-purple-500/10 text-purple-400 rounded-full">
                React
              </span>
              <span className="px-3 py-1 text-sm bg-purple-500/10 text-purple-400 rounded-full">
                WPGraphQL
              </span>
              <span className="px-3 py-1 text-sm bg-purple-500/10 text-purple-400 rounded-full">
                TailwindCSS
              </span>
            </div>
          </motion.div>

          {/* SFMeal.com */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl p-6 hover:bg-white/[0.05] transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">SFMeal.com</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Food delivery platform connecting local restaurants with customers
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 text-sm bg-green-500/10 text-green-400 rounded-full">
                Sail.js
              </span>
              <span className="px-3 py-1 text-sm bg-green-500/10 text-green-400 rounded-full">
                Node.js
              </span>
              <span className="px-3 py-1 text-sm bg-green-500/10 text-green-400 rounded-full">
                MongoDB
              </span>
              <span className="px-3 py-1 text-sm bg-green-500/10 text-green-400 rounded-full">
                AWS
              </span>
              <span className="px-3 py-1 text-sm bg-green-500/10 text-green-400 rounded-full">
                Stripe
              </span>
            </div>
          </motion.div>
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <a
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all border border-blue-500/20 hover:border-blue-500/40"
          >
            View All Projects
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Technical Expertise
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                category: "Frontend",
                skills: ["React", "Next.js", "TypeScript", "TailwindCSS"],
              },
              {
                category: "Backend",
                skills: ["Node.js", "NoSQL", "PostgreSQL", "GraphQL"],
              },
              {
                category: "AI",
                skills: [
                  "reAct",
                  "Agentic Framework",
                  "Workflow",
                  "Multi-Agent",
                ],
              },
              {
                category: "DevOps",
                skills: ["AWS", "Firebase", "Vercel", "Inggest"],
              },
            ].map((group, index) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl p-4"
              >
                <h4 className="text-lg font-semibold text-white mb-3">
                  {group.category}
                </h4>
                <div className="space-y-2">
                  {group.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                      <span className="text-gray-400 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
