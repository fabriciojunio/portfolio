import type { Language } from "../types";

// Cor e rótulo por linguagem. Ficam fora de icons.tsx para que aquele
// arquivo exporte só componentes (regra do Fast Refresh / react-refresh).

export const LANG_COLOR: Record<Language, string> = {
  typescript: "#9a9a9a",
  javascript: "#b8b8b8",
  python:     "#ededed",
  java:       "#8a8a8a",
  php:        "#c4c4c4",
  csharp:     "#767676",
  json:       "#b8b8b8",
  markdown:   "#9a9a9a",
  yaml:       "#a3a3a3",
  shell:      "#ededed",
  sql:        "#d4d4d4",
  plaintext:  "#9a9a9a",
};

export const LANG_LABEL: Record<Language, string> = {
  typescript: "TypeScript",
  javascript: "JavaScript",
  python:     "Python",
  java:       "Java",
  php:        "PHP",
  csharp:     "C#",
  json:       "JSON",
  markdown:   "Markdown",
  yaml:       "YAML",
  shell:      "Shell",
  sql:        "SQL",
  plaintext:  "Plain Text",
};
