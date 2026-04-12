import { FiGithub, FiExternalLink } from "react-icons/fi";
import type { Project } from "../types";

interface Props {
  project: Project;
}

export default function ProjectDetail({ project }: Props) {
  return (
    <div className="pt-4 space-y-5">
      <div className="font-mono text-[11px] text-text-muted">
        projetos / <span style={{ color: "#4ade80" }}>{project.id}</span>
      </div>

      <div className="flex items-start gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: project.dotColor }}
          />
          <h3 className="font-mono text-[18px] text-[#e2e8f0]">{project.name}</h3>
        </div>
        <div className="flex gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded"
              style={{
                color: project.tagColor,
                backgroundColor: `${project.tagColor}1a`,
                border: `1px solid ${project.tagColor}33`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <p className="text-[13px] text-text-secondary leading-relaxed">{project.longDesc}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {project.metrics.map((m) => (
          <div
            key={m.label}
            className="bg-[rgba(255,255,255,0.02)] border border-border rounded-md p-3"
          >
            <div className="font-mono text-[18px] font-bold" style={{ color: m.color }}>
              {m.value}
            </div>
            <div className="text-[9px] uppercase tracking-[0.5px] text-text-muted mt-0.5">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-mono text-[11px] uppercase tracking-[1px] text-accent-green mb-2">
          // O que faz
        </h4>
        <ol className="space-y-2">
          {project.features.map((f, i) => (
            <li key={i} className="flex gap-3 text-[12px] text-[#cbd5e1]">
              <span className="font-mono text-[11px] text-accent-green mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-relaxed">{f}</span>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h4 className="font-mono text-[11px] uppercase tracking-[1px] text-accent-green mb-2">
          // Arquitetura
        </h4>
        <pre className="bg-[rgba(255,255,255,0.02)] border border-border rounded-md p-4 font-mono text-[11px] text-[#cbd5e1] overflow-x-auto leading-[1.5]">
          {project.architecture}
        </pre>
      </div>

      <div>
        <h4 className="font-mono text-[11px] uppercase tracking-[1px] text-accent-green mb-2">
          // Tech stack
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <span
              key={t.name}
              className="text-[11px] px-2.5 py-1 rounded"
              style={{
                color: t.color,
                backgroundColor: `${t.color}1a`,
                border: `1px solid ${t.color}33`,
              }}
            >
              {t.name}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-text-primary rounded-lg px-4 py-2 text-[13px] transition"
        >
          <FiGithub size={14} /> Ver código
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent-green text-bg rounded-lg px-4 py-2 text-[13px] font-semibold hover:brightness-110 transition"
          >
            <FiExternalLink size={14} /> Live demo
          </a>
        )}
      </div>
    </div>
  );
}
