import { motion, Variants } from "framer-motion";
import PreviewImage from "./PreviewImage";

interface Technology {
  name: string;
  color: string;
}

interface SubProject {
  name: string;
  previewImage: string;
  previewAlt: string;
  showInVertical?: boolean;
  description: string;
  demoLink?: string;
  technologies: Technology[];
}

export interface ProjectCardProps {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  previewImage?: string;
  previewAlt?: string;
  isVertical?: boolean;
  description?: string[] | string;
  summary?: string;
  demoLink?: string;
  websiteLink?: string;
  technologies: Technology[];
  projects?: SubProject[];
  variants: Variants;
}

const TechnologyBadge = ({ name, color }: Technology) => (
  <span
    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-gradient-to-r from-${color}-500/20 to-${color}-600/20 text-${color}-300 border border-${color}-500/20`}
  >
    {name}
  </span>
);

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 border border-blue-500/20 hover:from-blue-500/30 hover:to-blue-600/30 transition-colors"
  >
    <span>{children}</span>
    <svg
      className="w-4 h-4 ml-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  </a>
);

export default function ProjectCard({
  id,
  company,
  role,
  period,
  location,
  previewImage,
  previewAlt,
  isVertical,
  description,
  summary,
  demoLink,
  websiteLink,
  technologies,
  projects,
  variants,
}: ProjectCardProps) {
  return (
    <motion.div
      key={id}
      variants={variants}
      className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/10 p-8 mb-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">{company}</h2>
          <h3 className="text-xl text-blue-400">{role}</h3>
        </div>
        <div className="text-gray-400 mt-2 md:mt-0">
          {period} • {location}
        </div>
      </div>
      <div className="prose prose-invert max-w-none">
        {projects ? (
          // Render sub-projects (like OPeach Studio case)
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((subProject, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {subProject.name}
                </h4>
                <div className="mb-4">
                  <PreviewImage
                    src={subProject.previewImage}
                    alt={subProject.previewAlt}
                    showInVertical={subProject.showInVertical}
                  />
                </div>
                <p className="text-gray-300 mb-4">{subProject.description}</p>
                <div className="flex flex-wrap gap-2">
                  {subProject.demoLink && (
                    <ExternalLink href={subProject.demoLink}>
                      Live Demo
                    </ExternalLink>
                  )}
                  {subProject.technologies.map((tech, techIndex) => (
                    <TechnologyBadge
                      key={techIndex}
                      name={tech.name}
                      color={tech.color}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Render single project
          <>
            {previewImage && (
              <div className="mb-6">
                <PreviewImage
                  src={previewImage}
                  alt={previewAlt || ""}
                  isVertical={isVertical}
                />
              </div>
            )}
            {summary && <p className="text-gray-300 mb-4">{summary}</p>}
            {description && (
              <ul className="list-disc pl-4 text-gray-300 space-y-2">
                {(Array.isArray(description) ? description : [description]).map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {demoLink && (
                <ExternalLink href={demoLink}>Live Demo</ExternalLink>
              )}
              {websiteLink && (
                <ExternalLink href={websiteLink}>Visit Website</ExternalLink>
              )}
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <TechnologyBadge
                    key={index}
                    name={tech.name}
                    color={tech.color}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
