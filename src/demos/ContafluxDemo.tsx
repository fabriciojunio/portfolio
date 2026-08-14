import { useEffect, useRef, useState } from "react";
import {
  cruzou,
  dentroDoSegmento,
  lado,
  type Linha,
} from "./logica/contagemDeLinha";

// Demonstração da regra de contagem do Contaflux: o sinal do produto vetorial
// diz de que lado da linha o veículo está, e a troca de sinal entre dois
// quadros significa que ele atravessou no intervalo. A conta em si mora em
// logica/contagemDeLinha.ts; aqui é só a pista e o placar.

const W = 520;
const H = 300;

type Porte = "moto" | "carro" | "caminhão";

interface Veiculo {
  id: number;
  x: number;
  y: number;
  vx: number;
  largura: number;
  altura: number;
  porte: Porte;
  faixa: number;
  ladoAnterior: number | null;
  contadoEm: number | null;
}

const PORTES: { porte: Porte; largura: number; altura: number }[] = [
  { porte: "moto", largura: 16, altura: 9 },
  { porte: "carro", largura: 30, altura: 14 },
  { porte: "carro", largura: 34, altura: 15 },
  { porte: "caminhão", largura: 54, altura: 19 },
];

// Quatro faixas: as duas de cima descem, as duas de baixo sobem.
const FAIXAS = [
  { y: 96, sentido: 1 },
  { y: 128, sentido: 1 },
  { y: 176, sentido: -1 },
  { y: 208, sentido: -1 },
];

let proximoId = 1;

function nascer(): Veiculo {
  const faixa = Math.floor(Math.random() * FAIXAS.length);
  const { y, sentido } = FAIXAS[faixa];
  const modelo = PORTES[Math.floor(Math.random() * PORTES.length)];
  const velocidade = (1.1 + Math.random() * 1.5) * sentido;
  return {
    id: proximoId++,
    x: sentido > 0 ? -modelo.largura : W,
    y: y - modelo.altura / 2,
    vx: velocidade,
    largura: modelo.largura,
    altura: modelo.altura,
    porte: modelo.porte,
    faixa,
    ladoAnterior: null,
    contadoEm: null,
  };
}

