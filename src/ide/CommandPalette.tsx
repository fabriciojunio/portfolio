import { useEffect, useMemo, useRef, useState } from "react";
import { useIDE } from "../state/useIDE";
import { ALL_FILES } from "../vfs";
import { FileIcon } from "./icons";
import type { CommandDescriptor } from "../types";

export default function CommandPalette() {
  const ide = useIDE();
  const open = ide.paletteOpen;
  const [query, setQuery] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<CommandDescriptor[]>(() => {
    const cmds: CommandDescriptor[] = [
      {
        id: "terminal.toggle",
        label: "Terminal: alternar visibilidade",
        shortcut: "Ctrl/⌘ + `",
        group: "Sistema",
        run: () => ide.toggleTerminal(),
      },
      {
        id: "file.quickOpen",
        label: "Arquivo: abrir rápido...",
        shortcut: "Ctrl/⌘ + P",
        group: "Arquivo",
        run: () => {
          ide.setPalette(false);
          ide.setQuickOpen(true);
        },
      },
      {
        id: "run.toggle",
        label: "Run: abrir/fechar painel",
        group: "Sistema",
        run: () => ide.setRunPanel(!ide.runPanelOpen),
      },
    ];

    for (const f of ALL_FILES) {
      const isProject = !!f.meta;
      cmds.push({
        id: `open:${f.path}`,
        label: `Abrir: ${f.path}`,
        hint: isProject ? f.meta!.project : undefined,
        group: isProject ? "Projeto" : "Arquivo",
        run: () => ide.open(f.path),
      });
    }

    cmds.push(
      {
        id: "external.github",
        label: "Abrir: GitHub (perfil)",
        group: "Navegar",
        run: () =>
          window.open("https://github.com/fabriciojunio", "_blank", "noopener,noreferrer"),
      },
      {
        id: "external.linkedin",
        label: "Abrir: LinkedIn",
        group: "Navegar",
        run: () =>
          window.open(
            "https://linkedin.com/in/fabr%C3%ADcioj%C3%BAnio",
            "_blank",
            "noopener,noreferrer",
          ),
      },
      {
        id: "external.email",
        label: "Enviar e-mail",
        group: "Navegar",
        run: () => (window.location.href = "mailto:fabriciojadias@gmail.com"),
      },
    );

    return cmds;
  }, [ide]);

  const filtered = useMemo(() => fuzzy(commands, query), [commands, query]);

  useEffect(() => {
    setIdx(0);
  }, [query, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else setQuery("");
  }, [open]);

  if (!open) return null;

  const choose = (cmd: CommandDescriptor) => {
    ide.setPalette(false);
    cmd.run();
  };

  return (
    <Backdrop onClose={() => ide.setPalette(false)}>
      <div
        role="dialog"
        aria-label="Paleta de comandos"
        className="w-[640px] max-w-[92vw] bg-[#13151a] border border-[#272b34] rounded-lg shadow-2xl overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-3 py-2.5 border-b border-[#1f222a]">
          <span className="text-[#6c7079] mr-2">⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") ide.setPalette(false);
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setIdx((i) => Math.min(filtered.length - 1, i + 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setIdx((i) => Math.max(0, i - 1));
              }
              if (e.key === "Enter" && filtered[idx]) {
                e.preventDefault();
                choose(filtered[idx]);
              }
            }}
            placeholder="digite um comando ou arquivo..."
            className="flex-1 bg-transparent outline-none text-[#e6e3dc] text-[13px] placeholder:text-[#6c7079]"
            aria-label="Buscar comando"
          />
          <span className="text-[10px] text-[#6c7079] ml-2">esc</span>
        </div>
        <ul
          role="listbox"
          className="max-h-[60vh] overflow-y-auto py-1 m-0 p-0 list-none"
        >
          {filtered.length === 0 && (
            <li className="px-4 py-3 text-[12px] text-[#6c7079]">
              nada encontrado pra "{query}"
            </li>
          )}
          {filtered.slice(0, 60).map((cmd, i) => {
            const active = i === idx;
            return (
              <li
                key={cmd.id}
                role="option"
                aria-selected={active}
                className={`px-3 py-1.5 cursor-pointer flex items-center justify-between text-[12.5px] ${active ? "bg-[#1f222a] text-[#e6e3dc]" : "text-[#c9c5ba]"}`}
                onMouseEnter={() => setIdx(i)}
                onClick={() => choose(cmd)}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className="text-[10px] uppercase tracking-[1px] text-[#6c7079] w-[68px]">
                    {cmd.group}
                  </span>
                  <span className="truncate">{cmd.label}</span>
                  {cmd.hint && (
                    <span className="text-[#6c7079] text-[11px] ml-1 truncate">
                      — {cmd.hint}
                    </span>
                  )}
                </span>
                {cmd.shortcut && (
                  <span className="text-[10.5px] text-[#6c7079] ml-3 shrink-0">
                    {cmd.shortcut}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Backdrop>
  );
}

export function QuickOpen() {
  const ide = useIDE();
  const open = ide.quickOpen;
  const [query, setQuery] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo(() => {
    if (!query.trim()) return ALL_FILES;
    return fuzzyFiles(ALL_FILES, query);
  }, [query]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else {
      setQuery("");
      setIdx(0);
    }
  }, [open]);

  useEffect(() => {
    setIdx(0);
  }, [query]);

  if (!open) return null;

  const choose = (path: string) => {
    ide.setQuickOpen(false);
    ide.open(path);
  };

  return (
    <Backdrop onClose={() => ide.setQuickOpen(false)}>
      <div
        role="dialog"
        aria-label="Abrir arquivo rápido"
        className="w-[560px] max-w-[92vw] bg-[#13151a] border border-[#272b34] rounded-lg shadow-2xl overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-3 py-2.5 border-b border-[#1f222a]">
          <span className="text-[#6c7079] mr-2">→</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") ide.setQuickOpen(false);
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setIdx((i) => Math.min(items.length - 1, i + 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setIdx((i) => Math.max(0, i - 1));
              }
              if (e.key === "Enter" && items[idx]) {
                e.preventDefault();
                choose(items[idx].path);
              }
            }}
            placeholder="digite parte do nome do arquivo..."
            className="flex-1 bg-transparent outline-none text-[#e6e3dc] text-[13px] placeholder:text-[#6c7079]"
            aria-label="Buscar arquivo"
          />
          <span className="text-[10px] text-[#6c7079] ml-2">esc</span>
        </div>
        <ul
          role="listbox"
          className="max-h-[60vh] overflow-y-auto py-1 m-0 p-0 list-none"
        >
          {items.slice(0, 30).map((f, i) => {
            const active = i === idx;
            return (
              <li
                key={f.path}
                role="option"
                aria-selected={active}
                className={`px-3 py-1.5 cursor-pointer flex items-center gap-2 text-[12.5px] ${active ? "bg-[#1f222a] text-[#e6e3dc]" : "text-[#c9c5ba]"}`}
                onMouseEnter={() => setIdx(i)}
                onClick={() => choose(f.path)}
              >
                <FileIcon language={f.language} size={12} />
                <span className="truncate">{f.name}</span>
                <span className="text-[#6c7079] text-[11px] ml-auto truncate">
                  {f.path}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Backdrop>
  );
}

function Backdrop({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/55 backdrop-blur-[2px] z-50 flex items-start justify-center pt-[12vh] animate-[fadeIn_0.12s_ease-out]"
      onClick={onClose}
      role="presentation"
    >
      {children}
    </div>
  );
}

function fuzzy<T extends { label: string; hint?: string; id: string }>(
  list: T[],
  q: string,
): T[] {
  const query = q.trim().toLowerCase();
  if (!query) return list;
  return list
    .map((item) => {
      const hay = (item.label + " " + (item.hint ?? "") + " " + item.id).toLowerCase();
      return { item, score: scoreFuzzy(hay, query) };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);
}

function fuzzyFiles<T extends { path: string; name: string }>(
  list: T[],
  q: string,
): T[] {
  const query = q.trim().toLowerCase();
  if (!query) return list;
  return list
    .map((item) => {
      const hay = (item.name + " " + item.path).toLowerCase();
      return { item, score: scoreFuzzy(hay, query) };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);
}

function scoreFuzzy(hay: string, needle: string): number {
  // matching simples: cada letra do needle precisa aparecer
  // em ordem; matches consecutivos somam mais.
  let score = 0;
  let hi = 0;
  let consecutive = 0;
  for (let i = 0; i < needle.length; i++) {
    const ch = needle[i];
    const found = hay.indexOf(ch, hi);
    if (found < 0) return 0;
    if (found === hi) {
      consecutive++;
      score += 3 + consecutive;
    } else {
      consecutive = 0;
      score += 1;
    }
    hi = found + 1;
  }
  if (hay.startsWith(needle)) score += 8;
  return score;
}
