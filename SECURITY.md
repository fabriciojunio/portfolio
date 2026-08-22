# Segurança

Este é um portfólio estático (React + Vite) servido pela Vercel. Não há
backend, banco de dados, autenticação nem dado de usuário: todo o conteúdo é
público e roda no browser. O que dá para atacar aqui é o browser de quem
visita, e é para isso que a configuração abaixo olha.

## Como reportar

Achou algo? Manda um email para junioad555@gmail.com com o que encontrou e, se
der, um passo a passo para reproduzir. Respondo assim que possível. Nada de
scanner automático despejado sem contexto, por favor.

Há também um `/.well-known/security.txt`, no formato da RFC 9116.

## O que está no lugar

### Cabeçalhos

Todos em `vercel.json`, e todos cobertos por teste.

| Cabeçalho | Valor | Para quê |
|---|---|---|
| `Content-Security-Policy` | ver abaixo | limita de onde script, estilo, fonte e conexão podem vir |
| `Strict-Transport-Security` | 2 anos, `includeSubDomains`, `preload` | impede o primeiro acesso em texto claro |
| `X-Frame-Options` + `frame-ancestors` | `DENY` / `'none'` | clickjacking |
| `X-Content-Type-Options` | `nosniff` | impede o browser de adivinhar o tipo do arquivo |
| `Cross-Origin-Opener-Policy` | `same-origin` | corta a referência de janela entre origens |
| `Cross-Origin-Resource-Policy` | `same-origin` | impede outra origem de embutir os arquivos daqui |
| `Cross-Origin-Embedder-Policy` | `credentialless` | fecha a ponta de vazamento entre origens |
| `Origin-Agent-Cluster` | `?1` | pede isolamento de processo |
| `X-Permitted-Cross-Domain-Policies` | `none` | política legada de Flash e PDF |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | não entrega o caminho completo a terceiros |
| `Permissions-Policy` | 30 recursos fechados | câmera, microfone, geolocalização, pagamento, USB, sensores e o resto |
| `X-DNS-Prefetch-Control` | `off` | ver nota abaixo |
| `X-XSS-Protection` | `0` | desliga o auditor legado, que já foi vetor de ataque |

A CSP:

```
default-src 'self'; base-uri 'self'; script-src 'self' blob:;
style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:;
font-src 'self' data:; connect-src 'self'; worker-src 'self' blob:;
manifest-src 'self'; media-src 'none'; object-src 'none';
child-src 'self' blob:; frame-src 'none'; frame-ancestors 'none';
form-action 'none'; upgrade-insecure-requests
```

Não há CDN nem recurso de terceiro: fontes, ícones e o Monaco inteiro são
servidos da própria origem. `connect-src 'self'` significa que a página não
tem para onde mandar dado nenhum.

### No código

- Sem source map em produção, e `console`/`debugger` removidos no build.
- Nenhuma chave de API embarcada. Não há o que embarcar: não existe chamada
  externa.
- Links externos sempre com `rel="noopener noreferrer"`.
- Nenhum `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function` ou
  `document.write` em todo o `src/`. Isso é verificado por teste, arquivo a
  arquivo, e o próprio teste tem um teste que confere se os padrões ainda
  pegam o caso óbvio.
- Dependências de produção sem vulnerabilidade conhecida (`npm audit`).

### Contra coleta de IA

`robots.txt` barra cerca de trinta coletores de treino. Vale dizer o que isso
é: convenção, não controle de acesso. Quem ignora `robots.txt` continua lendo
o site. A barreira de verdade contra abuso são os cabeçalhos.

## Decisões que parecem folga, e não são

Três diretivas da CSP são mais frouxas do que o ideal, e cada uma tem motivo:

- **`script-src` aceita `blob:`.** O editor Monaco roda em worker, e o
  carregador de worker do Vite tem um caminho de retorno que monta o worker a
  partir de um blob. Sem `blob:`, o editor quebra só em alguns navegadores,
  que é o tipo de falha que ninguém consegue reproduzir. O blob herda a
  origem da página, então não abre porta para código de fora.
- **`style-src` aceita `'unsafe-inline'`.** O Monaco injeta estilo em tempo de
  execução e React aplica `style` como atributo. Trocar por hash exigiria
  regerar a lista a cada build do Monaco, e um hash desatualizado quebra a
  página inteira em silêncio.
- **`font-src` aceita `data:`.** O build embute as subfontes menores como URI
  de dados. Fechar em `'self'` passa em qualquer auditoria de cabeçalho e
  quebra a tipografia no ar.

Duas outras escolhas:

- **`Cross-Origin-Embedder-Policy: credentialless`, e não `require-corp`.**
  Como o site não carrega nada de outra origem, os dois se comportam igual
  hoje. `credentialless` é o que não quebra caso um dia entre um recurso
  externo sem `CORP`.
- **`X-DNS-Prefetch-Control: off`.** É perder um pouco de velocidade de
  propósito. Ligado, o browser resolve o domínio de todo link da página antes
  do clique, o que entrega ao resolvedor de DNS uma lista do que o visitante
  nem chegou a abrir.

## O que não está aqui

- **Trusted Types.** Seria a defesa mais forte contra injeção de HTML, mas o
  Monaco escreve HTML por conta própria e precisaria de uma política sob
  medida. Sem um ambiente para testar isso de verdade, entrar com ela agora
  significaria arriscar quebrar o editor em produção para ganhar proteção
  contra um vetor que hoje não existe: não há `innerHTML` no código.
- **Relatório de violação de CSP.** Exigiria um endpoint, e portanto um
  backend, que este projeto não tem.

## Escopo

Não há dado de usuário nem segredo no cliente, então o foco é higiene de
front-end: cabeçalhos, dependências e superfície de injeção. Os cabeçalhos
ficam em `vercel.json` e são cobertos por `src/security.test.ts`, que roda no
CI a cada push.
