import type { Language } from "../types";

// Ícones minimalistas em SVG. Não usamos lib de ícone pra
// não inflar bundle e pra ter identidade própria.

interface Props {
  size?: number;
  className?: string;
}

export function FolderIcon({ size = 14, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
      <path
        d="M1.5 3.5h4l1.2 1.5H14.5v8h-13z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FolderOpenIcon({ size = 14, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
      <path
        d="M1.5 3.5h4l1.2 1.5H14.5v2H1.5z M2.5 13.5l1.5-6h12l-1.5 6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronIcon({ size = 10, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" className={className}>
      <path d="M3 2l4 3-4 3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ size = 12, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" className={className}>
      <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function TerminalIcon({ size = 13, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
      <rect x="1.5" y="2.5" width="13" height="11" rx="1" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4 6l2 2-2 2M8 10h4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlayIcon({ size = 13, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
      <path d="M4 3l9 5-9 5z" fill="currentColor" />
    </svg>
  );
}

export function SearchIcon({ size = 14, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
      <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function GitBranchIcon({ size = 12, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" className={className}>
      <circle cx="3" cy="2.5" r="1.1" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="3" cy="9.5" r="1.1" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="9" cy="6" r="1.1" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M3 3.5v5M3 6h2.5a1.5 1.5 0 0 0 1.5-1.5V4.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function FileIcon({ language, size = 14, className }: Props & { language: Language }) {
  const color = LANG_COLOR[language] ?? "#9ea2ab";
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
      <path
        d="M3.5 1.5h6l3 3V14.5h-9z M9.5 1.5v3h3"
        fill="none"
        stroke={color}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const LANG_COLOR: Record<Language, string> = {
  typescript: "#6a93c4",
  javascript: "#d4a247",
  python:     "#7cb37b",
  java:       "#cf6464",
  php:        "#9b7fcb",
  json:       "#d4a247",
  markdown:   "#9ea2ab",
  yaml:       "#b48cd4",
  shell:      "#7cb37b",
  sql:        "#f0a570",
  plaintext:  "#9ea2ab",
};

export const LANG_LABEL: Record<Language, string> = {
  typescript: "TypeScript",
  javascript: "JavaScript",
  python:     "Python",
  java:       "Java",
  php:        "PHP",
  json:       "JSON",
  markdown:   "Markdown",
  yaml:       "YAML",
  shell:      "Shell",
  sql:        "SQL",
  plaintext:  "Plain Text",
};
