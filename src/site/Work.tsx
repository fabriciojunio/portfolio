import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { fadeUp, inViewOnce, stagger } from "../motion";
import {
  PROJETOS_EIXO,
  PROJETOS_PRODUTO,
  PROJETOS_FACULDADE,
  PROJETOS_OUTROS,
  type SiteProject,
} from "./data";
import SnippetView from "./SnippetView";

/**
 * Endereço da IDE já com o arquivo aberto e o painel de execução ligado.
 *
 * Sem isto, chegar na demo exigia abrir /lab, achar o arquivo na árvore e
 * reparar no botão Run, que é pedir demais de quem só clicou num projeto.
 */
function enderecoDaDemo(caminho: string): string {
  return `/lab?arquivo=${encodeURIComponent(caminho)}&run=1`;
}

/**
 * A vitrine deixou de ser uma lista corrida de 24 itens.
 *
 * Lista corrida obriga quem chega a decidir sozinho o que importa, e a resposta
 * óbvia é que nada importa muito. Aqui a página já diz qual é o eixo, o que já
 * tem usuário, o que é da faculdade e o que é acervo.
 */
const BLOCOS: { titulo: string; nota: string; itens: SiteProject[] }[] = [
  {
    titulo: "Back-end",
    nota: "O eixo. Fila, streaming, autenticação e banco, que é onde passo o dia.",
    itens: PROJETOS_EIXO,
  },
  {
    titulo: "Produto com usuário",
    nota: "Saíram de projeto pessoal e foram para cliente. Três deles com o código fechado.",
    itens: PROJETOS_PRODUTO,
  },
  {
    titulo: "Faculdade",
    nota: "Trabalhos de disciplina na UNISAGRADO, entre eles os de visão computacional e os de Unity.",
    itens: PROJETOS_FACULDADE,
  },
];

export default function Work() {
  return (
    <section
      id="trabalho"
      className="relative py-28 md:py-40 px-6 md:px-10 max-w-[1280px] mx-auto"
    >
      <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 mb-20">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[2px] text-[#9a9a9a]">
            02 · trabalho
          </p>
          <h2 className="mt-5 font-serif text-[42px] md:text-[58px] leading-[1.08] text-[#ededed]">
            Projetos que <em className="text-[#ffffff] not-italic">construí</em>.
          </h2>
        </div>
        <div className="self-end space-y-4">
          <p className="font-sans text-[16px] md:text-[17.5px] leading-[1.75] text-[#d4d4d4] max-w-[640px]">
            Clique em qualquer um: o problema, a decisão que tomei e um trecho de código.
          </p>
        </div>
      </div>

      <div className="space-y-20 md:space-y-24">
        {BLOCOS.map((bloco) => (
          <Bloco key={bloco.titulo} {...bloco} />
        ))}
        <Acervo />
      </div>
    </section>
  );
}

function Bloco({
  titulo,
  nota,
  itens,
}: {
  titulo: string;
  nota: string;
  itens: SiteProject[];
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 mb-6">
        <h3 className="font-serif text-[26px] md:text-[32px] text-[#ededed] leading-tight">
          {titulo}
        </h3>
        <p className="font-mono text-[11px] text-[#767676] max-w-[560px] leading-relaxed">
          {nota}
        </p>
      </div>

      <m.ol
        className="divide-y divide-white/5 border-y border-white/5"
        variants={stagger(0.05)}
        {...inViewOnce}
        viewport={{ once: true, amount: 0.05 }}
      >
        {itens.map((p, i) => (
          <WorkRow key={p.slug} project={p} index={i} />
        ))}
      </m.ol>
    </div>
  );
}

/**
 * O que veio antes do eixo atual. Fica fechado porque é acervo, não vitrine,
 * mas continua acessível: apagar do site não apaga que eu escrevi.
 */
function Acervo() {
  const [aberto, setAberto] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setAberto((s) => !s)}
        className="font-mono text-[11px] uppercase tracking-[1.6px] text-[#767676] hover:text-[#ededed] transition-colors"
        aria-expanded={aberto}
      >
        {aberto ? "−" : "+"} projetos anteriores ({PROJETOS_OUTROS.length})
      </button>

      <AnimatePresence initial={false}>
        {aberto && (
          <m.ol
            className="mt-6 divide-y divide-white/5 border-y border-white/5 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {PROJETOS_OUTROS.map((p, i) => (
              <WorkRow key={p.slug} project={p} index={i} />
            ))}
          </m.ol>
        )}
      </AnimatePresence>
    </div>
  );
}

