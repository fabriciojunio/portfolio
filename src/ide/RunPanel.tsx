import { Suspense, lazy, useEffect, useState } from "react";
import { useIDE } from "../state/useIDE";
import { CloseIcon } from "./icons";

const XgDemo = lazy(() => import("../demos/XgDemo"));
const KellyDemo = lazy(() => import("../demos/KellyDemo"));
const ZodDemo = lazy(() => import("../demos/ZodDemo"));
const VagasDemo = lazy(() => import("../demos/VagasDemo"));

const DEMO_TITLES = {
  xg:           "GolData / Expected Goals (xG)",
  kelly:        "GolData Pro / Kelly + Value Bets",
  elo:          "GolData / Elo simplificado",
  zod:          "Apontamento de Horas / Validação Zod",
  "vagas-score": "JIS / Motor de Score de Vagas",
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

  if (!runPanelOpen) return null;

  const kind = activeFile?.runnable;
  const title = kind ? DEMO_TITLES[kind] : "Run";

  return (
    <section
      role="complementary"
      aria-label="Painel de execução"
      className="absolute inset-0 z-20 md:static md:z-auto md:w-[44%] md:min-w-[380px] md:max-w-[640px] bg-[#0e0f12] border-t md:border-t-0 md:border-l border-[#1f222a] flex flex-col"
    >
      <header className="h-9 flex items-center justify-between px-3 border-b border-[#1f222a] bg-[#0a0b0e]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#e36b3a] animate-pulse" />
          <span className="text-[11px] uppercase tracking-[1.2px] text-[#6c7079]">
            run
          </span>
          <span className="text-[12px] text-[#e6e3dc]">{title}</span>
        </div>
        <button
          type="button"
          onClick={() => setRunPanel(false)}
          className="text-[#6c7079] hover:text-[#e6e3dc] p-1"
          aria-label="Fechar painel run"
        >
          <CloseIcon size={11} />
        </button>
      </header>

      <div className="border-b border-[#1f222a] bg-[#0a0b0e] px-3 py-2 text-[11.5px] font-mono text-[#6c7079] max-h-[112px] overflow-y-auto">
        {logs.map((l, i) => (
          <div key={i} className={l.startsWith("▶") ? "text-[#e36b3a]" : ""}>
            {l}
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {!kind && (
          <p className="text-[12px] text-[#6c7079] font-mono">
            abra um arquivo runnable e clique em <strong>Run</strong>.
          </p>
        )}
        <Suspense
          fallback={
            <div className="text-[12px] text-[#6c7079] font-mono">
              carregando demo...
            </div>
          }
        >
          {kind === "xg" && <XgDemo />}
          {kind === "kelly" && <KellyDemo />}
          {kind === "zod" && <ZodDemo />}
          {kind === "vagas-score" && <VagasDemo />}
        </Suspense>
      </div>
    </section>
  );
}
