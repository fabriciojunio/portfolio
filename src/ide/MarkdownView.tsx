import { useMemo, type ReactNode } from "react";

interface Props {
  source: string;
}

// Renderizador leve de Markdown — sem dep externa.
// Suporta H1-H3, parágrafos, listas, ênfase, links,
// código inline e blocos de código com fence ```.

export default function MarkdownView({ source }: Props) {
  const blocks = useMemo(() => parseBlocks(source), [source]);

  return (
    <article className="prose-narrow font-sans text-[#c4c4c4] text-[14px] leading-[1.65] px-8 md:px-14 py-8 max-w-[760px] mx-auto w-full">
      {blocks.map((b, i) => renderBlock(b, i))}
    </article>
  );
}

type Block =
  | { kind: "h1"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "blockquote"; text: string }
  | { kind: "code"; lang: string; code: string }
  | { kind: "hr" };

function parseBlocks(src: string): Block[] {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(lines[i]);
        i++;
      }
      blocks.push({ kind: "code", lang, code: buf.join("\n") });
      i++;
      continue;
    }

    if (/^---+\s*$/.test(line)) {
      blocks.push({ kind: "hr" });
      i++;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push({ kind: "h1", text: line.slice(2).trim() });
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ kind: "h2", text: line.slice(3).trim() });
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ kind: "h3", text: line.slice(4).trim() });
      i++;
      continue;
    }

    if (line.startsWith("> ")) {
      const buf: string[] = [line.slice(2)];
      i++;
      while (i < lines.length && lines[i].startsWith("> ")) {
        buf.push(lines[i].slice(2));
        i++;
      }
      blocks.push({ kind: "blockquote", text: buf.join(" ") });
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push({ kind: "ul", items });
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    const buf: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith(">") &&
      !lines[i].startsWith("```") &&
      !/^[-*]\s+/.test(lines[i])
    ) {
      buf.push(lines[i]);
      i++;
    }
    blocks.push({ kind: "p", text: buf.join(" ") });
  }
  return blocks;
}

function renderBlock(b: Block, key: number) {
  switch (b.kind) {
    case "h1":
      return (
        <h1 key={key} className="text-[28px] text-[#ededed] font-semibold mt-2 mb-4 leading-tight">
          {b.text}
        </h1>
      );
    case "h2":
      return (
        <h2 key={key} className="text-[18px] text-[#ededed] font-semibold mt-7 mb-2 leading-snug">
          {b.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={key} className="text-[15px] text-[#ededed] font-medium mt-5 mb-2">
          {b.text}
        </h3>
      );
    case "p":
      return (
        <p key={key} className="my-3">
          {renderInline(b.text)}
        </p>
      );
    case "ul":
      return (
        <ul key={key} className="my-3 pl-5 list-none space-y-1.5">
          {b.items.map((it, j) => (
            <li key={j} className="relative">
              <span className="absolute -left-4 top-[9px] w-1 h-1 rounded-full bg-[#ffffff]" />
              {renderInline(it)}
            </li>
          ))}
        </ul>
      );
    case "blockquote":
      return (
        <blockquote
          key={key}
          className="border-l-2 border-[#ffffff] pl-4 my-4 text-[#9a9a9a] italic"
        >
          {renderInline(b.text)}
        </blockquote>
      );
    case "code":
      return (
        <pre
          key={key}
          className="my-4 bg-[#0c0c0c] border border-[#262626] rounded p-3 overflow-x-auto"
        >
          <code className="font-mono text-[12.5px] text-[#c4c4c4] whitespace-pre">
            {b.code}
          </code>
        </pre>
      );
    case "hr":
      return <hr key={key} className="my-6 border-[#1c1c1c]" />;
  }
}

function renderInline(text: string) {
  // Ordem: code > bold > italic > links
  // Implementação por tokens simples — não cobre markdown completo
  // mas é suficiente pra o que escrevemos aqui.
  const out: ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < text.length) {
    // código inline `...`
    if (text[i] === "`") {
      const end = text.indexOf("`", i + 1);
      if (end > i) {
        out.push(
          <code
            key={key++}
            className="font-mono text-[12.5px] px-1 py-[1px] rounded bg-[#151515] border border-[#1c1c1c] text-[#d4d4d4]"
          >
            {text.slice(i + 1, end)}
          </code>,
        );
        i = end + 1;
        continue;
      }
    }
    // negrito **...**
    if (text.slice(i, i + 2) === "**") {
      const end = text.indexOf("**", i + 2);
      if (end > i) {
        out.push(
          <strong key={key++} className="text-[#ededed] font-medium">
            {text.slice(i + 2, end)}
          </strong>,
        );
        i = end + 2;
        continue;
      }
    }
    // link [texto](url)
    const linkMatch = text.slice(i).match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      out.push(
        <a
          key={key++}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#ffffff] underline-offset-2 hover:underline"
        >
          {linkMatch[1]}
        </a>,
      );
      i += linkMatch[0].length;
      continue;
    }
    // texto normal — bufferiza até próximo marcador
    let j = i;
    while (
      j < text.length &&
      text[j] !== "`" &&
      text.slice(j, j + 2) !== "**" &&
      text[j] !== "["
    ) {
      j++;
    }
    // Se nada avançou (marcador sem fechamento, ex.: "`" ou "**" soltos),
    // consome um caractere como texto literal para garantir progresso e
    // nunca travar em loop infinito.
    if (j === i) j = i + 1;
    out.push(text.slice(i, j));
    i = j;
  }
  return out;
}
