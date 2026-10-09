import { describe, expect, it } from "vitest";
import { rotaDoEndereco } from "../rota";
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
