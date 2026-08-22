import type { Monaco } from "@monaco-editor/react";

// Paleta monocromática. Um cinza só, do preto ao branco, sem viés quente nem
// frio: viés de matiz é o que faz um monocromático parecer "quase colorido".
//
// Tirar a cor não pode custar a leitura do código, então a diferença que a cor
// fazia passa a ser feita por brilho e por estilo. A hierarquia é uma escolha,
// e não o resultado de sortear cinzas: o controle de fluxo é o mais claro da
// tela, o comentário é o mais apagado, e o corpo do código fica no meio. O
// olho procura primeiro onde o código decide, e não onde ele guarda dados.

export const PALETTE = {
  bg:           "#0c0c0c",
  panel:        "#151515",
  panelAlt:     "#191919",
  line:         "#1c1c1c",
  lineStrong:   "#262626",
  text:         "#ededed",
  textMuted:    "#9a9a9a",
  textDim:      "#6b6b6b",
  accent:       "#ffffff",
  accentSoft:   "#d4d4d4",
  good:         "#ededed",
  warn:         "#b8b8b8",
  info:         "#9a9a9a",
  bad:          "#8a8a8a",
  selection:    "#2e2e2e",
} as const;

// A rampa de sintaxe, do mais apagado ao mais claro. Está em ordem de
// propósito para poder ser lida como escala: se um dia entrar um token novo,
// ele escolhe o degrau, e não uma cor.
const HL = {
  comment:    "5c5c5c", // sai da frente
  punctuation:"6b6b6b", // estrutura, presente mas silenciosa
  string:     "9a9a9a", // dado lê mais baixo que lógica
  decorator:  "a3a3a3",
  number:     "b8b8b8",
  constant:   "b8b8b8",
  type:       "c4c4c4",
  variable:   "d4d4d4", // corpo do código
  property:   "d4d4d4",
  fn:         "ededed", // nome que se procura ao varrer o arquivo
  keyword:    "f5f5f5",
  control:    "ffffff", // onde o código decide
} as const;

export const THEME_NAME = "fabricio-mono";

export function defineTheme(monaco: Monaco): void {
  monaco.editor.defineTheme(THEME_NAME, {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "",                       foreground: HL.variable },
      { token: "comment",                foreground: HL.comment, fontStyle: "italic" },
      { token: "keyword",                foreground: HL.keyword },
      { token: "keyword.control",        foreground: HL.control, fontStyle: "bold" },
      { token: "keyword.flow",           foreground: HL.control, fontStyle: "bold" },
      { token: "keyword.operator",       foreground: HL.keyword },
      { token: "storage",                foreground: HL.keyword },
      { token: "storage.type",           foreground: HL.type },
      { token: "string",                 foreground: HL.string },
      { token: "string.escape",          foreground: HL.constant },
      { token: "number",                 foreground: HL.number },
      { token: "constant",               foreground: HL.constant },
      { token: "constant.language",      foreground: HL.constant },
      { token: "type",                   foreground: HL.type },
      { token: "type.identifier",        foreground: HL.type },
      { token: "identifier",             foreground: HL.variable },
      { token: "variable",               foreground: HL.variable },
      { token: "variable.parameter",     foreground: HL.constant },
      { token: "function",               foreground: HL.fn },
      { token: "method",                 foreground: HL.fn },
      { token: "delimiter",              foreground: HL.punctuation },
      { token: "punctuation",            foreground: HL.punctuation },
      { token: "tag",                    foreground: HL.keyword },
      { token: "metatag",                foreground: HL.decorator, fontStyle: "italic" },
      { token: "attribute.name",         foreground: HL.fn },
      { token: "attribute.value",        foreground: HL.string },
      { token: "decorator",              foreground: HL.decorator, fontStyle: "italic" },
      { token: "annotation",             foreground: HL.decorator, fontStyle: "italic" },
      // markdown
      { token: "keyword.md",             foreground: HL.control, fontStyle: "bold" },
      { token: "string.md",              foreground: HL.string },
    ],
    colors: {
      "editor.background":              PALETTE.bg,
      "editor.foreground":              PALETTE.text,
      "editorLineNumber.foreground":    "#3a3a3a",
      "editorLineNumber.activeForeground": PALETTE.textMuted,
      "editor.lineHighlightBackground": "#141414",
      "editor.lineHighlightBorder":     "#141414",
      "editorCursor.foreground":        PALETTE.accent,
      "editor.selectionBackground":     PALETTE.selection,
      "editor.inactiveSelectionBackground": "#232323",
      "editorWhitespace.foreground":    "#222222",
      "editorIndentGuide.background":   "#1c1c1c",
      "editorIndentGuide.activeBackground": "#2e2e2e",
      "editorGutter.background":        PALETTE.bg,
      "scrollbarSlider.background":     "#2a2a2aaa",
      "scrollbarSlider.hoverBackground":"#383838aa",
      "scrollbarSlider.activeBackground":"#4a4a4aaa",
      "editorBracketMatch.background":  "#232323",
      "editorBracketMatch.border":      PALETTE.accent,
    },
  });
}
