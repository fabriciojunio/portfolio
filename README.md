# Portfólio de Fabrício Júnio

*[Read this in English](README.en.md)*

**Segurança de aplicações (AppSec) com base de desenvolvedor.**

[Portfólio publicado](https://portfolio-a3qn.vercel.app) · [IDE no navegador](https://portfolio-a3qn.vercel.app/lab)

## Conteúdo

Os projetos de segurança vêm primeiro: AuthCore, Feira do Comando, brecha, alicerce, crivo e guarita. Depois os destaques: Vitrine Bauru (extensão com a SEDECON), ConectAgente (TCC e iniciação científica, Saruê), rastro (pesquisa) e AURORA (NASA Space Apps 2026). A IA aplicada fica em seguida, e os demais trabalhos acadêmicos e projetos complementares ficam numa seção expansível.

Cada card informa o problema, o que eu fiz, os resultados, a segurança aplicada, como conferir e o escopo da demonstração. Nos projetos de segurança, o trecho de código é real e aponta para a linha de origem no repositório. Os dados dos cards e os arquivos da IDE compartilham a mesma fonte em `src/site/data.ts`.

As interfaces de demonstração e as simulações são identificadas como tal. A IDE apresenta trechos selecionados e simulações em JavaScript; não executa os serviços Java, PHP, Python ou Unity dos repositórios. O exemplo do Cardiocam usa sinais sintéticos e não representa uma medição clínica validada.

## Stack

React 19 · TypeScript · Vite 7 · Tailwind CSS · Motion · Monaco Editor · Vitest · Testing Library

## Desenvolvimento

```bash
npm ci
npm run dev
```

O servidor local abre em `http://localhost:5173`.

```bash
npm test
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
npm run preview
```

Os testes verificam catálogo, tradução, expansão dos projetos, roteiros, links, abertura da IDE, algoritmos das simulações, terminal e configuração de segurança. O CI executa auditoria de dependências, lint, testes, build e navegação no desktop e no celular. O fluxo de segurança roda CodeQL, gitleaks e OSV-Scanner a cada push, e o OWASP ZAP varre o site publicado toda semana e a cada publicação. Detalhes em [SECURITY.md](SECURITY.md).

## IDE

- `Ctrl/Cmd+K`: paleta de comandos.
- `Ctrl/Cmd+P`: pesquisa de arquivos.
- `Ctrl/Cmd+\``: terminal virtual.
- `Ctrl/Cmd+B`: barra lateral.
- **Run:** abre a simulação dos arquivos compatíveis.

Comandos: `ls`, `cat`, `open`, `run`, `tree`, `whoami`, `projetos`, `stack`, `contato`, `ajuda` e `clear`. O terminal é uma interface de navegação virtual, sem acesso ao sistema operacional.

## Publicação e segurança

O build de produção é publicado na Vercel. As rotas antigas de resultados encaminham o visitante à seleção atual de projetos. O sitemap inclui o portfólio e a IDE.

Os assets são locais, incluindo fontes e workers do Monaco. A configuração mantém CSP, HSTS, bloqueio de enquadramento, políticas de permissões e ausência de source maps em produção.

A imagem de compartilhamento está em `public/og.png`. O gerador `scripts/gerar-cartao-og.py` utiliza Pillow e as fontes do Windows; não faz parte do build.

Autor: [Fabrício Júnio](https://github.com/fabriciojunio).
