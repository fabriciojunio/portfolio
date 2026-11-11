import type { VFile } from "../types";
import { SOBRE, PROJETOS_DESTAQUE, PROJETOS_SEGURANCA } from "../site/data";

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
    `${SOBRE.cargo}. ${SOBRE.bio}`,
    "## Navegação na IDE",
    "- Abra um arquivo na árvore lateral ou pela paleta (Ctrl/Cmd+K).\n- Ctrl/Cmd+P pesquisa arquivos; Ctrl/Cmd+` alterna o terminal.\n- O terminal aceita ls, cat, open, projetos, stack, whoami e ajuda.\n- Run aparece apenas nos exemplos com uma simulação interativa.",
    "Os arquivos dos projetos de segurança são trechos reais dos repositórios, com link para a linha de origem. A IDE não executa Java, Go, PHP ou Python: as simulações em JavaScript ilustram algoritmos com dados de exemplo.",
    "## Experimente",
    "```bash\nopen projetos/brecha.java\nopen projetos/crivo.go\nprojetos\nwhoami\n```",
    "## Segurança de aplicações",
    PROJETOS_SEGURANCA.map(p => p.name).join(", ") + ".",
    "## Destaques",
    PROJETOS_DESTAQUE.map(p => p.name).join(", ") + ".",
    "Projetos de IA aplicada, trabalhos acadêmicos e projetos complementares estão nas seções seguintes do portfólio.",
    "[Voltar ao portfólio](/)\n[Código do portfólio](https://github.com/fabriciojunio/portfolio)",
  ].join("\n\n") + "\n",
};
