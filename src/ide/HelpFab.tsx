import { useState } from "react";
import { useIDE } from "../state/useIDE";

export default function HelpFab() {
  const ide = useIDE();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        aria-label="Como usar este portfolio"
        title="Ajuda"
        className="fixed bottom-12 right-4 z-30 w-9 h-9 rounded-full bg-[#e36b3a] text-[#0a0b0e] text-[14px] font-bold shadow-lg hover:brightness-110 flex items-center justify-center font-mono"
      >
        ?
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-4 z-30 w-[300px] bg-[#13151a] border border-[#272b34] rounded-lg shadow-2xl p-4 font-mono text-[12px] text-[#c9c5ba] animate-[fadeIn_0.15s_ease-out]"
          role="dialog"
          aria-label="Ajuda rápida"
        >
          <div className="text-[10px] uppercase tracking-[1.2px] text-[#6c7079] mb-2">
            como navegar
          </div>
          <ul className="space-y-1.5 mb-3">
            <li>
              <span className="text-[#e36b3a]">›</span> clique nos arquivos da{" "}
              <strong>sidebar</strong> à esquerda
            </li>
            <li>
              <span className="text-[#e36b3a]">›</span> use o{" "}
              <strong>terminal</strong> embaixo: digite{" "}
              <span className="text-[#f0a570]">ajuda</span>
            </li>
            <li>
              <span className="text-[#e36b3a]">›</span> nos projetos com botão{" "}
              <strong>Run</strong>, clique pra ver demo
            </li>
          </ul>

          <div className="grid grid-cols-2 gap-2">
            <Btn
              onClick={() => {
                setOpen(false);
                ide.open("/sobre.md");
              }}
            >
              sobre.md
            </Btn>
            <Btn
              onClick={() => {
                setOpen(false);
                ide.open("/projetos/goldata.py");
                setTimeout(() => ide.setRunPanel(true), 150);
              }}
            >
              ver demo xG
            </Btn>
            <Btn
              onClick={() => {
                setOpen(false);
                ide.setPalette(true);
              }}
            >
              paleta ⌘K
            </Btn>
            <Btn
              onClick={() => {
                setOpen(false);
                ide.open("/contato.ts");
              }}
            >
              contato
            </Btn>
          </div>
        </div>
      )}
    </>
  );
}

function Btn({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[11.5px] px-2.5 py-1.5 rounded-sm bg-[#0a0b0e] border border-[#272b34] text-[#9ea2ab] hover:text-[#e6e3dc] hover:border-[#e36b3a]"
    >
      {children}
    </button>
  );
}
