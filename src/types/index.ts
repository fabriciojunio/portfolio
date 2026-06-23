export type Language =
  | "typescript"
  | "javascript"
  | "python"
  | "java"
  | "php"
  | "csharp"
  | "json"
  | "markdown"
  | "yaml"
  | "shell"
  | "sql"
  | "plaintext";

export interface VFile {
  path: string;
  name: string;
  language: Language;
  content: string;
  runnable?: RunKind;
  meta?: {
    project?: string;
    github?: string;
    demo?: string | null;
    stack?: string[];
    role?: string;
  };
}

export type RunKind = "xg" | "kelly" | "elo" | "zod" | "vagas-score";

export interface DirNode {
  type: "dir";
  name: string;
  path: string;
  children: TreeNode[];
}

export interface FileNode {
  type: "file";
  name: string;
  path: string;
  language: Language;
}

export type TreeNode = DirNode | FileNode;

export interface TerminalEntry {
  id: number;
  kind: "input" | "output" | "system";
  text: string;
}

export interface CommandDescriptor {
  id: string;
  label: string;
  hint?: string;
  shortcut?: string;
  group: "Arquivo" | "Visualizar" | "Navegar" | "Sistema" | "Projeto";
  run: () => void;
}
