import { useState } from "react";
import {
  BUFFER_PADRAO,
  COYOTE_PADRAO,
  FPS,
  QUADROS,
  ULTIMO_QUADRO_NO_CHAO,
  simular,
} from "./logica/pulo";

// Demonstração das duas regras de tempo do pulo do Kaida, do snippet em
// projetos/kaida.cs. A simulação quadro a quadro mora em logica/pulo.ts;
// aqui é só a linha do tempo desenhada.

export default function KaidaDemo() {
  const [quadroDoComando, setQuadroDoComando] = useState(22);
  const [coyoteTime, setCoyoteTime] = useState(COYOTE_PADRAO);
  const [bufferTime, setBufferTime] = useState(BUFFER_PADRAO);

  const { quadroDoPulo, motivo, linha } = simular(
    quadroDoComando,
    coyoteTime,
    bufferTime,
  );

  const semPerdao = simular(quadroDoComando, 0, 0);
  const salvoPelasRegras = quadroDoPulo !== null && semPerdao.quadroDoPulo === null;

  return (
    <div className="space-y-3 text-[12.5px] font-mono text-[#c4c4c4]">
      <div className="space-y-2">
        <Deslizante
          rotulo="apertou pulo no quadro"
          valor={quadroDoComando}
          min={0}
          max={QUADROS - 1}
          passo={1}
          formatar={(v) => {
            const atraso = ((v - ULTIMO_QUADRO_NO_CHAO) / FPS) * 1000;
            if (v <= ULTIMO_QUADRO_NO_CHAO) return `${v} (ainda no chão)`;
            return `${v} (${atraso.toFixed(0)} ms tarde)`;
          }}
          aoMudar={setQuadroDoComando}
        />
        <Deslizante
          rotulo="coyote time"
          valor={coyoteTime}
          min={0}
          max={0.3}
          passo={0.01}
          formatar={(v) => `${(v * 1000).toFixed(0)} ms`}
          aoMudar={setCoyoteTime}
        />
        <Deslizante
          rotulo="buffer de pulo"
          valor={bufferTime}
          min={0}
          max={0.3}
          passo={0.01}
          formatar={(v) => `${(v * 1000).toFixed(0)} ms`}
          aoMudar={setBufferTime}
        />
      </div>

      <div className="bg-[#0c0c0c] border border-[#262626] rounded p-3 space-y-3">
        <Faixa
          titulo="chão"
          cor="#383838"
          celulas={linha.map((l) => (l.noChao ? 1 : 0))}
        />
        <Faixa
          titulo="coyote"
          cor="#b8b8b8"
          celulas={linha.map((l) => (coyoteTime > 0 ? l.coyote / coyoteTime : 0))}
        />
        <Faixa
          titulo="buffer"
          cor="#8a8a8a"
          celulas={linha.map((l) => (bufferTime > 0 ? l.buffer / bufferTime : 0))}
        />
        <Faixa
          titulo="pulo"
          cor="#ededed"
          celulas={linha.map((l) => (l.quadro === quadroDoPulo ? 1 : 0))}
        />

        <div className="flex justify-between text-[10px] text-[#6b6b6b] pl-[62px]">
          <span>quadro 0</span>
          <span>borda no {ULTIMO_QUADRO_NO_CHAO}</span>
          <span>quadro {QUADROS - 1}</span>
        </div>
      </div>

      <div className="bg-[#0c0c0c] border border-[#262626] rounded p-3">
        <div className="flex justify-between text-[11.5px]">
          <span className="text-[#9a9a9a]">resultado</span>
          <span style={{ color: quadroDoPulo === null ? "#8a8a8a" : "#ededed" }}>
            {quadroDoPulo === null
              ? "não pulou"
              : `pulou no quadro ${quadroDoPulo}`}
          </span>
        </div>
        <p className="mt-2 text-[11px] text-[#6b6b6b] leading-relaxed">{motivo}</p>
        {salvoPelasRegras && (
          <p className="mt-2 pt-2 border-t border-[#262626] text-[11px] text-[#b8b8b8] leading-relaxed">
            Sem coyote e sem buffer, este mesmo comando não teria pulado. É essa
            a diferença entre um controle que perdoa alguns quadros e um que o
            jogador jura estar travado.
          </p>
        )}
      </div>
    </div>
  );
}

function Faixa({
  titulo,
  cor,
  celulas,
}: {
  titulo: string;
  cor: string;
  celulas: number[];
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-[54px] shrink-0 text-[10.5px] text-[#9a9a9a] text-right">
        {titulo}
      </span>
      <div className="flex-1 flex gap-[1px] h-[16px]">
        {celulas.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-[1px]"
            style={{
              background: v > 0 ? cor : "#151515",
              opacity: v > 0 ? 0.35 + v * 0.65 : 1,
            }}
          />
        ))}
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
      <span className="w-[130px] shrink-0 text-right text-[#ededed]">
        {formatar(valor)}
      </span>
    </label>
  );
}
