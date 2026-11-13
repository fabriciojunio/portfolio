# Fabrício Júnio's portfolio

*[Leia em português](README.md)*

**Application security (AppSec) with a developer’s background.**

[Published portfolio](https://portfolio-a3qn.vercel.app) · [In-browser IDE](https://portfolio-a3qn.vercel.app/lab)

## Content

Security projects come first: AuthCore, Feira do Comando, brecha, alicerce, crivo and guarita. Then the highlights: Vitrine Bauru (outreach with the City of Bauru), ConectAgente (undergraduate thesis and research, Saruê), rastro (research) and AURORA (NASA Space Apps 2026). Applied AI comes next, and the remaining coursework and side projects sit in an expandable section.

Each card states the problem, what I did, the results, the security applied, how to check it and the scope of the demo. In the security projects the snippet is real code and links to the source line in the repository. The card data and the IDE files share the same source in `src/site/data.ts`.

Demo interfaces and simulations are labelled as such. The IDE shows selected excerpts and JavaScript simulations; it does not run the Java, PHP, Python or Unity services from the repositories. The Cardiocam example uses synthetic signals and is not a validated clinical measurement.

## Stack

React 19 · TypeScript · Vite 7 · Tailwind CSS · Motion · Monaco Editor · Vitest · Testing Library

## Development

```bash
npm ci
npm run dev
```

The local server opens at `http://localhost:5173`.

```bash
npm test
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
npm run preview
```

Tests cover the catalogue, translation, project expansion, viewing guides, links, opening the IDE, the simulation algorithms, the terminal and the security configuration. CI runs the dependency audit, lint, tests, build and navigation on desktop and mobile. The security workflow runs CodeQL, gitleaks and OSV-Scanner on every push, and OWASP ZAP scans the published site every week and on every release. Details in [SECURITY.en.md](SECURITY.en.md).

## IDE

- `Ctrl/Cmd+K`: command palette.
- `Ctrl/Cmd+P`: file search.
- `Ctrl/Cmd+\``: virtual terminal.
- `Ctrl/Cmd+B`: sidebar.
- **Run:** opens the simulation for supported files.

Commands: `ls`, `cat`, `open`, `run`, `tree`, `whoami`, `projetos`, `stack`, `contato`, `ajuda` and `clear`. The terminal is a virtual navigation interface with no access to the operating system.

## Publishing and security

The production build is published on Vercel. Old results routes forward visitors to the current project selection. The sitemap includes the portfolio and the IDE.

Assets are local, including fonts and the Monaco workers. The configuration keeps CSP, HSTS, framing protection, permissions policies and no source maps in production.

The sharing image is `public/og.png`. The generator `scripts/gerar-cartao-og.py` uses Pillow and the Windows fonts; it is not part of the build.

Author: [Fabrício Júnio](https://github.com/fabriciojunio).
