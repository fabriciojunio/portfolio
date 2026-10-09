import type { VFile } from "../types";
import { SOBRE, PROJETOS_EIXO, PROJETOS_PARCERIA } from "../site/data";

export const contactTs: VFile = {
  path: "/contato.ts",
  name: "contato.ts",
  language: "typescript",
  content: `export const contato = ${JSON.stringify(SOBRE.contato, null, 2)} as const;\n`,
};

export const readmeFile: VFile = {
  path: "/README.md",
  name: "README.md",
  language: "markdown",
  content: [
    `# Portfólio de ${SOBRE.nome}`,
    "Analista de Sistemas: desenvolvimento, integrações e sustentação de software.",
    "## Navegação na IDE",
    "- Abra um arquivo na árvore lateral ou pela paleta (Ctrl/Cmd+K).\n- Ctrl/Cmd+P pesquisa arquivos; Ctrl/Cmd+` alterna o terminal.\n- O terminal aceita ls, cat, open, projetos, stack, whoami e ajuda.\n- Run aparece apenas nos exemplos com uma simulação interativa.",
    "A IDE apresenta trechos selecionados e a apresentação pública do Lastro. Não executa Java, PHP, Python ou Unity: as simulações em JavaScript ilustram algoritmos com dados de exemplo. O Cardiocam usa sinais sintéticos, sem medição clínica validada.",
    "## Experimente",
    "```bash\nopen projetos/permaneia.ts\nrun\nprojetos\nwhoami\n```",
    "## Projetos em destaque",
    PROJETOS_EIXO.map(p => p.name).join(", ") + ".",
    "## Pesquisa aplicada",
    PROJETOS_PARCERIA.map(p => p.name).join(", ") + ".",
    "Lastro apresenta apenas um resumo público do projeto pré-TCC. O código e os artefatos permanecem privados até a defesa. Os demais trabalhos acadêmicos e projetos complementares estão na seção expansível.",
    "[Voltar ao portfólio](/)\n[Código do portfólio](https://github.com/fabriciojunio/portfolio)",
  ].join("\n\n") + "\n",
};
