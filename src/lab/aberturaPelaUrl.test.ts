import { describe, expect, it } from "vitest";
import { aberturaPedida } from "./aberturaPelaUrl";
import { PROJECTS } from "../site/data";

describe("abertura da IDE pela URL", () => {
  it("abre o arquivo pedido e liga o painel quando run=1", () => {
    const pedido = aberturaPedida("?arquivo=/projetos/contaflux.py&run=1");
    expect(pedido).toEqual({ caminho: "/projetos/contaflux.py", rodar: true });
  });

  it("sem run=1 o arquivo abre, mas o painel fica fechado", () => {
    expect(aberturaPedida("?arquivo=/projetos/cardiocam.py")).toEqual({
      caminho: "/projetos/cardiocam.py",
      rodar: false,
    });
  });

  it("aceita o caminho codificado, que é como o link é gerado", () => {
    const busca = `?arquivo=${encodeURIComponent("/projetos/kaida.cs")}&run=1`;
    expect(aberturaPedida(busca)?.caminho).toBe("/projetos/kaida.cs");
  });

  it("sem parâmetro nenhum, a IDE abre como sempre", () => {
    expect(aberturaPedida("")).toBeNull();
  });

  it("caminho que não existe não abre aba nenhuma", () => {
    expect(aberturaPedida("?arquivo=/projetos/inventado.py&run=1")).toBeNull();
  });

  it("run=1 em arquivo sem demo não abre painel vazio", () => {
    expect(aberturaPedida("?arquivo=/sobre.md&run=1")).toEqual({
      caminho: "/sobre.md",
      rodar: false,
    });
  });

  it("todo link de demo da vitrine é entendido aqui", () => {
    // Fecha o circuito: o formato que o Work.tsx monta é o mesmo que esta
    // função lê. Se um dos dois mudar sozinho, o botão vira link quebrado.
    for (const p of PROJECTS) {
      if (!p.labDemo) continue;
      const busca = `?arquivo=${encodeURIComponent(p.labDemo)}&run=1`;
      expect(aberturaPedida(busca), `link de ${p.slug}`).toEqual({
        caminho: p.labDemo,
        rodar: true,
      });
    }
  });
});
