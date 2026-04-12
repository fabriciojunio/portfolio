import { experiences } from "../data/experience";

export default function Experience() {
  return (
    <section id="experiencia" className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
      <p className="font-mono text-[11px] uppercase tracking-[2px] text-accent-green mb-2">
        experiência
      </p>
      <h2 className="text-[22px] font-semibold text-text-primary mb-8">Onde trabalhei</h2>

      <div className="space-y-6">
        {experiences.map((exp) => (
          <div
            key={exp.company}
            className="bg-card border border-border rounded-lg overflow-hidden"
          >
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-[rgba(255,255,255,0.02)]">
              <span className="w-2 h-2 rounded-full bg-accent-green" />
              <span className="font-mono text-[12px] text-[#e2e8f0]">{exp.company}</span>
            </div>

            <div className="p-5">
              <h3 className="text-[14px] text-text-primary font-medium">{exp.role}</h3>
              <div className="text-[12px] text-text-muted mt-0.5">
                {exp.period} · {exp.location}
              </div>

              <ul className="mt-4 space-y-2">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-[12px] text-[#cbd5e1] leading-relaxed">
                    <span className="text-accent-green shrink-0">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mt-5">
                {exp.stack.map((t) => (
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
          </div>
        ))}
      </div>
    </section>
  );
}
