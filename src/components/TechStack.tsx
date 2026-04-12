import { useState } from "react";
import { skillCategories } from "../data/skills";

export default function TechStack() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
      <p className="font-mono text-[11px] uppercase tracking-[2px] text-accent-green mb-2">
        skills
      </p>
      <h2 className="text-[22px] font-semibold text-text-primary mb-8">Tech stack</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {skillCategories.map((cat) => (
          <div
            key={cat.name}
            className="bg-[rgba(255,255,255,0.02)] border border-border rounded-lg p-5"
          >
            <h3
              className="font-mono text-[12px] mb-3"
              style={{ color: cat.color }}
            >
              {cat.name}:
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((s) => {
                const key = `${cat.name}-${s.name}`;
                const isHover = hover === key;
                return (
                  <div key={key} className="relative">
                    <span
                      onMouseEnter={() => setHover(key)}
                      onMouseLeave={() => setHover(null)}
                      className="inline-block text-[12px] px-2.5 py-1 rounded cursor-default transition"
                      style={{
                        color: cat.color,
                        backgroundColor: `${cat.color}1a`,
                        border: `1px solid ${cat.color}26`,
                      }}
                    >
                      {s.name}
                    </span>
                    {isHover && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-40 whitespace-nowrap bg-[#1a1b26] border border-[rgba(255,255,255,0.1)] rounded px-3 py-2 text-[11px] text-text-secondary shadow-xl"
                      >
                        Usado em: {s.projects.join(", ")}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
