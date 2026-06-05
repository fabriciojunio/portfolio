import type { Language } from "../types";

// Cor e rótulo por linguagem. Ficam fora de icons.tsx para que aquele
// arquivo exporte só componentes (regra do Fast Refresh / react-refresh).

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
