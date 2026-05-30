import type { VFile } from "../types";

export const contactTs: VFile = {
  path: "/contato.ts",
  name: "contato.ts",
  language: "typescript",
  content: `// Contato — me chame pelo canal que preferir.

export const contato = {
  email:    "fabriciojadias@gmail.com",
  github:   "https://github.com/fabriciojunio",
  linkedin: "https://linkedin.com/in/fabríciojúnio",
  cidade:   "Bauru — SP, Brasil",
} as const;

// Para uma proposta:
// - assunto claro (ex.: "Vaga FullStack Pleno — Empresa X")
// - escopo, prazo e modelo (CLT / PJ / freelancer técnico)
// - eu respondo em 24h úteis.

// Eu leio LinkedIn, mas e-mail é mais rápido.
`,
};

export const readmeFile: VFile = {
  path: "/README.md",
  name: "README.md",
  language: "markdown",
  content: `# fabricio-junio / portfolio

> Esse portfolio é, ele mesmo, um projeto.

Em vez de um site rolável com cards, montei um **IDE de verdade
no browser**. Você navega pelos meus projetos como navegaria pelo
meu workspace — abrindo arquivos, lendo código e, em alguns
casos, **executando** trechos para ver o que eles fazem.

## Como navegar

- Sidebar à esquerda: estrutura completa.
- \`Ctrl/Cmd + K\` — paleta de comandos.
- \`Ctrl/Cmd + P\` — abrir arquivo rapidamente.
- \`Ctrl/Cmd + \`\` — abrir/fechar terminal.
- Botão **Run** aparece nos arquivos com demo interativa
  (\`goldata.py\`, \`goldata-pro.py\`, \`jis.java\`,
  \`apontamento-horas.ts\`).

## Tente isto no terminal

\`\`\`bash
ls projetos
cat sobre.md
open projetos/goldata.py
run
whoami
ajuda
\`\`\`

## Stack desse próprio site

React 19 + TypeScript + Vite + Tailwind + Monaco Editor
(o motor do VSCode). CSP estrita, headers de segurança,
sem source maps em produção, robots bloqueando bots de IA.

Código: [github.com/fabriciojunio/portfolio](https://github.com/fabriciojunio/portfolio)
`,
};
