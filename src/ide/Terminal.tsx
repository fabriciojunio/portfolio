import { useEffect, useMemo, useRef, useState } from "react";
import { useIDE } from "../state/useIDE";
import { runCommand, SUGGESTIONS } from "../commands/registry";
import type { TerminalEntry } from "../types";

const BANNER: TerminalEntry[] = [
  {
    id: 1,
    kind: "system",
    text: "fabricio-shell v1.0 — digite 'ajuda' para começar.",
  },
  {
    id: 2,
    kind: "system",
    text: "tente: ls projetos · cat sobre.md · open projetos/goldata.py · run",
  },
];

export default function Terminal() {
  const ide = useIDE();
  const [history, setHistory] = useState<TerminalEntry[]>(BANNER);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const counter = useRef(BANNER.length + 1);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [history]);

  useEffect(() => {
    if (ide.terminalOpen) {
      inputRef.current?.focus();
    }
  }, [ide.terminalOpen]);

  const submit = (raw: string) => {
    const next: TerminalEntry[] = [
      ...history,
      { id: counter.current++, kind: "input", text: raw },
    ];

    const result = runCommand(raw, {
      open: ide.open,
      setTerminal: ide.setTerminal,
      setPalette: ide.setPalette,
      setRunPanel: ide.setRunPanel,
      setQuickOpen: ide.setQuickOpen,
      getActivePath: () => ide.activePath,
    });

    if (result.lines.length === 1 && result.lines[0] === "__clear__") {
      setHistory([]);
      counter.current = 1;
      setInput("");
      return;
    }

    for (const line of result.lines) {
      next.push({ id: counter.current++, kind: "output", text: line });
    }

    setHistory(next);
    if (raw.trim()) {
      setCmdHistory((h) => [...h, raw]);
      setHistoryIdx(-1);
    }
    setInput("");
    result.effect?.();
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit(input);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx =
        historyIdx === -1
          ? cmdHistory.length - 1
          : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInput(cmdHistory[nextIdx]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const match = SUGGESTIONS.find(
        (s) => s.startsWith(input) && s !== input,
      );
      if (match) setInput(match);
      return;
    }
    if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setHistory([]);
      counter.current = 1;
    }
  };

  const promptPath = useMemo(() => {
    if (!ide.activePath) return "~";
    return ide.activePath.replace(/^\//, "");
  }, [ide.activePath]);

  if (!ide.terminalOpen) return null;

  return (
    <section
      aria-label="Terminal"
      className="h-[34%] min-h-[180px] bg-[#0a0b0e] border-t border-[#1f222a] flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="h-7 flex items-center justify-between px-3 border-b border-[#1f222a] text-[10.5px] uppercase tracking-[1.2px] text-[#6c7079] font-mono">
        <span>terminal</span>
        <button
          type="button"
          onClick={() => ide.setTerminal(false)}
          className="hover:text-[#e6e3dc] px-2"
          title="Fechar terminal"
        >
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 font-mono text-[12.5px] leading-[1.55]">
        {history.map((entry) => (
          <Line key={entry.id} entry={entry} />
        ))}
        <div className="flex items-center text-[#e6e3dc]">
          <Prompt path={promptPath} />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoCapitalize="none"
            autoComplete="off"
            className="flex-1 bg-transparent outline-none border-0 text-[#e6e3dc] caret-[#e36b3a]"
            aria-label="Entrada do terminal"
          />
        </div>
        <div ref={endRef} />
      </div>
    </section>
  );
}

function Prompt({ path }: { path: string }) {
  return (
    <span className="select-none whitespace-pre">
      <span className="text-[#7cb37b]">fabricio</span>
      <span className="text-[#6c7079]">@</span>
      <span className="text-[#6a93c4]">portfolio</span>
      <span className="text-[#6c7079]"> {path} </span>
      <span className="text-[#e36b3a]">$ </span>
    </span>
  );
}

function Line({ entry }: { entry: TerminalEntry }) {
  if (entry.kind === "input") {
    return (
      <div className="flex">
        <Prompt path="~" />
        <span className="text-[#e6e3dc]">{entry.text}</span>
      </div>
    );
  }
  if (entry.kind === "system") {
    return <div className="text-[#6c7079] italic">{entry.text}</div>;
  }
  return (
    <div className="text-[#c9c5ba] whitespace-pre">
      {entry.text || " "}
    </div>
  );
}
