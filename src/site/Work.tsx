import { useState } from "react";
import { PROJECTS, type SiteProject } from "./data";
import SnippetView from "./SnippetView";

export default function Work() {
  return (
    <section id="trabalho" className="relative py-24 md:py-32 px-6 md:px-10 max-w-[1280px] mx-auto">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 mb-12">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[2px] text-[#9b958a]">
            02 / trabalho
          </p>
          <h2 className="mt-4 font-serif text-[42px] md:text-[54px] leading-[1.02] text-[#f5f1e8]">
            14 projetos. 4 em <em className="text-[#e8b450] not-italic">produção</em>.
          </h2>
        </div>
        <p className="font-sans text-[15.5px] md:text-[17px] leading-[1.7] text-[#cfc8b9] max-w-[640px] self-end">
          Cada projeto abaixo tem código aberto no GitHub. Clique pra abrir e ler o snippet que considero mais representativo do que construí.
        </p>
      </div>

      <ol className="divide-y divide-white/5 border-y border-white/5">
        {PROJECTS.map((p, i) => (
          <WorkRow key={p.slug} project={p} index={i} />
        ))}
      </ol>
    </section>
  );
}

function WorkRow({ project, index }: { project: SiteProject; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <li id={`work-${project.slug}`} className="group">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full text-left py-6 md:py-7 flex items-center gap-4 md:gap-8"
        aria-expanded={open}
      >
        <span className="font-mono text-[11px] text-[#6f6a60] w-8 shrink-0 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-[22px] md:text-[28px] text-[#f5f1e8] leading-tight">
            {project.name}
          </h3>
          <p className="mt-1 text-[13.5px] md:text-[14.5px] text-[#9b958a] font-sans">
            {project.oneLine}
          </p>
        </div>

        <span className="hidden md:block font-mono text-[11px] text-[#6f6a60] tabular-nums shrink-0">
          {project.year}
        </span>

        <span
          className={`shrink-0 w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-[#9b958a] group-hover:border-[#e8b450]/60 group-hover:text-[#e8b450] transition-all ${open ? "rotate-45 border-[#e8b450]/60 text-[#e8b450]" : ""}`}
          aria-hidden
        >
          +
        </span>
      </button>

      {open && (
        <div className="pb-8 md:pb-10 pl-12 md:pl-20 pr-2 md:pr-12 grid md:grid-cols-[1fr_1.4fr] gap-6 md:gap-10">
          <div className="space-y-5">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[1.5px] text-[#6f6a60]">o que é</div>
              <p className="mt-2 text-[14px] text-[#cfc8b9] leading-relaxed">
                {project.what}
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[1.5px] text-[#6f6a60]">meu papel</div>
              <p className="mt-2 text-[14px] text-[#cfc8b9] leading-relaxed">
                {project.role}
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[1.5px] text-[#6f6a60]">stack</div>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
                {project.stack.map((s) => (
                  <span key={s} className="font-mono text-[11.5px] text-[#cfc8b9]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12.5px] text-[#f5f1e8] underline-offset-4 underline decoration-[#e8b450]/50 hover:decoration-[#e8b450]"
              >
                código no GitHub →
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12.5px] text-[#f5f1e8] underline-offset-4 underline decoration-[#e8b450]/50 hover:decoration-[#e8b450]"
                >
                  demo ao vivo →
                </a>
              )}
            </div>
          </div>

          <SnippetView
            code={project.snippet}
            language={project.snippetLang}
            filename={`${project.slug}.${ext(project.snippetLang)}`}
          />
        </div>
      )}
    </li>
  );
}

function ext(lang: string): string {
  if (lang === "python") return "py";
  if (lang === "java") return "java";
  if (lang === "php") return "php";
  return "ts";
}
