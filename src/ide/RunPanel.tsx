import { Suspense, lazy, useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { useIDE } from "../state/useIDE";
import { CloseIcon } from "./icons";

const XgDemo = lazy(() => import("../demos/XgDemo"));
const KellyDemo = lazy(() => import("../demos/KellyDemo"));
const ZodDemo = lazy(() => import("../demos/ZodDemo"));
const VagasDemo = lazy(() => import("../demos/VagasDemo"));
const ContafluxDemo = lazy(() => import("../demos/ContafluxDemo"));
const CardiocamDemo = lazy(() => import("../demos/CardiocamDemo"));
const KaidaDemo = lazy(() => import("../demos/KaidaDemo"));
const BicudoDemo = lazy(() => import("../demos/BicudoDemo"));
const PermaneiaDemo = lazy(() => import("../demos/PermaneiaDemo"));

const DEMO_TITLES = {
  xg:           "GolData / Expected Goals (xG)",
  kelly:        "GolData Pro / Kelly + Value Bets",
  elo:          "GolData / Elo simplificado",
  zod:          "Apontamento de Horas / Validação Zod",
  "vagas-score": "JIS / Motor de Score de Vagas",
  "contagem-de-linha": "Contaflux / Contagem por cruzamento de linha",
  rppg:         "Cardiocam / GREEN e POS lado a lado",
  pulo:         "Kaida / Coyote time e buffer de pulo",
  impulso:      "Bicudo / O impulso troca a velocidade, não soma",
  "fuzzy-evasao": "PermaneIA / Risco de evasão por lógica fuzzy",
} as const;

export default function RunPanel() {
  const { runPanelOpen, setRunPanel, activeFile } = useIDE();
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!runPanelOpen) {
      setLogs([]);
      return;
    }
    if (!activeFile?.runnable) return;
    const kind = activeFile.runnable;
    const seq = [
      `▶ rodando ${kind} (arquivo: ${activeFile.name})`,
      `  carregando dependências...`,
      `  inicializando demo interativa...`,
      `  pronto em 247ms`,
    ];
    const ts: ReturnType<typeof setTimeout>[] = [];
    seq.forEach((line, i) => {
      ts.push(setTimeout(() => setLogs((prev) => [...prev, line]), i * 220));
    });
    return () => ts.forEach(clearTimeout);
  }, [runPanelOpen, activeFile]);

  const kind = activeFile?.runnable;
  const title = kind ? DEMO_TITLES[kind] : "Run";

  return (
    <AnimatePresence>
    {runPanelOpen && (
    <m.section
      role="complementary"
      aria-label="Painel de execução"
      className="absolute inset-0 z-20 md:static md:z-auto md:w-[44%] md:min-w-[380px] md:max-w-[640px] bg-[#0c0c0c] border-t md:border-t-0 md:border-l border-[#1c1c1c] flex flex-col"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <header className="h-9 flex items-center justify-between px-3 border-b border-[#1c1c1c] bg-[#0c0c0c]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ffffff] animate-pulse" />
          <span className="text-[11px] uppercase tracking-[1.2px] text-[#6b6b6b]">
            run
          </span>
          <span className="text-[12px] text-[#ededed]">{title}</span>
        </div>
        <button
          type="button"
          onClick={() => setRunPanel(false)}
          className="text-[#6b6b6b] hover:text-[#ededed] p-1"
          aria-label="Fechar painel run"
        >
          <CloseIcon size={11} />
        </button>
      </header>

      <div className="border-b border-[#1c1c1c] bg-[#0c0c0c] px-3 py-2 text-[11.5px] font-mono text-[#6b6b6b] max-h-[112px] overflow-y-auto">
        {logs.map((l, i) => (
          <div key={i} className={l.startsWith("▶") ? "text-[#ffffff]" : ""}>
            {l}
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {!kind && (
          <p className="text-[12px] text-[#6b6b6b] font-mono">
            abra um arquivo runnable e clique em <strong>Run</strong>.
          </p>
        )}
        <Suspense
          fallback={
            <div className="text-[12px] text-[#6b6b6b] font-mono">
              carregando demo...
            </div>
          }
        >
          {kind === "xg" && <XgDemo />}
          {kind === "kelly" && <KellyDemo />}
          {kind === "zod" && <ZodDemo />}
          {kind === "vagas-score" && <VagasDemo />}
          {kind === "contagem-de-linha" && <ContafluxDemo />}
          {kind === "rppg" && <CardiocamDemo />}
          {kind === "pulo" && <KaidaDemo />}
          {kind === "impulso" && <BicudoDemo />}
          {kind === "fuzzy-evasao" && <PermaneiaDemo />}
        </Suspense>
      </div>
    </m.section>
    )}
    </AnimatePresence>
  );
}
