import { useState } from "react";
import { PROJECTS, type SiteProject } from "./data";
import SnippetView from "./SnippetView";

export default function Work() {
  return (
    <section
      id="trabalho"
      className="relative py-28 md:py-40 px-6 md:px-10 max-w-[1280px] mx-auto"
    >
      <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 mb-16">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[2px] text-[#a39c8f]">
            02 · trabalho
          </p>
          <h2 className="mt-5 font-serif text-[42px] md:text-[58px] leading-[1.08] text-[#f5f1e8]">
            Projetos que <em className="text-[#d4a76a] not-italic">construí</em>.
          </h2>
        </div>
        <p className="font-sans text-[16px] md:text-[17.5px] leading-[1.75] text-[#d6cfc1] max-w-[640px] self-end">
          Cada projeto abaixo tem código aberto no GitHub. Clique para abrir e
          ler o snippet que considero mais representativo do que construí.
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
        className="w-full text-left py-8 md:py-9 flex items-center gap-5 md:gap-10"
        aria-expanded={open}
      >
        <span className="font-mono text-[11px] text-[#7a7468] w-8 shrink-0 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-[24px] md:text-[30px] text-[#f5f1e8] leading-[1.15]">
            {project.name}
          </h3>
          <p className="mt-2 text-[14px] md:text-[15px] text-[#a39c8f] font-sans leading-relaxed">
            {project.oneLine}
          </p>
        </div>

        <span className="hidden md:block font-mono text-[11px] text-[#7a7468] tabular-nums shrink-0">
          {project.year}
        </span>

        <span
          className={`shrink-0 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[#a39c8f] group-hover:border-[#d4a76a]/60 group-hover:text-[#d4a76a] transition-all ${open ? "rotate-45 border-[#d4a76a]/60 text-[#d4a76a]" : ""}`}
          aria-hidden
        >
          +
        </span>
      </button>

      {open && (
        <div className="pb-10 md:pb-14 pl-[52px] md:pl-[72px] pr-2 md:pr-12 grid md:grid-cols-[1fr_1.4fr] gap-8 md:gap-12">
          <div className="space-y-7">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[1.6px] text-[#7a7468]">
                o que é
              </div>
              <p className="mt-3 text-[14.5px] text-[#d6cfc1] leading-[1.85]">
                {project.what}
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[1.6px] text-[#7a7468]">
                meu papel
              </div>
              <p className="mt-3 text-[14.5px] text-[#d6cfc1] leading-[1.75]">
                {project.role}
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[1.6px] text-[#7a7468]">
                stack
              </div>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[12px] text-[#d6cfc1]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-3 flex flex-wrap gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12.5px] text-[#f5f1e8] underline-offset-4 underline decoration-[#d4a76a]/50 hover:decoration-[#d4a76a]"
              >
                código no GitHub →
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12.5px] text-[#f5f1e8] underline-offset-4 underline decoration-[#d4a76a]/50 hover:decoration-[#d4a76a]"
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
