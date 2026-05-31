import { useMemo, useState } from "react";

function kelly(prob: number, odds: number, frac: number): number {
  const b = odds - 1;
  if (b <= 0) return 0;
  const q = 1 - prob;
  const full = (b * prob - q) / b;
  return Math.max(0, full * frac);
}

function edge(prob: number, odds: number): number {
  return prob * odds - 1;
}

interface Trial {
  bank: number;
  wins: number;
  losses: number;
}

export default function KellyDemo() {
  const [prob, setProb] = useState(0.55);
  const [odds, setOdds] = useState(2.1);
  const [bank, setBank] = useState(1000);
  const [frac, setFrac] = useState(0.25);
  const [trial, setTrial] = useState<Trial | null>(null);

  const k = kelly(prob, odds, frac);
  const e = edge(prob, odds);
  const stake = bank * k;

  const isValue = useMemo(() => e > 0.04, [e]);

  function simulate() {
    let b = bank;
    let wins = 0;
    let losses = 0;
    for (let i = 0; i < 500; i++) {
      const f = kelly(prob, odds, frac);
      const s = b * f;
      if (Math.random() < prob) {
        b += s * (odds - 1);
        wins++;
      } else {
        b -= s;
        losses++;
      }
    }
    setTrial({ bank: b, wins, losses });
  }

  return (
    <div className="space-y-3 text-[12.5px] font-mono text-[#c9c5ba]">
      <p className="text-[11.5px] text-[#9ea2ab]">
        critério de Kelly fracionário (1/4): quanto da banca apostar dado uma probabilidade e
        uma odd. Edge ≤ 0 = não aposta.
      </p>

      <div className="grid md:grid-cols-2 gap-3">
        <Card title="entrada">
          <Slider
            label="probabilidade do modelo"
            value={prob}
            min={0.3}
            max={0.85}
            step={0.005}
            onChange={setProb}
            display={`${(prob * 100).toFixed(1)}%`}
          />
          <Slider
            label="odd decimal da casa"
            value={odds}
            min={1.2}
            max={4.0}
            step={0.01}
            onChange={setOdds}
            display={odds.toFixed(2)}
          />
          <Slider
            label="banca (R$)"
            value={bank}
            min={100}
            max={10000}
            step={50}
            onChange={setBank}
            display={`R$ ${bank.toFixed(0)}`}
          />
          <Slider
            label="fração de Kelly"
            value={frac}
            min={0.1}
            max={1}
            step={0.05}
            onChange={setFrac}
            display={`${(frac * 100).toFixed(0)}%`}
          />
        </Card>

        <Card title="saída">
          <Row k="edge esperado" v={`${(e * 100).toFixed(2)}%`} color={e > 0.04 ? "#7cb37b" : "#cf6464"} />
          <Row k="value pick?" v={isValue ? "sim" : "não"} color={isValue ? "#7cb37b" : "#cf6464"} />
          <Row k="kelly% da banca" v={`${(k * 100).toFixed(2)}%`} />
          <Row k="stake sugerido" v={`R$ ${stake.toFixed(2)}`} color="#f0a570" />

          <div className="mt-3 pt-3 border-t border-[#272b34]">
            <button
              type="button"
              onClick={simulate}
              className="text-[11.5px] px-3 py-1.5 rounded-sm border border-[#272b34] bg-[#0a0b0e] text-[#e6e3dc] hover:border-[#e36b3a] hover:text-[#e36b3a]"
            >
              ▸ simular 500 apostas
            </button>
            {trial && (
              <div className="mt-2 space-y-0.5">
                <Row k="banca final" v={`R$ ${trial.bank.toFixed(2)}`} color={trial.bank > bank ? "#7cb37b" : "#cf6464"} />
                <Row k="vitórias" v={String(trial.wins)} />
                <Row k="derrotas" v={String(trial.losses)} />
                <Row
                  k="ROI"
                  v={`${(((trial.bank - bank) / bank) * 100).toFixed(2)}%`}
                  color={trial.bank > bank ? "#7cb37b" : "#cf6464"}
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (n: number) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[11.5px]">
        <span className="text-[#9ea2ab]">{label}</span>
        <span className="text-[#e6e3dc]">{display}</span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#e36b3a]"
      />
    </div>
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
    <div className="bg-[#0a0b0e] border border-[#272b34] rounded p-3 space-y-2">
      <div className="text-[10px] uppercase tracking-[1.2px] text-[#6c7079]">
        {title}
      </div>
      {children}
    </div>
  );
}
