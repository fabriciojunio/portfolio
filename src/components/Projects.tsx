import { useMemo, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "data-science", label: "Ciência de Dados" },
  { id: "full-stack", label: "Full Stack" },
  { id: "mobile", label: "Mobile" },
  { id: "java", label: "Java" },
  { id: "python", label: "Python" },
  { id: "javascript", label: "JavaScript" },
  { id: "go", label: "Go" },
];

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const visible = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.filters.includes(filter));
  }, [filter]);

  return (
    <section id="projetos" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
      <p className="font-mono text-[11px] uppercase tracking-[2px] text-accent-green mb-2">
        projetos
      </p>
      <h2 className="text-[22px] font-semibold text-text-primary">O que construí</h2>
      <p className="text-[13px] text-text-secondary mt-1">
        20 projetos, 6 linguagens, do Data Science ao Full Stack, Mobile e Infra
      </p>

      <div className="flex gap-2 mt-6 overflow-x-auto pb-2 -mx-2 px-2 snap-x">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => {
                setFilter(f.id);
                setExpandedId(null);
              }}
              className={`shrink-0 snap-start text-[12px] font-mono px-3 py-1.5 rounded-md border transition ${
                active
                  ? "text-accent-green border-[rgba(74,222,128,0.2)] bg-[rgba(74,222,128,0.1)]"
                  : "text-text-muted border-border hover:text-text-primary"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <LayoutGroup>
        <motion.div layout className="mt-6 grid md:grid-cols-2 gap-3 items-start">
          {visible.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              expanded={expandedId === p.id}
              onToggle={() => setExpandedId(expandedId === p.id ? null : p.id)}
            />
          ))}
        </motion.div>
      </LayoutGroup>
    </section>
  );
}