function WorkRow({ project, index }: { project: SiteProject; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <m.li id={`work-${project.slug}`} className="group" variants={fadeUp}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full text-left py-8 md:py-9 flex items-center gap-5 md:gap-10"
        aria-expanded={open}
      >
        <span className="font-mono text-[11px] text-[#767676] w-8 shrink-0 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-serif text-[24px] md:text-[30px] text-[#ededed] leading-[1.15]">
              {project.name}
            </span>
            {project.demo && (
              <span className="font-mono text-[9px] uppercase tracking-[1.2px] text-[#ededed] border border-[#ededed]/25 px-1.5 py-0.5 rounded-sm shrink-0 self-center">
                demo
              </span>
            )}
            {project.labDemo && (
              <span className="font-mono text-[9px] uppercase tracking-[1.2px] text-[#ffffff] border border-[#ffffff]/30 px-1.5 py-0.5 rounded-sm shrink-0 self-center">
                interativa
              </span>
            )}
          </div>
          <p className="mt-2 text-[14px] md:text-[15px] text-[#9a9a9a] font-sans leading-relaxed">
            {project.oneLine}
          </p>
        </div>

        <span className="hidden md:block font-mono text-[11px] text-[#767676] tabular-nums shrink-0">
          {project.year}
        </span>

        <span
          className={`shrink-0 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[#9a9a9a] group-hover:border-[#ffffff]/60 group-hover:text-[#ffffff] transition-all ${open ? "rotate-45 border-[#ffffff]/60 text-[#ffffff]" : ""}`}
          aria-hidden
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
      {open && (
        <m.div
          className="overflow-hidden"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
        >
        <div className="pb-10 md:pb-14 pl-[52px] md:pl-[72px] pr-2 md:pr-12 grid md:grid-cols-[1fr_1.4fr] gap-8 md:gap-12">
          <div className="space-y-7">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[1.6px] text-[#767676]">
                o que é
              </div>
              <p className="mt-3 text-[14.5px] text-[#d4d4d4] leading-[1.85]">
                {project.what}
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[1.6px] text-[#767676]">
                meu papel
              </div>
              <p className="mt-3 text-[14.5px] text-[#d4d4d4] leading-[1.85]">
                {project.role}
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[1.6px] text-[#767676]">
                stack
              </div>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {project.stack.map((s) => (
                  <span key={s} className="font-mono text-[12px] text-[#d4d4d4]">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[1.6px] text-[#767676]">
                  destaques
                </div>
                <ul className="mt-3 space-y-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 font-mono text-[11px] text-[#b8b8b8]/50 shrink-0">
                        ↳
                      </span>
                      <span className="font-mono text-[12px] text-[#b8b8b8] leading-relaxed">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.labDemo && (
              <a
                href={enderecoDaDemo(project.labDemo)}
                target="_blank"
                rel="noopener noreferrer"
                className="group/demo inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#ffffff] text-[#0a0a0a] text-[12px] font-mono uppercase tracking-[1.4px] hover:bg-[#ffffff] transition-colors"
              >
                <span aria-hidden className="text-[11px]">
                  ▸
                </span>
                Rodar a demo interativa
                <span
                  aria-hidden
                  className="transition-transform group-hover/demo:translate-x-1"
                >
                  →
                </span>
              </a>
            )}

            <div className="pt-3 flex flex-wrap items-center gap-4">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12.5px] text-[#ededed] underline-offset-4 underline decoration-[#ffffff]/50 hover:decoration-[#ffffff]"
                >
                  código no GitHub →
                </a>
              ) : (
                <span className="font-mono text-[11px] text-[#767676]">
                  código privado
                </span>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12.5px] text-[#ededed] underline-offset-4 underline decoration-[#ffffff]/50 hover:decoration-[#ffffff]"
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
        </m.div>
      )}
      </AnimatePresence>
    </m.li>
  );
}

function ext(lang: string): string {
  if (lang === "python") return "py";
  if (lang === "java") return "java";
  if (lang === "php") return "php";
  if (lang === "csharp") return "cs";
  if (lang === "sql") return "sql";
  return "ts";
}
