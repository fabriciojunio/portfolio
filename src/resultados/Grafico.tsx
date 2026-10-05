import { useId } from "react";
import { caminho, formatar, limites, paraTela } from "./formato";
import type { Eixo, Marca, Ponto } from "./tipos";

const LARGURA = 760;
const ALTURA = 300;
const MARGEM = { esq: 70, dir: 24, topo: 18, base: 44 };

interface Props {
  serie: Ponto[];
  secundaria?: { rotulo: string; pontos: Ponto[] };
  eixoX: Eixo;
  eixoY: Eixo;
  marcas: Marca[];
  /** Índice do ponto onde a alavanca parou. */
  indice: number;
  rotuloDaSerie: string;
}

/**
 * Gráfico de linha em SVG, sem biblioteca.
 *
 * São seis curvas de forma conhecida e nenhuma interação além de um marcador
 * que acompanha a alavanca. Uma biblioteca de gráfico custaria mais peso de
 * pacote do que o arquivo inteiro deste site.
 */
export default function Grafico({
  serie,
  secundaria,
  eixoX,
  eixoY,
  marcas,
  indice,
  rotuloDaSerie,
}: Props) {
  const id = useId();
  const caixa = limites(secundaria ? [serie, secundaria.pontos] : [serie]);
  const tela = (p: Ponto) => paraTela(p, caixa, LARGURA, ALTURA, MARGEM);

  const principal = serie.map(tela);
  const atual = serie[Math.min(Math.max(indice, 0), serie.length - 1)];
  const atualNaTela = tela(atual);

  const riscosY = [caixa.minY, (caixa.minY + caixa.maxY) / 2, caixa.maxY];
  const riscosX = [caixa.minX, (caixa.minX + caixa.maxX) / 2, caixa.maxX];

  return (
    <svg
      viewBox={`0 0 ${LARGURA} ${ALTURA}`}
      className="w-full h-auto"
      role="img"
      aria-label={`${eixoY.rotulo} por ${eixoX.rotulo}`}
    >
      <defs>
        <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ededed" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ededed" stopOpacity="0" />
        </linearGradient>
      </defs>

      {riscosY.map((v, i) => {
        const [, y] = tela([caixa.minX, v]);
        return (
          <g key={`y${i}`}>
            <line
              x1={MARGEM.esq}
              x2={LARGURA - MARGEM.dir}
              y1={y}
              y2={y}
              stroke="#ffffff"
              strokeOpacity="0.07"
            />
            <text
              x={MARGEM.esq - 10}
              y={y + 4}
              textAnchor="end"
              className="fill-[#767676]"
              style={{ fontSize: 11, fontFamily: "ui-monospace, monospace" }}
            >
              {formatar(v, eixoY.formato)}
            </text>
          </g>
        );
      })}

      {riscosX.map((v, i) => {
        const [x] = tela([v, caixa.minY]);
        return (
          <text
            key={`x${i}`}
            x={x}
            y={ALTURA - MARGEM.base + 20}
            textAnchor={i === 0 ? "start" : i === riscosX.length - 1 ? "end" : "middle"}
            className="fill-[#767676]"
            style={{ fontSize: 11, fontFamily: "ui-monospace, monospace" }}
          >
            {formatar(v, eixoX.formato)}
          </text>
        );
      })}

      {marcas.map((marca, i) => {
        if (marca.x !== undefined) {
          const [x] = tela([marca.x, caixa.minY]);
          if (x < MARGEM.esq || x > LARGURA - MARGEM.dir) return null;
          return (
            <g key={`m${i}`}>
              <line
                x1={x}
                x2={x}
                y1={MARGEM.topo}
                y2={ALTURA - MARGEM.base}
                stroke="#ffffff"
                strokeOpacity="0.28"
                strokeDasharray="3 4"
              />
              <text
                x={x + 6}
                y={MARGEM.topo + 12}
                className="fill-[#9a9a9a]"
                style={{ fontSize: 10.5, fontFamily: "ui-monospace, monospace" }}
              >
                {marca.rotulo}
              </text>
            </g>
          );
        }
        const [, y] = tela([caixa.minX, marca.y!]);
        if (y < MARGEM.topo || y > ALTURA - MARGEM.base) return null;
        return (
          <g key={`m${i}`}>
            <line
              x1={MARGEM.esq}
              x2={LARGURA - MARGEM.dir}
              y1={y}
              y2={y}
              stroke="#ffffff"
              strokeOpacity="0.28"
              strokeDasharray="3 4"
            />
            <text
              x={LARGURA - MARGEM.dir}
              y={y - 6}
              textAnchor="end"
              className="fill-[#9a9a9a]"
              style={{ fontSize: 10.5, fontFamily: "ui-monospace, monospace" }}
            >
              {marca.rotulo}
            </text>
          </g>
        );
      })}

      {secundaria ? (
        <path
          d={caminho(secundaria.pontos.map(tela))}
          fill="none"
          stroke="#767676"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
      ) : null}

      <path
        d={`${caminho(principal)} L${(LARGURA - MARGEM.dir).toFixed(2)},${(
          ALTURA - MARGEM.base
        ).toFixed(2)} L${MARGEM.esq.toFixed(2)},${(ALTURA - MARGEM.base).toFixed(2)} Z`}
        fill={`url(#${id}-area)`}
        stroke="none"
      />
      <path d={caminho(principal)} fill="none" stroke="#ededed" strokeWidth="2" />

      <line
        x1={atualNaTela[0]}
        x2={atualNaTela[0]}
        y1={MARGEM.topo}
        y2={ALTURA - MARGEM.base}
        stroke="#ffffff"
        strokeOpacity="0.45"
      />
      <circle cx={atualNaTela[0]} cy={atualNaTela[1]} r="5" fill="#ffffff" />

      <text
        x={MARGEM.esq}
        y={ALTURA - 8}
        className="fill-[#9a9a9a]"
        style={{ fontSize: 10.5, fontFamily: "ui-monospace, monospace" }}
      >
        {eixoX.rotulo}
        {secundaria ? ` · linha cheia: ${rotuloDaSerie} · tracejada: ${secundaria.rotulo}` : ""}
      </text>
    </svg>
  );
}
