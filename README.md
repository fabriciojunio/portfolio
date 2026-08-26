# portfolio

O site que reúne o que eu construí, em três idiomas, montado por um gerador
escrito em Java.

**[portfolio-a3qn.vercel.app](https://portfolio-a3qn.vercel.app)** ·
[EN](https://portfolio-a3qn.vercel.app/en/) ·
[ES](https://portfolio-a3qn.vercel.app/es/)

---

## Como ele é montado

O site tem duas metades que não sabem uma da outra.

**A página principal é HTML estático gerado por Java.** Um programa em
`gerador/` lê o conteúdo de `conteudo/site.json` e escreve `gerado/`, com uma
página por idioma. Nada de framework de template: são seis seções e uma página
por idioma, e com o texto montado em Java o compilador cobra cada campo que
deixar de existir.

**O `/lab` é a IDE no navegador**, e essa parte continua em React com o Monaco,
porque editor de código dentro da página é JavaScript por natureza.

```
conteudo/site.json     conteúdo, exportado do TypeScript onde é escrito
gerador/               Java 21 + Maven, 41 testes
gerado/                saída versionada: index.html, en/, es/, site.css, sitemap.xml
src/                   a IDE do /lab, e os dados que alimentam o gerador
monta-dist.mjs         junta as duas metades numa pasta publicável
```

## Por que uma URL por idioma

`/`, `/en/` e `/es/`, com `hreflang` cruzado entre as três e `x-default` no
português.

A alternativa seria trocar o idioma no cliente, com um botão e um dicionário em
JavaScript. Ela é mais simples de escrever e pior no que importa: para um
buscador existe uma página só, e ele não tem como servir a versão em inglês para
quem pesquisa em inglês. Um recrutador de fora chega pela busca, não pelo botão.

## Por que o HTML gerado é versionado

A Vercel não garante JVM no ambiente de build. Apostar a publicação do site
nisso seria trocar um risco conhecido por um invisível.

Então o Java roda no CI, o resultado entra no repositório e a Vercel só serve
arquivo estático. Isso cria o risco oposto, de o gerado sair de sincronia com o
gerador em silêncio, e é por isso que existe um job que gera tudo de novo e
compara. Editar o HTML na mão quebra o build em vez de passar despercebido.

## Rodando

Precisa de Node 22, Java 21 e Maven.

```bash
npm install
npm run gerar      # exporta o conteúdo, compila o gerador e escreve gerado/
npm run build      # + Vite para o /lab, e monta o dist/
npm test           # 223 testes de TypeScript
npm run test:gerador   # 41 testes do gerador
```

Para ver o resultado antes de publicar, sirva o `dist/` como estático. Abrir o
`index.html` direto do disco não funciona, porque os caminhos são relativos à
raiz do site.

## Segurança

A política de segurança fica em `vercel.json` e é verificada por teste, não por
memória.

O ponto que mais afeta o gerador: a CSP não permite script inline
(`script-src 'self'`). Por isso o gerador não sabe emitir `<script>` com
conteúdo, e há um teste que falha se algum aparecer. Sem ele, a página abriria
normalmente aqui e quebraria calada em produção, quando o navegador bloqueasse.

O seletor de idioma são âncoras de verdade pelo mesmo motivo, e ganha de brinde
o que botão com JavaScript não dá: dá para abrir em aba nova, copiar o endereço
e ser seguido por um robô de busca.

Todo link externo sai com `rel="noopener noreferrer"`, concentrado numa função
só, com teste que conta os `target="_blank"` e exige o mesmo número de `rel`.

O `robots.txt` libera buscador e barra coletor de treino de modelo. Isso é
convenção, não controle de acesso, e está escrito lá dentro que é assim.

## O que o gerador cobre

| Assunto | O que os testes garantem |
|---|---|
| Escape | Os cinco caracteres que quebram marcação, em elemento e em atributo |
| Idiomas | Os 26 projetos têm texto nos três, com a mesma quantidade de destaques |
| Links | Nenhum `target="_blank"` sem `noopener`, nenhum `href="null"` |
| CSP | Nenhum script inline, nenhum atributo `on*` |
| Caminhos | O relativo de `/en/` para a raiz sobe um nível, e o CSS resolve nos três |
| Determinismo | Gerar duas vezes dá byte a byte o mesmo resultado |
| Limpeza | Remover um idioma apaga a pasta dele em vez de deixá-la publicada |

O teste de determinismo e o de quebra de linha existem pelo mesmo motivo: a
saída é comparada no CI, e com CRLF no Windows e LF no Linux a comparação
acusaria mudança em todo arquivo a cada build.
