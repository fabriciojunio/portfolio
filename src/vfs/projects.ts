import { PROJECTS } from "../site/data";
import type { RunKind, VFile } from "../types";

const SIMULACOES: Partial<Record<string, RunKind>> = {
  permaneia: "fuzzy-evasao",
  cardiocam: "rppg",
  contaflux: "contagem-de-linha",
  jis: "vagas-score",
  kaida: "pulo",
  bicudo: "impulso",
};

export const projectFiles: VFile[] = PROJECTS.map(p => ({
  path: p.idePath,
  name: p.idePath.split("/").at(-1)!,
  language: p.snippetLang,
  content: p.snippet,
  runnable: SIMULACOES[p.slug],
  meta: {
    project: p.name,
    source: p.sourcePath && p.github ? `${p.github}/blob/main/${p.sourcePath}` : undefined,
    github: p.github ?? undefined,
    demo: p.demo,
    demoAcesso: p.demoAcesso,
    demoNote: p.demoNote,
    stack: p.stack,
    role: p.role,
  },
}));
