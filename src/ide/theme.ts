import type { Monaco } from "@monaco-editor/react";

// Paleta autoral — não tenta imitar VSCode. Tons quentes,
// fundo grafite, acento em ferrugem/coral. Foi pensada
// pra dar identidade ao IDE (não cair no genérico).

export const PALETTE = {
  bg:           "#0e0f12",
  panel:        "#13151a",
  panelAlt:     "#181a20",
  line:         "#1f222a",
  lineStrong:   "#272b34",
  text:         "#e6e3dc",
  textMuted:    "#9ea2ab",
  textDim:      "#6c7079",
  accent:       "#e36b3a",   // ferrugem
  accentSoft:   "#f0a570",
  good:         "#7cb37b",
  warn:         "#d4a247",
  info:         "#6a93c4",
  bad:          "#cf6464",
  selection:    "#3a2e26",
} as const;

const HL = {
  keyword:    "c98a5a",   // ferrugem clara
  control:    "e36b3a",
  string:     "a9c47a",
  number:     "d4a247",
  comment:    "5e6168",
  type:       "8fb4d4",
  variable:   "e6e3dc",
  fn:         "f0a570",
  constant:   "d68b8b",
  punctuation:"9ea2ab",
  decorator:  "b48cd4",
  property:   "e6e3dc",
} as const;

export const THEME_NAME = "fabricio-dark";

export function defineTheme(monaco: Monaco): void {
  monaco.editor.defineTheme(THEME_NAME, {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "",                       foreground: HL.variable },
      { token: "comment",                foreground: HL.comment, fontStyle: "italic" },
      { token: "keyword",                foreground: HL.keyword },
      { token: "keyword.control",        foreground: HL.control },
      { token: "keyword.flow",           foreground: HL.control },
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
      { token: "metatag",                foreground: HL.decorator },
      { token: "attribute.name",         foreground: HL.fn },
      { token: "attribute.value",        foreground: HL.string },
      { token: "decorator",              foreground: HL.decorator },
      { token: "annotation",             foreground: HL.decorator },
      // markdown
      { token: "keyword.md",             foreground: HL.control, fontStyle: "bold" },
      { token: "string.md",              foreground: HL.string },
    ],
    colors: {
      "editor.background":              PALETTE.bg,
      "editor.foreground":              PALETTE.text,
      "editorLineNumber.foreground":    PALETTE.textDim,
      "editorLineNumber.activeForeground": PALETTE.textMuted,
      "editor.lineHighlightBackground": "#16181d",
      "editor.lineHighlightBorder":     "#16181d",
      "editorCursor.foreground":        PALETTE.accent,
      "editor.selectionBackground":     PALETTE.selection,
      "editor.inactiveSelectionBackground": "#2a221c",
      "editorWhitespace.foreground":    "#22252c",
      "editorIndentGuide.background":   "#1c1f25",
      "editorIndentGuide.activeBackground": "#2b2f37",
      "editorGutter.background":        PALETTE.bg,
      "scrollbarSlider.background":     "#2a2d35aa",
      "scrollbarSlider.hoverBackground":"#3a3e48aa",
      "scrollbarSlider.activeBackground":"#4a4f5aaa",
      "editorBracketMatch.background":  "#2a221c",
      "editorBracketMatch.border":      PALETTE.accent,
    },
  });
}
