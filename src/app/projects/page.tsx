"use client";

import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import projectsData from "@/data/projects.json";
import ProjectCard from "@/components/ProjectCard";
import type { ProjectCardProps } from "@/components/ProjectCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Projects() {
  const projects = projectsData.projects as Omit<
    ProjectCardProps,
    "variants"
  >[];

  return (
    <>
      <Navigation />
      <div className="relative min-h-screen bg-[#0B1120]">
        <div className="relative pt-20 px-4 sm:px-6 lg:px-8 pb-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                Professional Experience
              </h1>
              <p className="text-xl text-gray-300">
                Building innovative solutions through technology
              </p>
            </motion.div>

            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
