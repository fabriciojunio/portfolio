import type { Formato, Ponto } from "./tipos";

/**
 * Formatação de número em português, separada do desenho para poder ser testada.
 *
 * Ponto em vez de vírgula num número de provisão é o tipo de erro que ninguém
 * reporta e todo mundo vê.
 */
export function formatar(valor: number, formato: Formato): string {
  switch (formato) {
    case "moeda":
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0,
      });
    case "inteiro":
    case "decimal0":
      return Math.round(valor).toLocaleString("pt-BR");
    case "decimal2":
      return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    case "decimal3":
      return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
    case "decimal4":
      return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      });
    case "percentual": {
      const cem = valor * 100;
      // Uma casa decimal só quando ela diz alguma coisa: "65%" lê melhor que
      // "65,0%", mas "21,3%" perde informação virando "21%".
      const casas = Math.abs(cem - Math.round(cem)) < 0.05 ? 0 : 1;
      return `${cem.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas,
      })}%`;
    }
  }
}

/** Troca {x} e {y} na frase da alavanca pelos valores já formatados. */
export function preencherLeitura(
  modelo: string,
  x: string,
  y: string,
): string {
  return modelo.replace(/\{x\}/g, x).replace(/\{y\}/g, y);
}

export interface Caixa {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

/**
 * Extremos de uma ou mais séries, com folga de 6% no eixo vertical.
 *
 * Sem a folga, a curva encosta na borda de cima e o ponto do máximo fica
 * cortado pela metade, que é onde quase sempre está o que interessa ver.
 */
export function limites(series: Ponto[][]): Caixa {
  const pontos = series.flat();
  if (pontos.length === 0) {
    return { minX: 0, maxX: 1, minY: 0, maxY: 1 };
  }
  const xs = pontos.map((p) => p[0]);
  const ys = pontos.map((p) => p[1]);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const folga = (maxY - minY) * 0.06 || Math.abs(maxY) * 0.06 || 1;
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: minY - folga,
    maxY: maxY + folga,
  };
}

/** Converte um ponto de dado para coordenada de tela dentro de `caixa`. */
export function paraTela(
  ponto: Ponto,
  caixa: Caixa,
  largura: number,
  altura: number,
  margem: { esq: number; dir: number; topo: number; base: number },
): Ponto {
  const util = {
    l: largura - margem.esq - margem.dir,
    a: altura - margem.topo - margem.base,
  };
  const fx = caixa.maxX === caixa.minX ? 0.5 : (ponto[0] - caixa.minX) / (caixa.maxX - caixa.minX);
  const fy = caixa.maxY === caixa.minY ? 0.5 : (ponto[1] - caixa.minY) / (caixa.maxY - caixa.minY);
  return [margem.esq + fx * util.l, margem.topo + (1 - fy) * util.a];
}

/** Caminho SVG de uma série já convertida para coordenadas de tela. */
export function caminho(pontos: Ponto[]): string {
  if (pontos.length === 0) return "";
  return pontos
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");
}
