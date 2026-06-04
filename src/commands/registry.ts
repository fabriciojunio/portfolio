import { ALL_FILES, filesByPath, TREE } from "../vfs";
import type { TreeNode } from "../types";

export interface CommandContext {
  open: (path: string) => void;
  setTerminal: (v: boolean) => void;
  setPalette: (v: boolean) => void;
  setRunPanel: (v: boolean) => void;
  setQuickOpen: (v: boolean) => void;
  getActivePath: () => string;
}

export interface CommandResult {
  lines: string[];
  effect?: () => void;
}

const HELP = [
  "comandos disponíveis:",
  "",
  "  ls [pasta]            lista arquivos e pastas",
  "  cat <arquivo>         imprime conteúdo do arquivo",
  "  open <arquivo>        abre o arquivo no editor",
  "  run                   executa demo do arquivo ativo (se houver)",
  "  pwd                   mostra caminho atual",
  "  tree                  árvore completa do workspace",
  "  whoami                quem é você (perfil resumido)",
  "  projetos              lista os 14 projetos",
  "  stack                 stack que eu uso",
  "  contato               como me chamar",
  "  ajuda | help          mostra esta lista",
  "  clear                 limpa o terminal",
  "",
  "atalhos:",
  "  Ctrl/⌘+K   paleta de comandos",
  "  Ctrl/⌘+P   abrir arquivo rápido",
  "  Ctrl/⌘+\\`   abrir/fechar terminal",
];

export function runCommand(raw: string, ctx: CommandContext): CommandResult {
  const trimmed = raw.trim();
  if (!trimmed) return { lines: [] };

  const [cmd, ...args] = trimmed.split(/\s+/);
  const arg = args.join(" ");

  switch (cmd.toLowerCase()) {
    case "help":
    case "ajuda":
    case "?":
      return { lines: HELP };

    case "clear":
    case "cls":
    case "limpar":
      return { lines: ["__clear__"] };

    case "pwd":
      return { lines: ["/home/fabricio/portfolio"] };

    case "whoami":
      return {
        lines: [
          "Fabrício Júnio Alves Dias, 20 anos, Bauru/SP",
          "Analista de Sistemas Júnior na Nexum Tecnologia",
          "Ciência da Computação na UNISAGRADO",
          "  github:   github.com/fabriciojunio",
          "  linkedin: linkedin.com/in/fabríciojúnio",
          "  e-mail:   junioad555@gmail.com",
        ],
      };

    case "ls":
    case "dir": {
      const target = arg ? normalize(arg) : "/";
      const node = findDir(target);
      if (!node) return { lines: [`ls: caminho não encontrado: ${target}`] };
      const items = node.children.map((c) =>
        c.type === "dir" ? `📁 ${c.name}/` : `   ${c.name}`,
      );
      return { lines: items.length ? items : ["(vazio)"] };
    }

    case "tree": {
      return { lines: drawTree(TREE.children, "") };
    }

    case "cat": {
      if (!arg) return { lines: ["cat: faltou o nome do arquivo"] };
      const file = resolveFile(arg);
      if (!file) return { lines: [`cat: ${arg}: arquivo não encontrado`] };
      return { lines: file.content.split("\n") };
    }

    case "open":
    case "abrir": {
      if (!arg) return { lines: ["open: faltou o nome do arquivo"] };
      const file = resolveFile(arg);
      if (!file) return { lines: [`open: ${arg}: arquivo não encontrado`] };
      return {
        lines: [`abrindo ${file.path}...`],
        effect: () => ctx.open(file.path),
      };
    }

    case "run":
    case "exec": {
      const path = ctx.getActivePath();
      const file = path ? filesByPath.get(path) : null;
      if (!file || !file.runnable) {
        return {
          lines: [
            "run: o arquivo atual não tem demo interativa.",
            "    tente: open projetos/goldata.py && run",
          ],
        };
      }
      return {
        lines: [`▶ rodando demo: ${file.runnable} (${file.name})`],
        effect: () => ctx.setRunPanel(true),
      };
    }

    case "projetos":
    case "projects": {
      const lines = ALL_FILES.filter((f) => f.meta)
        .map((f) => `  ${pad(f.name, 28)} ${f.meta!.project}`);
      return {
        lines: [`${lines.length} projetos:`, "", ...lines],
      };
    }

    case "stack":
      return {
        lines: [
          "  back:    Java + Spring Boot, Node + NestJS, FastAPI, Laravel",
          "  front:   React / Next.js, React Native + Expo, TypeScript",
          "  dados:   PostgreSQL, Redis, Supabase, SQLite (WAL+FTS)",
          "  ml:      scikit-learn, XGBoost, PyTorch, FinBERT-PT-BR, Ollama",
          "  infra:   Docker, GitHub Actions, Nginx, Vercel",
        ],
      };

    case "contato":
    case "contact":
      return {
        lines: [
          "  e-mail:   junioad555@gmail.com",
          "  github:   github.com/fabriciojunio",
          "  linkedin: linkedin.com/in/fabríciojúnio",
          "  cidade:   Bauru, SP",
        ],
      };

    case "echo":
      return { lines: [arg] };

    case "date":
      return { lines: [new Date().toString()] };

    case "vim":
    case "nano":
    case "emacs":
      return {
        lines: [
          `${cmd}: editor não pode ser iniciado dentro desse editor.`,
          "      use o Monaco (já está rodando ao lado).",
        ],
      };

    case "sudo":
      return { lines: ["sudo: você não está no sudoers. Esse incidente será reportado. (não vai ser, relaxa)"] };

    case "rm":
      if (arg.includes("-rf") && arg.includes("/")) {
        return { lines: ["rm: boa tentativa. tudo aqui é virtual."] };
      }
      return { lines: ["rm: este é um workspace somente leitura."] };

    case "npm":
    case "pnpm":
    case "yarn": {
      if (arg.startsWith("install")) {
        return {
          lines: [
            `${cmd} install`,
            "  ▸ resolvendo dependências...",
            "  ▸ tudo aqui já está instalado :)",
            "",
            `done in 247ms`,
          ],
        };
      }
      if (arg === "run dev" || arg === "dev") {
        return {
          lines: [
            "VITE v6.0.1  ready in 247 ms",
            "",
            "  ➜  Local:   http://localhost:5173/",
            "  ➜  Network: use --host to expose",
          ],
        };
      }
      return { lines: [`${cmd}: subcomando "${arg}" não reconhecido.`] };
    }

    case "git": {
      if (arg === "status") {
        return {
          lines: [
            "On branch main",
            "Your branch is up to date with 'origin/main'.",
            "",
            "nothing to commit, working tree clean",
          ],
        };
      }
      if (arg.startsWith("log")) {
        return {
          lines: [
            "* a3f4c1d (HEAD -> main) reescreve portfolio como IDE no browser",
            "* 7c91e8b ajusta CSP para Monaco",
            "* d12b09a adiciona demos interativas (xG, Zod, Vagas)",
            "* 4b58a02 boot sequence + paleta de comandos",
            "* 1ea9377 esqueleto inicial",
          ],
        };
      }
      return { lines: [`git: subcomando "${arg}" não reconhecido aqui.`] };
    }

    default:
      return {
        lines: [
          `${cmd}: comando não encontrado. tente 'ajuda'.`,
        ],
      };
  }
}

