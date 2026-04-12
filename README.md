# Portfolio — Fabrício Júnio

Portfólio pessoal com estética "Command Center": terminal/dashboard escuro, tipografia mono, animações sutis.

**Stack:** React 19 · TypeScript · Vite · TailwindCSS · Framer Motion · React Icons

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

Output em `dist/`.

## Deploy na Vercel

1. Push do repositório para o GitHub.
2. Importar na Vercel — o framework React/Vite é detectado automaticamente.
3. Build command: `npm run build` · Output directory: `dist`.
4. O `vercel.json` já está configurado com rewrites para SPA.

## Estrutura

```
portfolio/
├── public/             # favicon e assets estáticos
└── src/
    ├── components/     # Navbar, Hero, Projects, etc.
    ├── data/           # projects, skills, timeline, experience
    ├── hooks/          # useScrollReveal, useCountUp, useTypingEffect
    ├── types/          # tipos compartilhados
    ├── App.tsx
    ├── main.tsx
    └── index.css
```

## Customização

- **Paleta de cores:** `tailwind.config.ts`
- **Dados dos projetos:** `src/data/projects.ts`
- **Timeline / experiência / skills:** `src/data/*`

---

Feito por **Fabrício Júnio** — [github.com/fabriciojunio](https://github.com/fabriciojunio)
