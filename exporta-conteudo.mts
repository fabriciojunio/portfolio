/**
 * Extrai o conteúdo do site para JSON, que é o que o gerador em Java lê.
 *
 * Existe porque o conteúdo continua sendo escrito em TypeScript, onde o editor
 * confere os tipos, mas quem monta o HTML é Java. Rodar isto no build mantém
 * uma fonte só: mudar o data.ts é suficiente, e ninguém precisa lembrar de
 * copiar nada.
 */
import {
  PROJETOS_EIXO, PROJETOS_PRODUTO, PROJETOS_FACULDADE, PROJETOS_OUTROS,
  SOBRE, STACK_GROUPS, EMPRESAS, type SiteProject,
} from "./src/site/data";
import { DICIONARIO } from "./src/site/i18n";
import { TRADUCOES } from "./src/site/i18n-projetos";
import { writeFileSync, mkdirSync } from "node:fs";

const bloco = (itens: SiteProject[]) =>
  itens.map((p) => ({
    slug: p.slug,
    name: p.name,
    year: p.year,
    github: p.github,
    demo: p.demo ?? null,
    labDemo: p.labDemo ?? null,
    stack: p.stack,
    snippetLang: p.snippetLang,
    snippet: p.snippet,
    texto: {
      pt: { oneLine: p.oneLine, what: p.what, role: p.role, highlights: p.highlights ?? [] },
      en: TRADUCOES.en[p.slug],
      es: TRADUCOES.es[p.slug],
    },
  }));

const saida = {
  geradoEm: new Date().toISOString(),
  blocos: {
    backend: bloco(PROJETOS_EIXO),
    produto: bloco(PROJETOS_PRODUTO),
    faculdade: bloco(PROJETOS_FACULDADE),
    acervo: bloco(PROJETOS_OUTROS),
  },
  textos: DICIONARIO,
  contato: SOBRE.contato,
  stack: STACK_GROUPS,
  empresas: EMPRESAS,
};

mkdirSync("conteudo", { recursive: true });
writeFileSync("conteudo/site.json", JSON.stringify(saida, null, 2), "utf-8");
console.log(`conteudo/site.json escrito`);
