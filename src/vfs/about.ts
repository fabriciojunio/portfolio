import type { VFile } from "../types";
import { SOBRE } from "../site/data";

export const aboutMd: VFile = {
  path: "/sobre.md",
  name: "sobre.md",
  language: "markdown",
  content: [
    `# ${SOBRE.nome}`,
    `> ${SOBRE.cargo} | Java · Spring · Go · Python`,
    ...SOBRE.longBio,
    "## Como trabalho",
    "Começo pelo modelo de ameaças, coloco os controles no código e na esteira, provo cada um com teste e explico o risco em linguagem de quem vai corrigir.",
    "Número que aparece aqui foi medido no repositório. O que é demonstração ou simulação está indicado no card.",
  ].join("\n\n") + "\n",
};
