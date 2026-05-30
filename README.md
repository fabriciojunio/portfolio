# fabricio-junio / portfolio

> Esse portfolio é, ele mesmo, um projeto.

Em vez de um site rolável com cards, montei um IDE de verdade no
browser. Navega-se pelos projetos como se navega pelo workspace —
abrindo arquivos, lendo o código real e, em alguns, executando
trechos para ver o resultado.

## Stack

- React 19 + TypeScript + Vite 6
- **Monaco Editor** (o motor do VSCode) com tema autoral
- Tailwind CSS sem nenhum design system pronto
- Vitest cobrindo VFS, parser de comandos e segurança

## Demos interativas

- **GolData (xG)** — calculador de Expected Goals reagindo ao
  cursor sobre o campo.
- **GolData Pro (Kelly)** — simulador de Kelly fracionário com
  500 apostas Monte Carlo.
- **Apontamento (Zod)** — validador real do schema do projeto,
  editável ao vivo.
- **JIS (vagas)** — motor de score híbrido com pesos por feature.

## Atalhos

- `Ctrl/⌘ + K` — paleta de comandos
- `Ctrl/⌘ + P` — abrir arquivo rápido
- `` Ctrl/⌘ + ` `` — abrir/fechar terminal
- `Ctrl/⌘ + B` — alternar barra lateral

## Comandos do terminal

`ls`, `cat`, `open`, `run`, `tree`, `whoami`, `projetos`,
`stack`, `contato`, `git status`, `git log`, `ajuda`, `clear`.

## Segurança

- CSP estrita (sem CDNs externos, Monaco roda local)
- HSTS preload, X-Frame-Options DENY, Referrer-Policy estrito
- `robots.txt` bloqueia GPTBot, ClaudeBot, CCBot, Bytespider...
- Sem source maps em produção; `console` removido pelo Vite

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm test         # roda a suíte
npm run lint     # ESLint
```

Feito por [Fabrício Júnio](https://github.com/fabriciojunio).
