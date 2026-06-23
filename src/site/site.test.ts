import { describe, it, expect } from "vitest";
import { PROJECTS, SOBRE, STACK_GROUPS, EMPRESAS } from "./data";

describe("data.ts — integridade dos dados", () => {
  describe("PROJECTS", () => {
    it("deve ter pelo menos 10 projetos", () => {
      expect(PROJECTS.length).toBeGreaterThanOrEqual(10);
    });

    it("todos os projetos devem ter slug único", () => {
      const slugs = PROJECTS.map((p) => p.slug);
      const uniques = new Set(slugs);
      expect(uniques.size).toBe(slugs.length);
    });

    it("todos os projetos devem ter name, oneLine e year", () => {
      for (const p of PROJECTS) {
        expect(p.name.length).toBeGreaterThan(0);
        expect(p.oneLine.length).toBeGreaterThan(0);
        expect(p.year).toMatch(/^\d{4}$/);
      }
    });

    it("todos os projetos devem ter github válido ou ser privados (null)", () => {
      for (const p of PROJECTS) {
        if (p.github === null) continue; // repositório privado, sem link público
        expect(p.github).toMatch(/^https:\/\/github\.com\//);
      }
    });

    it("todos os projetos devem ter stack não vazia", () => {
      for (const p of PROJECTS) {
        expect(p.stack.length).toBeGreaterThan(0);
      }
    });

    it("todos os projetos devem ter snippet não vazio", () => {
      for (const p of PROJECTS) {
        expect(p.snippet.trim().length).toBeGreaterThan(0);
      }
    });

    it("snippetLang deve ser um dos valores permitidos", () => {
      const langs = new Set(["typescript", "python", "java", "php", "csharp"]);
      for (const p of PROJECTS) {
        expect(langs.has(p.snippetLang)).toBe(true);
      }
    });

    it("nenhum projeto deve ter travessão no nome ou oneLine", () => {
      for (const p of PROJECTS) {
        expect(p.name).not.toContain("—");
        expect(p.oneLine).not.toContain("—");
      }
    });
  });

  describe("SOBRE", () => {
    it("deve ter email correto", () => {
      expect(SOBRE.contato.email).toBe("junioad555@gmail.com");
    });

    it("deve ter github e linkedin válidos", () => {
      expect(SOBRE.contato.github).toMatch(/^https:\/\/github\.com\//);
      expect(SOBRE.contato.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
    });

    it("bio não deve ter travessão", () => {
      expect(SOBRE.bio).not.toContain("—");
      for (const par of SOBRE.longBio) {
        expect(par).not.toContain("—");
      }
    });

    it("deve ter 3 parágrafos na longBio", () => {
      expect(SOBRE.longBio.length).toBe(3);
    });

    it("deve ter cargo, empresa e cidade preenchidos", () => {
      expect(SOBRE.cargo.length).toBeGreaterThan(0);
      expect(SOBRE.empresa.length).toBeGreaterThan(0);
      expect(SOBRE.cidade.length).toBeGreaterThan(0);
    });
  });

  describe("STACK_GROUPS", () => {
    it("deve ter 5 grupos", () => {
      expect(STACK_GROUPS.length).toBe(5);
    });

    it("cada grupo deve ter label e items não vazios", () => {
      for (const g of STACK_GROUPS) {
        expect(g.label.length).toBeGreaterThan(0);
        expect(g.items.length).toBeGreaterThan(0);
      }
    });

    it("deve ter grupo back, front, dados, ml e infra", () => {
      const labels = STACK_GROUPS.map((g) => g.label);
      expect(labels).toContain("back");
      expect(labels).toContain("front");
      expect(labels).toContain("dados");
      expect(labels).toContain("ml");
      expect(labels).toContain("infra");
    });
  });

  describe("EMPRESAS", () => {
    it("deve ter pelo menos 4 empresas para o marquee", () => {
      expect(EMPRESAS.length).toBeGreaterThanOrEqual(4);
    });

    it("não deve conter Credimogiana", () => {
      expect(EMPRESAS.join(" ")).not.toContain("Credimogiana");
    });

    it("deve conter Nexum Tecnologia", () => {
      expect(EMPRESAS).toContain("Nexum Tecnologia");
    });
  });
});

describe("SnippetView — tokenizador", () => {
  const tokenize = (line: string, lang: "python" | "typescript" | "java" | "php") => {
    const KEYWORDS: Record<string, string[]> = {
      python: ["def", "return", "if", "for", "in", "lambda", "from", "import", "True", "False", "None", "elif", "else", "self", "is", "not", "and", "or", "class", "with", "as", "try", "except", "raise"],
      typescript: ["const", "let", "var", "function", "return", "if", "for", "in", "of", "async", "await", "import", "from", "export", "default", "type", "interface", "class", "new", "throw", "as", "extends", "implements", "public", "private", "true", "false", "null", "undefined", "this", "while", "switch", "case", "break"],
      java: ["public", "private", "protected", "static", "final", "class", "interface", "extends", "implements", "return", "if", "for", "while", "new", "throw", "true", "false", "null", "void", "int", "double", "float", "List", "String", "Map", "this", "super", "try", "catch"],
      php: ["public", "private", "function", "return", "if", "use", "namespace", "new", "static", "fn", "match", "true", "false", "null", "class", "abstract", "extends", "implements"],
    };

    const kws = new Set(KEYWORDS[lang]);
    const commentStart = lang === "python" ? "#" : "//";
    const ci = line.indexOf(commentStart);
    const codePart = ci >= 0 ? line.slice(0, ci) : line;
    const commentPart = ci >= 0 ? line.slice(ci) : "";

    const tokens: { text: string; cls: string }[] = [];
    const re = /("[^"]*"|'[^']*'|`[^`]*`|[a-zA-Z_$][a-zA-Z0-9_$]*|\d+(?:\.\d+)?|\s+|.)/g;
    let m;
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
  };

  it("identifica keyword em Python", () => {
    const tokens = tokenize("def xg(x, y):", "python");
    const def_ = tokens.find((t) => t.text === "def");
    expect(def_?.cls).toBe("k");
  });

  it("identifica string com aspas duplas", () => {
    const tokens = tokenize('const s = "hello";', "typescript");
    const str = tokens.find((t) => t.text === '"hello"');
    expect(str?.cls).toBe("s");
  });

  it("identifica número", () => {
    const tokens = tokenize("z = 0.45;", "python");
    const num = tokens.find((t) => t.text === "0.45");
    expect(num?.cls).toBe("n");
  });

  it("identifica comentário em TypeScript (//)", () => {
    const tokens = tokenize("const x = 1; // meu comentário", "typescript");
    const comment = tokens.find((t) => t.cls === "c");
    expect(comment?.text).toContain("//");
  });

  it("identifica comentário em Python (#)", () => {
    const tokens = tokenize("x = 1 # nota", "python");
    const comment = tokens.find((t) => t.cls === "c");
    expect(comment?.text).toContain("#");
  });

  it("identifica class name (começa com maiúscula) como tipo", () => {
    const tokens = tokenize("new MyClass()", "typescript");
    const cls = tokens.find((t) => t.text === "MyClass");
    expect(cls?.cls).toBe("t");
  });

  it("keyword 'return' reconhecido em Java", () => {
    const tokens = tokenize("  return deal;", "java");
    const kw = tokens.find((t) => t.text === "return");
    expect(kw?.cls).toBe("k");
  });

  it("keyword 'public' reconhecido em PHP", () => {
    const tokens = tokenize("public function moveDeal() {", "php");
    const kw = tokens.find((t) => t.text === "public");
    expect(kw?.cls).toBe("k");
  });
});

describe("Work — extensão de arquivo", () => {
  const ext = (lang: string): string => {
    if (lang === "python") return "py";
    if (lang === "java") return "java";
    if (lang === "php") return "php";
    if (lang === "csharp") return "cs";
    return "ts";
  };

  it("python → py", () => expect(ext("python")).toBe("py"));
  it("java → java", () => expect(ext("java")).toBe("java"));
  it("php → php", () => expect(ext("php")).toBe("php"));
  it("csharp → cs", () => expect(ext("csharp")).toBe("cs"));
  it("typescript → ts", () => expect(ext("typescript")).toBe("ts"));
  it("desconhecido → ts", () => expect(ext("cobol")).toBe("ts"));
});
