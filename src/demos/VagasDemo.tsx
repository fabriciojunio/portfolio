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
    <div className="space-y-3 text-[12.5px] font-mono text-[#c4c4c4]">
      <p className="text-[11.5px] text-[#9a9a9a]">
        motor de score do JIS (pesos: remoto 30% · stack match 25% · senioridade 20% · salário 15% · tier 10%).
      </p>

      <div className="bg-[#0c0c0c] border border-[#262626] rounded p-3">
        <div className="text-[10px] uppercase tracking-[1.2px] text-[#6b6b6b] mb-2">
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
                className={`text-[11px] px-2 py-[3px] rounded-sm border transition-colors ${on ? "border-[#ffffff] text-[#ffffff] bg-[#151515]" : "border-[#262626] text-[#9a9a9a] hover:text-[#ededed]"}`}
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
            className="flex items-stretch bg-[#0c0c0c] border border-[#262626] rounded p-3"
          >
            <div className="w-8 text-[#6b6b6b] text-[11px] mr-2">
              {String(i + 1).padStart(2, "0")}.
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-[#ededed] font-medium">{v.cargo}</span>
                <span className="text-[#9a9a9a] text-[11.5px]">{v.empresa}</span>
                {v.remoto && (
                  <span className="text-[10px] text-[#ededed] uppercase tracking-[1px]">
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
                        color: match ? "#ffffff" : "#6b6b6b",
                        borderColor: match ? "#ffffff66" : "#262626",
                      }}
                    >
                      {t}
                    </span>
                  );
                })}
              </div>
              <div className="mt-1 text-[10.5px] text-[#6b6b6b]">
                R$ {v.salario.toLocaleString("pt-BR")} · tier {(v.tier * 10).toFixed(0)}
              </div>
            </div>
            <div className="ml-3 flex flex-col items-end justify-center">
              <span className="text-[18px] text-[#d4d4d4] tabular-nums">
                {(s * 100).toFixed(0)}
              </span>
              <span className="text-[10px] text-[#6b6b6b]">score</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