export const SUGGESTIONS = [
  "ajuda",
  "ls",
  "ls projetos",
  "cat sobre.md",
  "cat perfil.json",
  "open projetos/goldata.py",
  "open projetos/apontamento-horas.ts",
  "open projetos/jis.java",
  "tree",
  "whoami",
  "projetos",
  "stack",
  "contato",
  "run",
  "git log",
  "npm run dev",
];

function pad(s: string, n: number): string {
  return s.length >= n ? s : s + " ".repeat(n - s.length);
}

function normalize(p: string): string {
  let path = p.startsWith("/") ? p : "/" + p;
  path = path.replace(/\/+/g, "/");
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path;
}

function findDir(path: string): { children: TreeNode[] } | null {
  if (path === "/") return TREE;
  const parts = path.split("/").filter(Boolean);
  let cur: TreeNode = TREE;
  for (const part of parts) {
    if (cur.type !== "dir") return null;
    const next: TreeNode | undefined = cur.children.find((c) => c.name === part);
    if (!next) return null;
    cur = next;
  }
  return cur.type === "dir" ? cur : null;
}

function resolveFile(arg: string) {
  const path = normalize(arg);
  if (filesByPath.has(path)) return filesByPath.get(path)!;
  for (const f of ALL_FILES) {
    if (f.name === arg) return f;
    if (f.path.endsWith("/" + arg)) return f;
  }
  return null;
}

function drawTree(nodes: TreeNode[], prefix: string): string[] {
  const out: string[] = [];
  nodes.forEach((node, i) => {
    const last = i === nodes.length - 1;
    const branch = last ? "└─ " : "├─ ";
    out.push(prefix + branch + (node.type === "dir" ? node.name + "/" : node.name));
    if (node.type === "dir") {
      const childPrefix = prefix + (last ? "   " : "│  ");
      out.push(...drawTree(node.children, childPrefix));
    }
  });
  return out;
}
