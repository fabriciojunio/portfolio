import { motion } from "framer-motion";
import type { Project } from "../types";
import ProjectDetail from "./ProjectDetail";

interface Props {
  project: Project;
  expanded: boolean;
  onToggle: () => void;
}

export default function ProjectCard({ project, expanded, onToggle }: Props) {
  return (
    <motion.article
      layout
      transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      onClick={onToggle}
      className={`group cursor-pointer bg-card border border-border rounded-lg p-5 transition-colors hover:border-[rgba(255,255,255,0.12)] ${
        expanded ? "md:col-span-2" : ""
      }`}
    >
      <motion.div layout="position">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: project.dotColor }}
            />
            <h3 className="font-mono text-[14px] text-[#e2e8f0] truncate">{project.name}</h3>
          </div>
          <span
            className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shrink-0"
            style={{
              color: project.tagColor,
              backgroundColor: `${project.tagColor}1a`,
              border: `1px solid ${project.tagColor}33`,
            }}
          >
            {project.tags[0]}
          </span>
        </div>

        {!expanded && (
          <>
            <p className="text-[12px] text-text-secondary mt-2 leading-relaxed line-clamp-2">
              {project.shortDesc}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.techStack.slice(0, 4).map((t) => (
                <span
                  key={t.name}
                  className="text-[10px] px-2 py-0.5 rounded"
                  style={{
                    color: t.color,
                    backgroundColor: `${t.color}1a`,
                    border: `1px solid ${t.color}22`,
                  }}
                >
                  {t.name}
                </span>
              ))}
            </div>
          </>
        )}
      </motion.div>

      {expanded && (
        <motion.div
          layout="position"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.15 }}
          onClick={(e) => e.stopPropagation()}
        >
          <ProjectDetail project={project} />
        </motion.div>
      )}
    </motion.article>
  );
}
