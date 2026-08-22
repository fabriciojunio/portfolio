import { useState } from "react";
import {
  CHAO,
  FPS,
  IMPULSO,
  QUADROS,
  TETO,
  simular,
  toquesEspacados,
  velocidadesDepoisDeCadaToque,
  type Voo,
} from "./logica/impulso";

// Demonstração da regra central do voo do Bicudo, do snippet em
// projetos/bicudo.cs. A simulação quadro a quadro mora em logica/impulso.ts;
// aqui só se desenham as duas trajetórias lado a lado.

const LARGURA = 520;
const ALTURA = 150;

export default function BicudoDemo() {
  const [intervalo, setIntervalo] = useState(14);
  const [quantos, setQuantos] = useState(4);

  const toques = toquesEspacados(intervalo, quantos);
  const troca = simular(toques, "troca");
  const soma = simular(toques, "soma");

  const velocidadesSoma = velocidadesDepoisDeCadaToque(toques, "soma");

  return (
    <div className="space-y-3 text-[12.5px] font-mono text-[#c4c4c4]">
      <div className="space-y-2">
        <Deslizante
          rotulo="intervalo entre toques"
          valor={intervalo}
          min={4}
          max={40}
          passo={1}
          formatar={(v) => `${v} quadros (${((v / FPS) * 1000).toFixed(0)} ms)`}
          aoMudar={setIntervalo}
        />
        <Deslizante
          rotulo="quantas batidas"
          valor={quantos}
          min={1}
          max={8}
          passo={1}
          formatar={(v) => `${v}`}
          aoMudar={setQuantos}
        />
      </div>

      <Grafico titulo="troca a velocidade (o jogo)" voo={troca} cor="#ededed" />
      <Grafico titulo="soma à velocidade" voo={soma} cor="#8a8a8a" />

      <div className="bg-[#0c0c0c] border border-[#262626] rounded p-3 space-y-2">
        <Linha
          rotulo="altura máxima trocando"
          valor={`${troca.alturaMaxima.toFixed(1)} un`}
          cor="#ededed"
        />
        <Linha
          rotulo="altura máxima somando"
          valor={`${soma.alturaMaxima.toFixed(1)} un`}
          cor={soma.saiuPeloTeto ? "#8a8a8a" : "#c4c4c4"}
        />
        <Linha
          rotulo="velocidade após cada toque, somando"
          valor={velocidadesSoma.map((v) => v.toFixed(1)).join("  ")}
          cor="#8a8a8a"
        />

        <p className="pt-2 border-t border-[#262626] text-[11px] text-[#6b6b6b] leading-relaxed">
          Trocando, toda batida devolve a mesma velocidade, {IMPULSO} un/s,
          venha o pássaro subindo ou despencando. É isso que faz a altura de um
          toque ser previsível, e o jogo virar uma questão de quando bater.
        </p>

        {soma.saiuPeloTeto && (
          <p className="text-[11px] text-[#b8b8b8] leading-relaxed">
            Somando, estas mesmas batidas jogam o pássaro para fora da tela. A
            estratégia deixa de ser ritmo e passa a ser apertar mais rápido que
            o outro.
          </p>
        )}
      </div>
    </div>
  );
}

function Grafico({
  titulo,
  voo,
  cor,
}: {
  titulo: string;
  voo: Voo;
  cor: string;
}) {
  // O desenho vai de um pouco acima do teto até o chão, para a saída pelo
  // topo aparecer em vez de ficar cortada na borda.
  const alto = TETO + 3;
  const emY = (altura: number) =>
    ((alto - altura) / (alto - CHAO)) * ALTURA;
  const emX = (quadro: number) => (quadro / (QUADROS - 1)) * LARGURA;

  const pontos = voo.linha
    .map((q) => `${emX(q.quadro).toFixed(1)},${emY(q.altura).toFixed(1)}`)
    .join(" ");

  return (
    <div className="bg-[#0c0c0c] border border-[#262626] rounded p-3">
      <div className="mb-2 flex justify-between text-[10.5px]">
        <span className="text-[#9a9a9a]">{titulo}</span>
        <span style={{ color: voo.saiuPeloTeto ? "#8a8a8a" : "#6b6b6b" }}>
          {voo.saiuPeloTeto ? "saiu pelo topo" : `topo em ${voo.alturaMaxima.toFixed(1)} un`}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${LARGURA} ${ALTURA}`}
        className="w-full h-[110px]"
        preserveAspectRatio="none"
        role="img"
        aria-label={titulo}
      >
        <line
          x1={0}
          y1={emY(TETO)}
          x2={LARGURA}
          y2={emY(TETO)}
          stroke="#383838"
          strokeWidth={1}
          strokeDasharray="4 4"
        />
        <line
          x1={0}
          y1={emY(CHAO)}
          x2={LARGURA}
          y2={emY(CHAO)}
          stroke="#4a4a4a"
          strokeWidth={2}
        />
        {voo.linha
          .filter((q) => q.bateuAsa)
          .map((q) => (
            <line
              key={q.quadro}
              x1={emX(q.quadro)}
              y1={0}
              x2={emX(q.quadro)}
              y2={ALTURA}
              stroke="#262626"
              strokeWidth={1}
            />
          ))}
        <polyline
          points={pontos}
          fill="none"
          stroke={cor}
          strokeWidth={1.8}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

function Linha({
  rotulo,
  valor,
  cor,
}: {
  rotulo: string;
  valor: string;
  cor: string;
}) {
  return (
    <div className="flex justify-between gap-4 text-[11.5px]">
      <span className="text-[#9a9a9a] shrink-0">{rotulo}</span>
      <span className="text-right" style={{ color: cor }}>
        {valor}
      </span>
    </div>
  );
}

function Deslizante({
  rotulo,
  valor,
  min,
  max,
  passo,
  formatar,
  aoMudar,
}: {
  rotulo: string;
  valor: number;
  min: number;
  max: number;
  passo: number;
  formatar: (v: number) => string;
  aoMudar: (v: number) => void;
}) {
  return (
    <label className="flex items-center gap-3 text-[11.5px]">
      <span className="w-[150px] shrink-0 text-[#9a9a9a]">{rotulo}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={passo}
        value={valor}
        onChange={(e) => aoMudar(Number(e.target.value))}
        className="flex-1 accent-[#ffffff]"
      />
      <span className="w-[150px] shrink-0 text-right text-[#ededed]">
        {formatar(valor)}
      </span>
    </label>
  );
}
