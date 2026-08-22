import { useMemo, useState } from "react";
import {
  criterioPorNota,
  inferir,
  normalizarEngajamento,
  RISCO,
  type TermoRisco,
} from "./logica/fuzzy";

const COR: Record<TermoRisco, string> = {
  // Sem matiz, quem ordena é o brilho: quanto mais claro, mais grave.
  baixo: "#5c5c5c",
  medio: "#8a8a8a",
  alto: "#c4c4c4",
  critico: "#ffffff",
};

const ROTULO: Record<TermoRisco, string> = {
  baixo: "risco baixo",
  medio: "risco médio",
  alto: "risco alto",
  critico: "risco crítico",
};

/** Casos guardados: o do meio é o que o projeto existe para pegar. */
const PERFIS = [
  { nome: "Abandono em curso", frequencia: 18, notas: 2.1, acessos: 1 },
  { nome: "Notas boas, sumindo", frequencia: 34, notas: 8.6, acessos: 2 },
  { nome: "Trajetória saudável", frequencia: 96, notas: 9.1, acessos: 34 },
];

function Controle({
  rotulo,
  valor,
  min,
  max,
  passo,
  sufixo,
  onChange,
}: {
  rotulo: string;
  valor: number;
  min: number;
  max: number;
  passo: number;
  sufixo: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-xs text-neutral-400">
        <span>{rotulo}</span>
        <span className="font-mono text-neutral-200">
          {valor}
          {sufixo}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={passo}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full accent-neutral-300"
      />
    </label>
  );
}

export default function PermaneiaDemo() {
  const [frequencia, setFrequencia] = useState(34);
  const [notas, setNotas] = useState(8.6);
  const [acessos, setAcessos] = useState(2);

  const engajamento = useMemo(() => normalizarEngajamento(acessos), [acessos]);
  const r = useMemo(() => inferir(frequencia, notas, engajamento), [frequencia, notas, engajamento]);
  const porNota = criterioPorNota(notas);

  const fuzzyAlerta = r.faixa === "alto" || r.faixa === "critico";
  const divergem = fuzzyAlerta !== (porNota === "em risco");

  // Curva do conjunto agregado, que é a área de onde sai o centroide.
  const curva = useMemo(() => {
    const pontos: string[] = [];
    for (let i = 0; i <= 100; i += 1) {
      const x = i / 100;
      let altura = 0;
      for (const termo of ["baixo", "medio", "alto", "critico"] as TermoRisco[]) {
        const corte = r.agregado[termo];
        if (corte > 0) altura = Math.max(altura, Math.min(corte, RISCO[termo](x)));
      }
      pontos.push(`${(i / 100) * 320},${64 - altura * 56}`);
    }
    return pontos.join(" ");
  }, [r.agregado]);

  return (
    <div className="space-y-4 text-sm">
      <p className="text-xs leading-relaxed text-neutral-400">
        Sistema fuzzy de Mamdani com 27 regras que estima risco de evasão. Mexa nos três sinais e
        compare com o critério que a maioria das secretarias usa hoje, que é olhar só a média.
      </p>

      <div className="flex flex-wrap gap-2">
        {PERFIS.map((p) => (
          <button
            key={p.nome}
            type="button"
            onClick={() => {
              setFrequencia(p.frequencia);
              setNotas(p.notas);
              setAcessos(p.acessos);
            }}
            className="rounded border border-neutral-700 px-2 py-1 text-xs text-neutral-300 hover:border-neutral-500 hover:text-neutral-100"
          >
            {p.nome}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Controle rotulo="Frequência" valor={frequencia} min={0} max={100} passo={1} sufixo="%" onChange={setFrequencia} />
        <Controle rotulo="Média" valor={notas} min={0} max={10} passo={0.1} sufixo="" onChange={setNotas} />
        <Controle rotulo="Acessos" valor={acessos} min={0} max={40} passo={1} sufixo="" onChange={setAcessos} />
      </div>

      <div className="rounded border border-neutral-800 bg-neutral-900/60 p-3">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-neutral-400">Score defuzzificado pelo centroide</span>
          <span className="font-mono text-lg font-bold" style={{ color: COR[r.faixa] }}>
            {r.score.toFixed(3)} · {ROTULO[r.faixa]}
          </span>
        </div>

        <svg viewBox="0 0 320 70" className="mt-2 w-full" role="img" aria-label="Conjunto fuzzy agregado">
          <polyline points={curva} fill="none" stroke={COR[r.faixa]} strokeWidth="1.5" />
          <line
            x1={r.score * 320}
            y1="4"
            x2={r.score * 320}
            y2="64"
            stroke="#ededed"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <line x1="0" y1="64" x2="320" y2="64" stroke="#3a3a3a" strokeWidth="1" />
        </svg>
        <p className="text-[10px] text-neutral-500">
          A linha tracejada é o centro de gravidade da área. Engajamento normalizado:{" "}
          {engajamento.toFixed(2)} de 10.
        </p>
      </div>

      <div
        className={`rounded border p-3 ${
          divergem ? "border-neutral-700/70 bg-neutral-900/30" : "border-neutral-800 bg-neutral-900/60"
        }`}
      >
        <p className="text-xs">
          <span className="text-neutral-400">Critério por nota:</span>{" "}
          <span className="font-medium text-neutral-100">{porNota}</span>
          {divergem && (
            <span className="ml-2 text-neutral-200">
              diverge do fuzzy, que aponta {ROTULO[r.faixa]}
            </span>
          )}
        </p>
        {divergem && (
          <p className="mt-1 text-[11px] leading-relaxed text-neutral-100/80">
            É este o aluno que o critério da secretaria não enxerga: o abandono é precedido por
            desengajamento, não por queda de nota.
          </p>
        )}
      </div>

      <div>
        <p className="mb-1 text-xs text-neutral-400">
          Regras que mais pesaram, de {r.disparadas.length} disparadas:
        </p>
        <ul className="space-y-1">
          {r.disparadas.slice(0, 3).map((d) => (
            <li key={d.id} className="rounded border border-neutral-800 bg-neutral-900/40 p-2 text-[11px]">
              <span className="font-mono text-neutral-500">regra {d.id}</span>{" "}
              <span className="font-mono" style={{ color: COR[d.entao] }}>
                força {d.forca.toFixed(2)} → {d.entao}
              </span>
              <p className="mt-0.5 leading-relaxed text-neutral-400">{d.porque}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
