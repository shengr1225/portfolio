"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const navVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const linkVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const Navigation = () => {
  const isDevelopment = process.env.NODE_ENV === "development";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="fixed top-0 left-0 right-0 bg-black/10 backdrop-blur-md z-50 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="flex justify-between h-16 items-center">
          <motion.div
            className="flex items-center"
            whileHover="hover"
            variants={linkVariants}
          >
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                <Image
                  src="/profile.jpeg"
                  alt="Sheng Rong"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Sheng Rong
              </span>
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isDevelopment && (
              <motion.div whileHover="hover" variants={linkVariants}>
                <Link
                  href="/progress"
                  className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white transition-colors group whitespace-nowrap"
                >
                  <span className="relative z-10">Progress</span>
                  <motion.div
                    className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.div>
            )}

            <motion.div whileHover="hover" variants={linkVariants}>
              <Link
                href="/growth"
                className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white transition-colors group whitespace-nowrap"
              >
                <span className="relative z-10">Growth</span>
                <motion.div
                  className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </motion.div>

            <motion.div whileHover="hover" variants={linkVariants}>
              <Link
                href="/projects"
                className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white transition-colors group whitespace-nowrap"
              >
                <span className="relative z-10">Projects</span>
                <motion.div
                  className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </motion.div>

            <motion.div whileHover="hover" variants={linkVariants}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white transition-colors group whitespace-nowrap"
              >
                <span className="relative z-10">Resume</span>
                <motion.div
                  className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isDevelopment && (
              <Link
                href="/progress"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Progress
              </Link>
            )}
            <Link
              href="/growth"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              Growth
            </Link>
            <Link
              href="/projects"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              Resume
            </a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
