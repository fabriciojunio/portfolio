# Segurança

Este é um portfólio estático (React + Vite) servido pela Vercel. Não há
backend, banco de dados nem autenticação: todo o conteúdo é público e
roda no browser. Ainda assim, algumas medidas ficam explícitas aqui.

## Como reportar

Achou algo? Manda um email para junioad555@gmail.com com o que
encontrou e, se der, um passo a passo pra reproduzir. Respondo assim que
possível. Nada de scanner automático despejado sem contexto, por favor.

## O que já está no lugar

- CSP estrita, sem CDNs externos: script, style, worker e connect
  restritos a `self` (o Monaco roda 100% local, inclusive os workers).
  `object-src` e `frame-src` em `none`.
- HSTS com `preload`, `X-Frame-Options: DENY` e `X-Content-Type-Options: nosniff`.
- `Referrer-Policy` e `Permissions-Policy` restritivos (câmera, microfone
  e geolocalização bloqueados).
- Sem source maps em produção e `console`/`debugger` removidos no build.
- `robots.txt` barrando os crawlers de treino de IA mais comuns.
- Links externos sempre com `rel="noopener noreferrer"`.

Os cabeçalhos ficam em `vercel.json` e são cobertos por testes em
`src/security.test.ts`, que rodam no CI a cada push.

## Escopo

Como não há dados de usuário nem segredos no cliente, o foco é higiene de
front-end: cabeçalhos, dependências e a barreira contra scraping de IA.
Nenhuma chave de API é embarcada no bundle.
