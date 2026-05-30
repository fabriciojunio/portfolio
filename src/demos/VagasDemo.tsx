import { useMemo, useState } from "react";

interface Vaga {
  empresa: string;
  cargo: string;
  remoto: boolean;
  tags: string[];
  salario: number;
  tier: number;
}

const VAGAS: Vaga[] = [
  { empresa: "GoCloud",   cargo: "FullStack Júnior",      remoto: true,  tags: ["TypeScript", "Next.js", "Postgres"], salario: 6000, tier: 0.8 },
  { empresa: "Inova SA",  cargo: "Dev Java Pleno",        remoto: false, tags: ["Java", "Spring", "Kafka"],            salario: 9500, tier: 0.6 },
  { empresa: "Pixie",     cargo: "Frontend React Júnior", remoto: true,  tags: ["React", "Tailwind"],                  salario: 4500, tier: 0.5 },
  { empresa: "DataLab",   cargo: "Engenheiro de Dados",   remoto: true,  tags: ["Python", "Airflow", "BigQuery"],      salario: 11000, tier: 0.9 },
  { empresa: "Bank Co",   cargo: "Tech Lead",             remoto: false, tags: ["Java", "Spring", "AWS"],              salario: 18000, tier: 1.0 },
  { empresa: "Devs.io",   cargo: "FullStack TS",          remoto: true,  tags: ["TypeScript", "React", "Node"],        salario: 7200, tier: 0.7 },
];

const WEIGHTS = {
  remoto: 0.3,
  stack_match: 0.25,
  senioridade: 0.2,
  salario: 0.15,
  tier: 0.1,
};

function senLevel(cargo: string): number {
  const t = cargo.toLowerCase();
  if (/\b(junior|jr|estag)\b/.test(t)) return 1.0;
  if (/\bpleno\b/.test(t)) return 0.6;
  if (/\b(senior|sr|tech lead|lead)\b/.test(t)) return 0.2;
  return 0.5;
}

function score(v: Vaga, userStack: string[]): number {
  const remote = v.remoto ? 1.0 : 0.2;
  const match = Math.min(1, v.tags.filter((t) => userStack.includes(t)).length / 3);
  const sen = senLevel(v.cargo);
  const sal = Math.min(1, v.salario / 8000);
  return (
    WEIGHTS.remoto * remote +
    WEIGHTS.stack_match * match +
    WEIGHTS.senioridade * sen +
    WEIGHTS.salario * sal +
    WEIGHTS.tier * v.tier
  );
}

const STACKS = ["TypeScript", "React", "Next.js", "Node", "Java", "Spring", "Postgres", "Python", "Airflow", "BigQuery", "Tailwind", "Kafka", "AWS"];

export default function VagasDemo() {
  const [stack, setStack] = useState<string[]>(["TypeScript", "React", "Node"]);

  const ranked = useMemo(() => {
    return [...VAGAS]
      .map((v) => ({ v, s: score(v, stack) }))
      .sort((a, b) => b.s - a.s);
  }, [stack]);

  const toggle = (tag: string) =>
    setStack((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );

  return (
    <div className="space-y-3 text-[12.5px] font-mono text-[#c9c5ba]">
      <p className="text-[11.5px] text-[#9ea2ab]">
        motor de score do JIS — pesos: remoto 30% · stack match 25% · senioridade 20% · salário 15% · tier 10%.
      </p>

      <div className="bg-[#0a0b0e] border border-[#272b34] rounded p-3">
        <div className="text-[10px] uppercase tracking-[1.2px] text-[#6c7079] mb-2">
          sua stack (selecione)
        </div>
        <div className="flex flex-wrap gap-1.5">
          {STACKS.map((s) => {
            const on = stack.includes(s);
            return (
              <button
                type="button"
                key={s}
                onClick={() => toggle(s)}
                className={`text-[11px] px-2 py-[3px] rounded-sm border transition-colors ${on ? "border-[#e36b3a] text-[#e36b3a] bg-[#1a120e]" : "border-[#272b34] text-[#9ea2ab] hover:text-[#e6e3dc]"}`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <ol className="space-y-1.5">
        {ranked.map(({ v, s }, i) => (
          <li
            key={v.empresa}
            className="flex items-stretch bg-[#0a0b0e] border border-[#272b34] rounded p-3"
          >
            <div className="w-8 text-[#6c7079] text-[11px] mr-2">
              {String(i + 1).padStart(2, "0")}.
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-[#e6e3dc] font-medium">{v.cargo}</span>
                <span className="text-[#9ea2ab] text-[11.5px]">{v.empresa}</span>
                {v.remoto && (
                  <span className="text-[10px] text-[#7cb37b] uppercase tracking-[1px]">
                    remoto
                  </span>
                )}
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {v.tags.map((t) => {
                  const match = stack.includes(t);
                  return (
                    <span
                      key={t}
                      className="text-[10.5px] px-1.5 py-[1px] rounded-sm border"
                      style={{
                        color: match ? "#e36b3a" : "#6c7079",
                        borderColor: match ? "#e36b3a66" : "#272b34",
                      }}
                    >
                      {t}
                    </span>
                  );
                })}
              </div>
              <div className="mt-1 text-[10.5px] text-[#6c7079]">
                R$ {v.salario.toLocaleString("pt-BR")} · tier {(v.tier * 10).toFixed(0)}
              </div>
            </div>
            <div className="ml-3 flex flex-col items-end justify-center">
              <span className="text-[18px] text-[#f0a570] tabular-nums">
                {(s * 100).toFixed(0)}
              </span>
              <span className="text-[10px] text-[#6c7079]">score</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
