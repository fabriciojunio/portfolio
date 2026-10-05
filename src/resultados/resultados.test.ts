import { describe, expect, it } from "vitest";
import { rotaDoEndereco } from "../rota";
import { PROJECTS } from "../site/data";
import { RESULTADOS } from "./dados";
import { caminho, formatar, limites, paraTela, preencherLeitura } from "./formato";

describe("formatação de número", () => {
  it("escreve dinheiro em português", () => {
    // Ponto no lugar da vírgula num número de provisão é o erro que ninguém
    // reporta e todo mundo vê.
    const texto = formatar(54755708, "moeda");
    expect(texto).toContain("54.755.708");
    expect(texto).toContain("R$");
  });

  it("usa vírgula decimal", () => {
    expect(formatar(0.5417, "decimal3")).toBe("0,542");
    expect(formatar(0.86, "decimal2")).toBe("0,86");
  });

  it("só mostra casa decimal no percentual quando ela diz algo", () => {
    expect(formatar(0.65, "percentual")).toBe("65%");
    expect(formatar(0.2126, "percentual")).toBe("21,3%");
  });

  it("preenche a leitura da alavanca", () => {
    expect(preencherLeitura("Com LGD de {x}, a provisão é {y}.", "65%", "R$ 1")).toBe(
      "Com LGD de 65%, a provisão é R$ 1.",
    );
  });
});

describe("geometria do gráfico", () => {
  it("dá folga vertical para o ponto do máximo não ser cortado", () => {
    const caixa = limites([
      [
        [0, 0],
        [1, 10],
      ],
    ]);
    expect(caixa.maxY).toBeGreaterThan(10);
    expect(caixa.minY).toBeLessThan(0);
    expect(caixa.minX).toBe(0);
    expect(caixa.maxX).toBe(1);
  });

  it("não divide por zero quando a série é plana", () => {
    const caixa = limites([
      [
        [5, 2],
        [5, 2],
      ],
    ]);
    const [x, y] = paraTela([5, 2], caixa, 100, 100, { esq: 0, dir: 0, topo: 0, base: 0 });
    expect(Number.isFinite(x)).toBe(true);
    expect(Number.isFinite(y)).toBe(true);
  });

  it("devolve caminho vazio para série vazia em vez de um 'M' solto", () => {
    expect(caminho([])).toBe("");
  });

  it("mapeia o canto de baixo à esquerda no canto de baixo à esquerda", () => {
    const caixa = { minX: 0, maxX: 10, minY: 0, maxY: 10 };
    const margem = { esq: 0, dir: 0, topo: 0, base: 0 };
    expect(paraTela([0, 0], caixa, 100, 100, margem)).toEqual([0, 100]);
    expect(paraTela([10, 10], caixa, 100, 100, margem)).toEqual([100, 0]);
  });
});

describe("roteamento", () => {
  it("abre a página de resultados com e sem projeto no caminho", () => {
    expect(rotaDoEndereco("/resultados")).toBe("resultados");
    expect(rotaDoEndereco("/resultados/")).toBe("resultados");
    expect(rotaDoEndereco("/resultados/lastro")).toBe("resultados");
    expect(rotaDoEndereco("/RESULTADOS/Lastro")).toBe("resultados");
  });

  it("não confunde um caminho que só começa parecido", () => {
    // `/resultadosx` não é a página de resultados, e um `startsWith` sem a
    // barra deixaria passar.
    expect(rotaDoEndereco("/resultadosx")).toBe("site");
    expect(rotaDoEndereco("/laboratorio")).toBe("site");
  });

  it("mantém o /lab e a raiz", () => {
    expect(rotaDoEndereco("/lab")).toBe("lab");
    expect(rotaDoEndereco("/")).toBe("site");
  });
});

describe("os dados gerados dos seis experimentos", () => {
  it("tem os seis projetos quantitativos", () => {
    expect(RESULTADOS.map((p) => p.slug).sort()).toEqual(
      ["anteparo", "decurso", "lastro", "prumo", "trato", "verbete"].sort(),
    );
  });

  it("todo projeto daqui também é um card do portfólio", () => {
    // Senão existe uma página no ar sobre um projeto que saiu do site, e o
    // link do README leva para uma seção órfã.
    const noSite = new Set(PROJECTS.map((p) => p.slug));
    for (const p of RESULTADOS) {
      expect(noSite.has(p.slug), `${p.slug} não está em PROJECTS`).toBe(true);
    }
  });

  it("toda alavanca tem curva com pelo menos dois pontos", () => {
    for (const p of RESULTADOS) {
      const series =
        p.alavanca.tipo === "continua" ? [p.alavanca.serie] : p.alavanca.series.map((s) => s.pontos);
      expect(series.length, `${p.slug} sem série`).toBeGreaterThan(0);
      for (const s of series) {
        expect(s.length, `${p.slug} com série de um ponto`).toBeGreaterThanOrEqual(2);
        for (const ponto of s) {
          expect(Number.isFinite(ponto[0]), `${p.slug} com x não numérico`).toBe(true);
          expect(Number.isFinite(ponto[1]), `${p.slug} com y não numérico`).toBe(true);
        }
      }
    }
  });

  it("toda leitura de alavanca usa os dois marcadores", () => {
    // Uma leitura sem {y} mostra a frase com o buraco no lugar do número, e
    // isso passa despercebido porque o resto da página continua certo.
    for (const p of RESULTADOS) {
      expect(p.alavanca.leitura, `${p.slug}`).toContain("{x}");
      expect(p.alavanca.leitura, `${p.slug}`).toContain("{y}");
    }
  });

  it("toda tabela de contraste tem o mesmo número de colunas em toda linha", () => {
    for (const p of RESULTADOS) {
      const n = p.contraste.colunas.length;
      expect(n).toBeGreaterThan(1);
      for (const linha of p.contraste.linhas) {
        expect(linha.length, `${p.slug}: linha com ${linha.length} células para ${n} colunas`).toBe(
          n,
        );
      }
      expect(p.contraste.destaque).toBeLessThan(p.contraste.linhas.length);
      expect(p.contraste.destaque).toBeGreaterThanOrEqual(-1);
    }
  });

  it("todo projeto declara o limite do número e o que o dado não tem", () => {
    // Esta página existe para mostrar que o número depende de uma escolha.
    // Publicar um número sem o limite ao lado desfaz exatamente isso.
    for (const p of RESULTADOS) {
      expect(p.limite.length, `${p.slug} sem limite`).toBeGreaterThan(40);
      expect(p.dado.limitacao.length, `${p.slug} sem limitação do dado`).toBeGreaterThan(20);
      expect(p.manchete.valor.length).toBeGreaterThan(0);
    }
  });

  it("nenhum texto usa travessão", () => {
    const tudo = JSON.stringify(RESULTADOS);
    expect(tudo).not.toContain("—");
  });

  it("nenhum NaN sobreviveu à leitura dos artefatos", () => {
    // O json.dump do Python escreve NaN sem aspas, e o extrator troca por
    // null. Se um "null" virasse número na curva o gráfico sumiria sem erro.
    const tudo = JSON.stringify(RESULTADOS);
    expect(tudo).not.toContain("NaN");
    expect(tudo).not.toContain("Infinity");
  });
});