export default function ContafluxDemo() {
  const [linha, setLinha] = useState<Linha>({ x1: 300, y1: 60, x2: 300, y2: 244 });
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [rodando, setRodando] = useState(true);
  const [totais, setTotais] = useState({ descendo: 0, subindo: 0 });
  const [porPorte, setPorPorte] = useState<Record<Porte, number>>({
    moto: 0,
    carro: 0,
    "caminhão": 0,
  });
  const [arrastando, setArrastando] = useState<"p1" | "p2" | null>(null);
  const [quadro, setQuadro] = useState(0);

  const svgRef = useRef<SVGSVGElement>(null);
  const linhaRef = useRef(linha);
  linhaRef.current = linha;

  useEffect(() => {
    if (!rodando) return;
    let vivo = true;
    let ultimoNascimento = 0;

    const passo = () => {
      if (!vivo) return;
      setQuadro((q) => {
        const atual = q + 1;

        setVeiculos((antes) => {
          const l = linhaRef.current;
          let descendo = 0;
          let subindo = 0;
          const contados: Porte[] = [];

          const depois = antes
            .map((v) => {
              const x = v.x + v.vx;
              const cx = x + v.largura / 2;
              const cy = v.y + v.altura / 2;
              const ladoAtual = lado(l, cx, cy);
              let contadoEm = v.contadoEm;

              const trocou =
                v.ladoAnterior !== null && cruzou(v.ladoAnterior, ladoAtual);

              if (contadoEm === null && trocou && dentroDoSegmento(l, cx, cy)) {
                contadoEm = atual;
                contados.push(v.porte);
                if (v.vx > 0) descendo += 1;
                else subindo += 1;
              }

              return { ...v, x, ladoAnterior: ladoAtual, contadoEm };
            })
            .filter((v) => v.x > -90 && v.x < W + 90);

          if (descendo || subindo) {
            setTotais((t) => ({
              descendo: t.descendo + descendo,
              subindo: t.subindo + subindo,
            }));
          }
          if (contados.length) {
            setPorPorte((p) => {
              const novo = { ...p };
              for (const porte of contados) novo[porte] += 1;
              return novo;
            });
          }

          if (atual - ultimoNascimento > 26 && depois.length < 9) {
            ultimoNascimento = atual;
            return [...depois, nascer()];
          }
          return depois;
        });

        return atual;
      });
      requestAnimationFrame(passo);
    };

    const id = requestAnimationFrame(passo);
    return () => {
      vivo = false;
      cancelAnimationFrame(id);
    };
  }, [rodando]);

  const posicaoNoSvg = (e: React.MouseEvent) => {
    const rect = svgRef.current!.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * W,
      y: ((e.clientY - rect.top) / rect.height) * H,
    };
  };

  const aoMover = (e: React.MouseEvent) => {
    if (!arrastando) return;
    const { x, y } = posicaoNoSvg(e);
    setLinha((l) =>
      arrastando === "p1"
        ? { ...l, x1: Math.round(x), y1: Math.round(y) }
        : { ...l, x2: Math.round(x), y2: Math.round(y) },
    );
  };

  const zerar = () => {
    setTotais({ descendo: 0, subindo: 0 });
    setPorPorte({ moto: 0, carro: 0, "caminhão": 0 });
    setVeiculos((vs) => vs.map((v) => ({ ...v, contadoEm: null })));
  };

  const total = totais.descendo + totais.subindo;

  return (
    <div className="space-y-3 text-[12.5px] font-mono text-[#c9c5ba]">
      <div className="flex flex-wrap items-center gap-3 text-[11.5px]">
        <span className="text-[#9ea2ab]">
          conta na troca de sinal de{" "}
          <span className="text-[#e6e3dc]">(x₂−x₁)(y−y₁) − (y₂−y₁)(x−x₁)</span>
        </span>
        <button
          type="button"
          onClick={() => setRodando((r) => !r)}
          className="text-[#9ea2ab] hover:text-[#e6e3dc] underline-offset-2 hover:underline"
        >
          {rodando ? "pausar" : "continuar"}
        </button>
        <button
          type="button"
          onClick={zerar}
          className="text-[#9ea2ab] hover:text-[#e6e3dc] underline-offset-2 hover:underline"
        >
          zerar contagem
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative shrink-0">
          <svg
            ref={svgRef}
            width={W}
            height={H}
            viewBox={`0 0 ${W} ${H}`}
            className="bg-[#0a0b0e] border border-[#272b34] rounded select-none"
            onMouseMove={aoMover}
            onMouseUp={() => setArrastando(null)}
            onMouseLeave={() => setArrastando(null)}
          >
            <Pista />

            {veiculos.map((v) => {
              const recemContado =
                v.contadoEm !== null && quadro - v.contadoEm < 22;
              const cor = recemContado ? "#cf6464" : "#7cb37b";
              return (
                <g key={v.id}>
                  <rect
                    x={v.x}
                    y={v.y}
                    width={v.largura}
                    height={v.altura}
                    rx="2.5"
                    fill="none"
                    stroke={cor}
                    strokeWidth="1.4"
                  />
                  <text
                    x={v.x}
                    y={v.y - 4}
                    fill={cor}
                    fontSize="9.5"
                    fontFamily="JetBrains Mono"
                  >
                    #{v.id} {v.porte}
                  </text>
                </g>
              );
            })}

            <line
              x1={linha.x1}
              y1={linha.y1}
              x2={linha.x2}
              y2={linha.y2}
              stroke="#e36b3a"
              strokeWidth="2"
            />
            <Alca
              x={linha.x1}
              y={linha.y1}
              aoPegar={() => setArrastando("p1")}
            />
            <Alca
              x={linha.x2}
              y={linha.y2}
              aoPegar={() => setArrastando("p2")}
            />
          </svg>
          <div className="absolute top-2 left-2 text-[10.5px] text-[#6c7079] font-mono pointer-events-none">
            arraste as pontas da linha laranja
          </div>
        </div>

        <div className="flex-1 min-w-[220px] space-y-3">
          <Card title="placar">
            <div className="space-y-1">
              <Row k="total" v={String(total)} color="#f0a570" />
              <Row k="descendo" v={String(totais.descendo)} />
              <Row k="subindo" v={String(totais.subindo)} />
            </div>
          </Card>

          <Card title="por porte">
            <div className="space-y-1">
              <Row k="moto" v={String(porPorte.moto)} />
              <Row k="carro" v={String(porPorte.carro)} />
              <Row k="caminhão" v={String(porPorte["caminhão"])} />
            </div>
          </Card>

          <Card title="a linha">
            <div className="space-y-1">
              <Row
                k="coordenadas"
                v={`${linha.x1},${linha.y1} → ${linha.x2},${linha.y2}`}
              />
              <Row k="acompanhando" v={String(veiculos.length)} />
            </div>
            <p className="mt-2 pt-2 border-t border-[#272b34] text-[11px] text-[#6c7079] leading-relaxed">
              Encoste a linha em uma pista só: o que passa fora do trecho
              desenhado não entra na conta. É assim que se ignora o sentido
              contrário.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Alca({
  x,
  y,
  aoPegar,
}: {
  x: number;
  y: number;
  aoPegar: () => void;
}) {
  return (
    <circle
      cx={x}
      cy={y}
      r="6"
      fill="#0a0b0e"
      stroke="#e36b3a"
      strokeWidth="1.6"
      className="cursor-grab active:cursor-grabbing"
      onMouseDown={aoPegar}
    />
  );
}

function Row({ k, v, color }: { k: string; v: string; color?: string }) {
  return (
    <div className="flex justify-between text-[11.5px]">
      <span className="text-[#9ea2ab]">{k}</span>
      <span style={{ color: color ?? "#e6e3dc" }}>{v}</span>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0a0b0e] border border-[#272b34] rounded p-3">
      <div className="text-[10px] uppercase tracking-[1.2px] text-[#6c7079] mb-2">
        {title}
      </div>
      {children}
    </div>
  );
}

function Pista() {
  return (
    <g>
      <rect x="0" y="74" width={W} height="156" fill="#15171c" />
      <line x1="0" y1="74" x2={W} y2="74" stroke="#3a3e48" strokeWidth="1.2" />
      <line x1="0" y1="230" x2={W} y2="230" stroke="#3a3e48" strokeWidth="1.2" />
      <line
        x1="0"
        y1="152"
        x2={W}
        y2="152"
        stroke="#d4a247"
        strokeWidth="1.2"
        opacity="0.55"
      />
      <line
        x1="0"
        y1="112"
        x2={W}
        y2="112"
        stroke="#3a3e48"
        strokeWidth="1"
        strokeDasharray="14 12"
      />
      <line
        x1="0"
        y1="192"
        x2={W}
        y2="192"
        stroke="#3a3e48"
        strokeWidth="1"
        strokeDasharray="14 12"
      />
    </g>
  );
}
