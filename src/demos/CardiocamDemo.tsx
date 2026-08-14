import { useMemo, useState } from "react";
import {
  BPM_MAX,
  BPM_MIN,
  estimarBpm,
  gerar,
  green,
  pos,
} from "./logica/rppg";

// Demonstração do caminho de sinais do Cardiocam: GREEN e POS lado a lado,
// sobre a mesma série. É onde dá para ver por que os dois não são
// intercambiáveis. A matemática mora em logica/rppg.ts.

export default function CardiocamDemo() {
  const [bpm, setBpm] = useState(72);
  const [nivelRuido, setNivelRuido] = useState(0.004);
  const [oscilacao, setOscilacao] = useState(0.02);

  const resultado = useMemo(() => {
    const serie = gerar(bpm, nivelRuido, oscilacao);
    const sinalGreen = green(serie);
    const sinalPos = pos(serie);
    return {
      green: { sinal: sinalGreen, ...estimarBpm(sinalGreen) },
      pos: { sinal: sinalPos, ...estimarBpm(sinalPos) },
    };
  }, [bpm, nivelRuido, oscilacao]);

  const erroGreen = Math.abs(resultado.green.bpm - bpm);
  const erroPos = Math.abs(resultado.pos.bpm - bpm);

  return (
    <div className="space-y-3 text-[12.5px] font-mono text-[#c9c5ba]">
      <div className="space-y-2">
        <Deslizante
          rotulo="batimento real"
          valor={bpm}
          min={45}
          max={160}
          passo={1}
          formatar={(v) => `${v} bpm`}
          aoMudar={setBpm}
        />
        <Deslizante
          rotulo="ruído do sensor"
          valor={nivelRuido}
          min={0}
          max={0.02}
          passo={0.001}
          formatar={(v) => `${(v * 100).toFixed(1)}% da intensidade`}
          aoMudar={setNivelRuido}
        />
        <Deslizante
          rotulo="luz oscilando"
          valor={oscilacao}
          min={0}
          max={0.06}
          passo={0.002}
          formatar={(v) => (v === 0 ? "estável" : `${(v * 100).toFixed(1)}%`)}
          aoMudar={setOscilacao}
        />
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Traçado
          titulo="GREEN"
          descricao="só o canal verde, invertido"
          sinal={resultado.green.sinal}
          espectro={resultado.green.espectro}
          bpm={resultado.green.bpm}
          erro={erroGreen}
        />
        <Traçado
          titulo="POS"
          descricao="projeção ortogonal ao tom de pele"
          sinal={resultado.pos.sinal}
          espectro={resultado.pos.espectro}
          bpm={resultado.pos.bpm}
          erro={erroPos}
        />
      </div>

      <div className="bg-[#0a0b0e] border border-[#272b34] rounded p-3 text-[11px] text-[#6c7079] leading-relaxed">
        Suba a <span className="text-[#9ea2ab]">luz oscilando</span>. A variação
        atinge os três canais de uma vez, e o GREEN não tem como distinguir isso
        de sangue: ele passa a medir a lâmpada. O POS projeta num plano
        ortogonal à direção do tom de pele, onde toda variação puramente de
        intensidade some, e continua achando o batimento. É por isso que os
        quatro algoritmos do projeto não são intercambiáveis.
      </div>
    </div>
  );
}

function Traçado({
  titulo,
  descricao,
  sinal,
  espectro,
  bpm,
  erro,
}: {
  titulo: string;
  descricao: string;
  sinal: number[];
  espectro: number[];
  bpm: number;
  erro: number;
}) {
  const w = 260;
  const h = 74;

  const maiorAbsoluto = Math.max(...sinal.map(Math.abs), 1e-9);
  const caminho = sinal
    .map((v, i) => {
      const x = (i / (sinal.length - 1)) * w;
      const y = h / 2 - (v / maiorAbsoluto) * (h / 2 - 4);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const maiorMag = Math.max(...espectro, 1e-9);
  const cor = erro <= 2 ? "#7cb37b" : erro <= 6 ? "#d4a247" : "#cf6464";

  return (
    <div className="bg-[#0a0b0e] border border-[#272b34] rounded p-3">
      <div className="flex items-baseline justify-between mb-2">
        <div>
          <span className="text-[11px] uppercase tracking-[1.2px] text-[#e6e3dc]">
            {titulo}
          </span>
          <span className="ml-2 text-[10.5px] text-[#6c7079]">{descricao}</span>
        </div>
        <span className="text-[13px]" style={{ color: cor }}>
          {bpm.toFixed(0)} bpm
        </span>
      </div>

      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} className="block">
        <line
          x1="0"
          y1={h / 2}
          x2={w}
          y2={h / 2}
          stroke="#272b34"
          strokeWidth="1"
        />
        <path d={caminho} fill="none" stroke={cor} strokeWidth="1.2" />
      </svg>

      <div className="mt-1.5 flex items-end gap-[1px] h-[34px]">
        {espectro.map((m, i) => (
          <div
            key={i}
            className="flex-1"
            style={{
              height: `${Math.max(2, (m / maiorMag) * 100)}%`,
              background: m === maiorMag ? cor : "#272b34",
            }}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-[#6c7079]">
        <span>{BPM_MIN} bpm</span>
        <span>erro {erro.toFixed(1)}</span>
        <span>{BPM_MAX} bpm</span>
      </div>
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
      <span className="w-[110px] shrink-0 text-[#9ea2ab]">{rotulo}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={passo}
        value={valor}
        onChange={(e) => aoMudar(Number(e.target.value))}
        className="flex-1 accent-[#e36b3a]"
      />
      <span className="w-[150px] shrink-0 text-right text-[#e6e3dc]">
        {formatar(valor)}
      </span>
    </label>
  );
}
