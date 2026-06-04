import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "./data";

// Cinco cartas com snippet de projetos reais flutuando em perspectiva
// 3D, com parallax suave seguindo o mouse e idle float continuo.

// Seleção pensada para vagas de engenharia em fintech/banco: JIS
// (Java + Spring Boot) em destaque (z=0, scale maior, centro),
// seguido de mercado financeiro (QuantBot ML), back-end Java
// (CodeReview AI), segurança/autenticação (Enterprise) e Open
// Finance (Paiol Tech).
const PICKED = [
  "jis",
  "quantbot-ml",
  "codereview-ai",
  "enterprise-project",
  "paiol-tech",
];

interface CardConfig {
  x: number;     // posicao horizontal em %
  y: number;     // posicao vertical em %
  rotZ: number;  // rotacao base em graus
  scale: number;
  z: number;     // profundidade
  delay: number; // delay da animacao idle
}

// Primeiro item (KoraCRM) e o destaque: z=0 (frente), maior escala,
// centro do palco. Os outros distribuidos em torno em profundidades
// variadas.
const LAYOUT: CardConfig[] = [
  { x: 26,  y:  2, rotZ:  -4, scale: 1.08, z:    0, delay: 0   },
  { x:  2,  y: 18, rotZ: -14, scale: 0.94, z: -110, delay: 1.0 },
  { x: 58,  y: 14, rotZ:  14, scale: 0.92, z:  -90, delay: 2.0 },
  { x: 16,  y: 54, rotZ:  10, scale: 0.88, z: -140, delay: 3.0 },
  { x: 46,  y: 58, rotZ:  -8, scale: 0.98, z:  -50, delay: 4.0 },
];

const SYNTAX = {
  python: {
    keywords: ["def", "return", "if", "for", "in", "lambda", "from", "import", "True", "False", "None", "elif", "else", "self", "is", "not"],
  },
  typescript: {
    keywords: ["const", "let", "var", "function", "return", "if", "for", "in", "of", "async", "await", "import", "from", "export", "default", "type", "interface", "class", "new", "throw", "as", "extends", "implements", "public", "private", "true", "false", "null", "undefined"],
  },
  java: {
    keywords: ["public", "private", "protected", "static", "final", "class", "interface", "extends", "implements", "return", "if", "for", "while", "new", "throw", "true", "false", "null", "void", "int", "double", "float", "List", "String", "Map"],
  },
  php: {
    keywords: ["public", "private", "function", "return", "if", "use", "namespace", "new", "static", "fn", "match", "true", "false", "null"],
  },
};

function highlight(code: string, lang: keyof typeof SYNTAX) {
  // Tokenizer simples — suficiente para os snippets curtos das cartas.
  const kws = new Set(SYNTAX[lang].keywords);
  const lines = code.split("\n");
  return lines.map((line, li) => {
    const tokens: { text: string; cls: string }[] = [];
    // comentarios de linha
    const commentIdx = lang === "python"
      ? line.indexOf("#")
      : line.indexOf("//");
    const codePart = commentIdx >= 0 ? line.slice(0, commentIdx) : line;
    const commentPart = commentIdx >= 0 ? line.slice(commentIdx) : "";

    const re = /([a-zA-Z_$][a-zA-Z0-9_$]*|"[^"]*"|'[^']*'|\d+(?:\.\d+)?|\s+|.)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(codePart)) !== null) {
      const t = m[0];
      if (/^\s+$/.test(t)) tokens.push({ text: t, cls: "" });
      else if (/^["']/.test(t)) tokens.push({ text: t, cls: "s" });
      else if (/^\d/.test(t)) tokens.push({ text: t, cls: "n" });
      else if (kws.has(t)) tokens.push({ text: t, cls: "k" });
      else tokens.push({ text: t, cls: "" });
    }
    if (commentPart) tokens.push({ text: commentPart, cls: "c" });

    return (
      <div key={li}>
        {tokens.map((tk, i) =>
          tk.cls ? (
            <span key={i} className={`syn-${tk.cls}`}>{tk.text}</span>
          ) : (
            <span key={i}>{tk.text}</span>
          ),
        )}
        {tokens.length === 0 ? <span>&nbsp;</span> : null}
      </div>
    );
  });
}

export default function Cards3D() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = node.getBoundingClientRect();
      const px = (e.clientX - (r.left + r.width / 2)) / r.width;
      const py = (e.clientY - (r.top + r.height / 2)) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // limites suaves
        setTilt({
          x: Math.max(-1, Math.min(1, px)) * 8,
          y: Math.max(-1, Math.min(1, py)) * 6,
        });
      });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    window.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const cards = PICKED.map((slug) => PROJECTS.find((p) => p.slug === slug)).filter(Boolean) as typeof PROJECTS;

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{ perspective: "1400px", perspectiveOrigin: "50% 40%" }}
      aria-hidden
    >
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {cards.map((p, i) => {
          const cfg = LAYOUT[i];
          return (
            <div
              key={p.slug}
              className="absolute w-[300px] md:w-[340px] pointer-events-auto"
              style={{
                left: `${cfg.x}%`,
                top: `${cfg.y}%`,
                transform: `translateZ(${cfg.z}px) rotate(${cfg.rotZ}deg) scale(${cfg.scale})`,
                transformStyle: "preserve-3d",
              }}
            >
              <div
                style={{
                  animation: "cardFloat 9s ease-in-out infinite",
                  animationDelay: `${cfg.delay}s`,
                }}
              >
                <a
                  href="#trabalho"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(`work-${p.slug}`);
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.scrollY - 60;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                  }}
                  className="block rounded-xl bg-[#111111]/95 border border-white/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-sm hover:border-[#d4a76a]/40 transition-colors"
                >
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-black/30">
                    <span className="w-2 h-2 rounded-full bg-[#d4a76a]/70" />
                    <span className="font-mono text-[10.5px] text-[#6f6a60] uppercase tracking-[1.2px]">
                      {p.slug}.{ext(p.snippetLang)}
                    </span>
                  </div>
                  <pre className="px-4 py-3 font-mono text-[11.5px] leading-[1.55] text-[#cfc8b9] whitespace-pre overflow-hidden">
                    {highlight(p.snippet.split("\n").slice(0, 7).join("\n"), p.snippetLang)}
                  </pre>
                  <div className="px-4 py-2.5 border-t border-white/5 flex items-center justify-between">
                    <span className="font-serif text-[14px] text-[#f5f1e8] truncate pr-2">
                      {p.name}
                    </span>
                    <span className="font-mono text-[10px] text-[#6f6a60]">
                      {p.year}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ext(lang: string): string {
  if (lang === "python") return "py";
  if (lang === "java") return "java";
  if (lang === "php") return "php";
  return "ts";
}
