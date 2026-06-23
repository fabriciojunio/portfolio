import { useMemo } from "react";

interface Props {
  code: string;
  language: "python" | "typescript" | "java" | "php" | "csharp";
  filename: string;
}

const KEYWORDS: Record<Props["language"], string[]> = {
  python: ["def", "return", "if", "for", "in", "lambda", "from", "import", "True", "False", "None", "elif", "else", "self", "is", "not", "and", "or", "class", "with", "as", "try", "except", "raise"],
  typescript: ["const", "let", "var", "function", "return", "if", "for", "in", "of", "async", "await", "import", "from", "export", "default", "type", "interface", "class", "new", "throw", "as", "extends", "implements", "public", "private", "true", "false", "null", "undefined", "this", "while", "switch", "case", "break"],
  java: ["public", "private", "protected", "static", "final", "class", "interface", "extends", "implements", "return", "if", "for", "while", "new", "throw", "true", "false", "null", "void", "int", "double", "float", "List", "String", "Map", "this", "super", "try", "catch"],
  php: ["public", "private", "function", "return", "if", "use", "namespace", "new", "static", "fn", "match", "true", "false", "null", "class", "abstract", "extends", "implements"],
  csharp: ["public", "private", "protected", "static", "class", "void", "return", "if", "for", "while", "new", "using", "namespace", "var", "true", "false", "null", "this", "override", "float", "int", "bool", "string", "get", "set"],
};

interface Token { text: string; cls: string }

function tokenizeLine(line: string, lang: Props["language"]): Token[] {
  const kws = new Set(KEYWORDS[lang]);
  const commentStart = lang === "python" ? "#" : "//";
  const ci = line.indexOf(commentStart);
  const codePart = ci >= 0 ? line.slice(0, ci) : line;
  const commentPart = ci >= 0 ? line.slice(ci) : "";

  const tokens: Token[] = [];
  const re = /("[^"]*"|'[^']*'|`[^`]*`|[a-zA-Z_$][a-zA-Z0-9_$]*|\d+(?:\.\d+)?|\s+|.)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(codePart)) !== null) {
    const t = m[0];
    if (/^\s+$/.test(t)) tokens.push({ text: t, cls: "" });
    else if (/^["'`]/.test(t)) tokens.push({ text: t, cls: "s" });
    else if (/^\d/.test(t)) tokens.push({ text: t, cls: "n" });
    else if (kws.has(t)) tokens.push({ text: t, cls: "k" });
    else if (/^[A-Z]/.test(t) && /^[A-Z][a-zA-Z0-9_]*$/.test(t)) tokens.push({ text: t, cls: "t" });
    else tokens.push({ text: t, cls: "" });
  }
  if (commentPart) tokens.push({ text: commentPart, cls: "c" });
  return tokens;
}

export default function SnippetView({ code, language, filename }: Props) {
  const lines = useMemo(() => code.split("\n"), [code]);

  return (
    <div className="bg-[#111111] border border-white/10 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-black/30">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4a76a]/70" />
          <span className="font-mono text-[11px] text-[#9b958a]">{filename}</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[1.4px] text-[#6f6a60]">
          {language}
        </span>
      </div>
      <pre className="px-4 md:px-5 py-4 overflow-x-auto">
        <code className="font-mono text-[12.5px] leading-[1.65] text-[#cfc8b9] whitespace-pre">
          {lines.map((line, li) => {
            const tokens = tokenizeLine(line, language);
            return (
              <div key={li} className="table-row">
                <span className="select-none pr-4 text-[#3a3a3a] text-right table-cell w-6 tabular-nums">
                  {li + 1}
                </span>
                <span className="table-cell">
                  {tokens.length === 0 ? <span>&nbsp;</span> : tokens.map((tk, i) => (
                    tk.cls ? <span key={i} className={`syn-${tk.cls}`}>{tk.text}</span> : <span key={i}>{tk.text}</span>
                  ))}
                </span>
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
