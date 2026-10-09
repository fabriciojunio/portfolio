import { useState } from "react";
import { PROJETOS_EIXO, PROJETOS_PARCERIA, PROJETOS_ACERVO, type SiteProject } from "./data";
import SnippetView from "./SnippetView";
import { useIdioma, useTextos } from "./i18n";
import { TRADUCOES, type TextoDoProjeto } from "./i18n-projetos";

function useTextoDoProjeto(p: SiteProject): TextoDoProjeto {
  const { idioma } = useIdioma();
  if (idioma !== "pt") return TRADUCOES[idioma][p.slug];
  return { oneLine: p.oneLine, what: p.what, role: p.role, highlights: p.highlights ?? [], demoNote: p.demoNote, flow: p.flow };
}

export default function Work() {
  const t = useTextos();
  return (
    <section id="trabalho" className="py-28 md:py-40 px-6 md:px-10 max-w-[1280px] mx-auto">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 mb-16">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[2px] text-[#9a9a9a]">{t.trabalho.secao}</p>
          <h2 className="mt-5 font-serif text-[42px] md:text-[58px] leading-[1.08] text-[#ededed]">
            {t.trabalho.titulo[0]}{t.trabalho.titulo[1]}{t.trabalho.titulo[2]}
          </h2>
        </div>
        <p className="self-end text-[16px] md:text-[17.5px] leading-[1.75] text-[#d4d4d4] max-w-[640px]">{t.trabalho.chamada}</p>
      </div>
      <div className="space-y-16">
        <Bloco {...t.trabalho.blocos.ia} itens={PROJETOS_EIXO} />
        <Bloco {...t.trabalho.blocos.parceria} itens={PROJETOS_PARCERIA} />
        <Acervo />
      </div>
    </section>
  );
}

function Bloco({ titulo, nota, itens }: { titulo: string; nota: string; itens: SiteProject[] }) {
  return <div>
    <h3 className="font-serif text-[28px] md:text-[32px] text-[#ededed]">{titulo}</h3>
    <p className="mt-2 mb-6 text-[13px] text-[#9a9a9a] max-w-[700px] leading-relaxed">{nota}</p>
    <ol className="divide-y divide-white/10 border-y border-white/10">
      {itens.map((p, i) => <WorkRow key={p.slug} project={p} index={i} />)}
    </ol>
  </div>;
}

function Acervo() {
  const t = useTextos();
  const [aberto, setAberto] = useState(false);
  return <div className="border border-white/15 px-5 md:px-8">
    <button type="button" onClick={() => setAberto(s => !s)} aria-expanded={aberto} aria-controls="projetos-complementares"
      className="w-full py-6 text-left flex items-center justify-between gap-4 text-[#d4d4d4] hover:text-white">
      <span className="font-mono text-[11px] uppercase tracking-[1.2px] leading-relaxed">{t.trabalho.acervo} ({PROJETOS_ACERVO.length})</span>
      <span aria-hidden>{aberto ? "−" : "+"}</span>
    </button>
    <ol id="projetos-complementares" hidden={!aberto} className="divide-y divide-white/10 border-t border-white/10">
      {PROJETOS_ACERVO.map((p, i) => <WorkRow key={p.slug} project={p} index={i} />)}
    </ol>
  </div>;
}

function WorkRow({ project, index }: { project: SiteProject; index: number }) {
  const t = useTextos();
  const texto = useTextoDoProjeto(project);
  const c = t.trabalho.card;
  const [open, setOpen] = useState(false);
  return <li id={`work-${project.slug}`}>
    <button type="button" onClick={() => setOpen(s => !s)} aria-expanded={open} aria-controls={`detalhes-${project.slug}`}
      className="group w-full text-left py-7 md:py-8 flex items-center gap-4 md:gap-8">
      <span className="font-mono text-[11px] text-[#767676] w-6 shrink-0">{String(index + 1).padStart(2, "0")}</span>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-serif text-[25px] md:text-[30px] text-[#ededed] leading-tight">{project.name}</span>
          {project.demo && <span className="font-mono text-[9px] border border-white/25 px-2 py-1 text-[#b8b8b8]">{c.demoBadge}</span>}
          {project.labDemo && <span className="font-mono text-[9px] border border-white/25 px-2 py-1 text-[#b8b8b8]">{c.simulationBadge}</span>}
        </div>
        <p className="mt-2 text-[14px] text-[#9a9a9a] leading-relaxed">{texto.oneLine}</p>
      </div>
      <span className="hidden md:block font-mono text-[11px] text-[#767676]">{project.year}</span>
      <span aria-hidden className="shrink-0 w-8 h-8 border border-white/20 rounded-full flex items-center justify-center text-[#b8b8b8] group-hover:border-white">{open ? "−" : "+"}</span>
    </button>
    <div id={`detalhes-${project.slug}`} hidden={!open} style={!open ? { display: "none" } : undefined} className="pb-9 md:pl-14 grid lg:grid-cols-[1fr_1fr] gap-8">
      <div className="space-y-6">
        <Texto label={c.what}>{texto.what}</Texto>
        <Texto label={c.role}>{texto.role}</Texto>
        <div><Rotulo>{c.highlights}</Rotulo><ul className="mt-3 list-disc pl-4 space-y-2 text-[13px] text-[#b8b8b8] leading-relaxed">{texto.highlights.map(h => <li key={h}>{h}</li>)}</ul></div>
        <div className="flex flex-wrap gap-2">{project.stack.map(s => <span key={s} className="font-mono text-[10px] text-[#b8b8b8] border border-white/15 px-2 py-1">{s}</span>)}</div>
        <div className="border-l border-white/30 pl-4">
          <Rotulo>{c.flow}</Rotulo>
          <ol className="mt-3 list-decimal pl-4 space-y-2 text-[13px] text-[#d4d4d4] leading-relaxed">{texto.flow.map(step => <li key={step}>{step}</li>)}</ol>
          <p className="mt-4 text-[12px] text-[#9a9a9a] leading-relaxed">{texto.demoNote}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-[12px]">
          {project.demo && <Link href={project.demo}>{c.demo} ↗</Link>}
          {project.github && <Link href={project.github}>{c.github} ↗</Link>}
          <Link href={`/lab?arquivo=${encodeURIComponent(project.idePath)}`}>{project.presentationOnly ? c.presentation : c.ide} ↗</Link>
          {project.labDemo && <Link href={`/lab?arquivo=${encodeURIComponent(project.labDemo)}&run=1`}>{t.trabalho.verDemo} ↗</Link>}
        </div>
        {project.demoAcesso && <p className="font-mono text-[11px] text-[#9a9a9a] break-words">{c.access}: {project.demoAcesso}</p>}
      </div>
      <div className="min-w-0">
        <p className="mb-3 font-mono text-[10px] text-[#9a9a9a]">{project.presentationOnly ? c.presentation : project.sourcePath ? project.sourcePath : "Exemplo simplificado do projeto"}</p>
        <SnippetView code={project.snippet} language={project.snippetLang} filename={project.idePath.split("/").at(-1)!} />
      </div>
    </div>
  </li>;
}

function Rotulo({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[10px] uppercase tracking-[1.3px] text-[#9a9a9a]">{children}</p>;
}
function Texto({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><Rotulo>{label}</Rotulo><p className="mt-3 text-[14px] text-[#d4d4d4] leading-[1.8]">{children}</p></div>;
}
function Link({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#ededed] underline underline-offset-4 decoration-white/40 hover:decoration-white">{children}</a>;
}
