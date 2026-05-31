import { useEffect, useRef, useState } from "react";

const STEPS = [
  { delay: 0,    text: "fabricio-shell v1.0  copyright (c) 2026 Fabrício Júnio",        tone: "dim" },
  { delay: 220,  text: "▸ verificando ambiente...",                                       tone: "muted" },
  { delay: 360,  text: "  node v25.5.0  pnpm 11.8.0  typescript 5.6.3",                   tone: "good" },
  { delay: 520,  text: "▸ inicializando workspace fabricio-junio/portfolio",              tone: "muted" },
  { delay: 700,  text: "  carregando 14 projetos (3.1 MB)",                               tone: "dim" },
  { delay: 860,  text: "  registrando 50+ comandos no shell",                             tone: "dim" },
  { delay: 1020, text: "  montando virtual file system",                                  tone: "dim" },
  { delay: 1180, text: "▸ subindo Monaco Editor",                                         tone: "muted" },
  { delay: 1340, text: "  tema 'fabricio-dark' aplicado",                                 tone: "dim" },
  { delay: 1500, text: "▸ headers de segurança: CSP, HSTS, X-Frame-Options DENY",         tone: "good" },
  { delay: 1700, text: "▸ pronto em 247ms · bem-vindo",                                    tone: "accent" },
];

const TONE = {
  dim:    "#6c7079",
  muted:  "#9ea2ab",
  good:   "#7cb37b",
  accent: "#e36b3a",
} as const;

interface Props {
  onDone: () => void;
}

export default function BootScreen({ onDone }: Props) {
  const [step, setStep] = useState(0);
  const skippedRef = useRef(false);

  useEffect(() => {
    const timers = STEPS.map((s, i) =>
      setTimeout(() => {
        if (skippedRef.current) return;
        setStep(i + 1);
      }, s.delay),
    );
    const done = setTimeout(() => {
      if (!skippedRef.current) onDone();
    }, STEPS[STEPS.length - 1].delay + 600);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [onDone]);

  const skip = () => {
    skippedRef.current = true;
    onDone();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role="status"
      aria-label="Inicializando IDE"
      onClick={skip}
      className="fixed inset-0 z-[60] bg-[#0a0b0e] text-[#e6e3dc] font-mono flex flex-col cursor-pointer"
    >
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl px-6">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-[#e36b3a] text-[22px] leading-none">▮</span>
            <span className="text-[18px]">fabricio-junio</span>
            <span className="text-[12px] text-[#6c7079]">/ portfolio</span>
          </div>
          <div className="text-[13px] leading-[1.7]">
            {STEPS.slice(0, step).map((s, i) => (
              <div key={i} style={{ color: TONE[s.tone as keyof typeof TONE] }}>
                {s.text}
              </div>
            ))}
            {step < STEPS.length && (
              <div className="text-[#6c7079]">
                <span className="inline-block w-2 h-[14px] bg-[#e36b3a] align-middle animate-blink" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="text-center pb-6 text-[11px] text-[#6c7079]">
        clique, enter ou esc para pular
      </div>
    </div>
  );
}
