import { useEffect, useState } from "react";
import { useIDE } from "../state/useIDE";
import { filesByPath, ALL_FILES } from "../vfs";
import { GitBranchIcon } from "./icons";
import { LANG_LABEL } from "./icons";

const TOTAL_FILES = ALL_FILES.length;

export default function StatusBar() {
  const { activePath, toggleTerminal, terminalOpen, setPalette } = useIDE();
  const [now, setNow] = useState<string>(() => fmtClock());

  useEffect(() => {
    const t = setInterval(() => setNow(fmtClock()), 1000);
    return () => clearInterval(t);
  }, []);

  const file = activePath ? filesByPath.get(activePath) : null;
  const lines = file ? file.content.split("\n").length : 0;
  const chars = file ? file.content.length : 0;

  return (
    <footer
      role="status"
      className="h-6 bg-[#13151a] border-t border-[#1f222a] text-[#9ea2ab] font-mono text-[11px] flex items-stretch select-none"
    >
      <span className="flex items-center gap-1.5 px-3 text-[#e36b3a]">
        <GitBranchIcon size={11} />
        main
      </span>
      <span className="flex items-center px-3 border-l border-[#1f222a]">
        14 projetos · {TOTAL_FILES} arquivos
      </span>
      <button
        type="button"
        onClick={toggleTerminal}
        className={`px-3 border-l border-[#1f222a] hover:text-[#e6e3dc] ${terminalOpen ? "text-[#e6e3dc]" : ""}`}
        aria-pressed={terminalOpen}
      >
        terminal {terminalOpen ? "▾" : "▴"}
      </button>
      <button
        type="button"
        onClick={() => setPalette(true)}
        className="px-3 border-l border-[#1f222a] hover:text-[#e6e3dc]"
      >
        ⌘K  paleta
      </button>

      <span className="flex-1" />

      {file && (
        <>
          <span className="flex items-center px-3 border-l border-[#1f222a]">
            {lines} linhas · {chars} chars
          </span>
          <span className="flex items-center px-3 border-l border-[#1f222a]">
            UTF-8
          </span>
          <span className="flex items-center px-3 border-l border-[#1f222a]">
            LF
          </span>
          <span className="flex items-center px-3 border-l border-[#1f222a] text-[#e36b3a]">
            {LANG_LABEL[file.language]}
          </span>
        </>
      )}
      <span className="flex items-center px-3 border-l border-[#1f222a]">
        {now}
      </span>
    </footer>
  );
}

function fmtClock(): string {
  const d = new Date();
  return d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

