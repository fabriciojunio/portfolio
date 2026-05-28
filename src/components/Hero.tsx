import { FiGithub, FiArrowDown } from "react-icons/fi";
import { useCountUp } from "../hooks/useCountUp";
import { useTypingEffect } from "../hooks/useTypingEffect";

interface MetricProps {
  end: number;
  suffix?: string;
  label: string;
  color: string;
}

function MetricCard({ end, suffix = "", label, color }: MetricProps) {
  const { ref, display } = useCountUp({ end, suffix, duration: 2000 });
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="font-mono font-bold text-[22px] md:text-[28px]"
        style={{ color }}
      >
        {display}
      </div>
      <div className="text-[10px] uppercase tracking-[0.5px] text-text-muted mt-1">
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const { display: typed, isComplete } = useTypingEffect(
    "Desenvolvo sistemas FullStack e aplico IA para resolver problemas reais.",
    35
  );

  const scrollTo = (id: string) => () => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 56;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-3xl w-full">
        <p className="font-mono text-[11px] uppercase tracking-[1px] text-accent-green mb-4">
          // FULLSTACK DEVELOPER &amp; AI ENGINEER
        </p>

        <h1 className="text-[32px] md:text-[48px] font-bold leading-tight text-text-primary">
          Fabrício <span className="text-accent-green">Júnio</span>
        </h1>

        <p className="mt-4 text-sm md:text-[14px] text-text-secondary font-mono min-h-[2.5em]">
          {typed}
          <span
            className={`inline-block w-[2px] h-[14px] bg-accent-green ml-[2px] align-middle ${
              isComplete ? "animate-blink" : ""
            }`}
          />
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricCard end={12} label="projetos reais" color="#4ade80" />
          <MetricCard end={60} suffix="K+" label="linhas de código" color="#818cf8" />
          <MetricCard end={300} suffix="+" label="testes" color="#f59e0b" />
          <MetricCard end={6} label="linguagens" color="#06b6d4" />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={scrollTo("projetos")}
            className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
          >
            Ver projetos <FiArrowDown size={14} />
          </button>
          <a
            href="https://github.com/fabriciojunio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent-green hover:brightness-110 text-bg rounded-lg px-5 py-2.5 text-sm font-semibold transition"
          >
            <FiGithub size={14} /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
