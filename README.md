# Portfólio de Fabrício Júnio

**Analista de Sistemas: desenvolvimento, integrações e sustentação de software.**

[Portfólio publicado](https://portfolio-a3qn.vercel.app) · [IDE no navegador](https://portfolio-a3qn.vercel.app/lab)

## Conteúdo

Almanaque, Vitrine Bauru e Feira do Comando aparecem primeiro, seguidos de KoraCRM, AuthCore e CodeReview AI. O ConectAgente apresenta a pesquisa aplicada em saúde pública. Os demais trabalhos acadêmicos e projetos complementares ficam em uma seção expansível.

Cada card informa o problema, a participação no desenvolvimento, tecnologias, roteiro de visualização e escopo da demonstração. Os dados dos cards e os arquivos da IDE compartilham a mesma fonte em `src/site/data.ts`.

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

Os testes verificam catálogo, tradução, expansão dos projetos, roteiros, links, abertura da IDE, algoritmos das simulações, terminal e configuração de segurança. O CI executa auditoria de dependências de produção, lint, testes, build e navegação no desktop e no celular.

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
