import type { VFile } from "../types";
import { SOBRE } from "../site/data";

export const aboutMd: VFile = {
  path: "/sobre.md",
  name: "sobre.md",
  language: "markdown",
  content: [
    `# ${SOBRE.nome}`,
    `> ${SOBRE.cargo} | Java · PHP · JavaScript · SQL`,
    ...SOBRE.longBio,
    "## Desenvolvimento",
    "Analiso o problema, delimito o escopo, implemento, testo e acompanho a homologação e a publicação.",
    "Projetos próprios demonstram regras de negócio, integrações, testes e documentação. A pesquisa inclui ConectAgente, Cardiocam e Lastro, meu projeto pré-TCC.",
    "Os exemplos da IDE são trechos selecionados; as simulações não executam o backend dos repositórios. O Lastro apresenta apenas um resumo público da pesquisa.",
  ].join("\n\n") + "\n",
};
