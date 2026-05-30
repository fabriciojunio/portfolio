import { describe, expect, it } from "vitest";
import { ALL_FILES, TREE, filesByPath } from "./index";

describe("virtual file system", () => {
  it("ships pelo menos 12 arquivos (1 por projeto + meta)", () => {
    expect(ALL_FILES.length).toBeGreaterThanOrEqual(12);
  });

  it("inclui sobre.md, perfil.json, README.md e contato", () => {
    const names = ALL_FILES.map((f) => f.name);
    expect(names).toContain("sobre.md");
    expect(names).toContain("perfil.json");
    expect(names).toContain("README.md");
    expect(names).toContain("contato.ts");
  });

  it("todo file que tem 'meta' aponta para projeto, github e stack", () => {
    for (const f of ALL_FILES) {
      if (!f.meta) continue;
      expect(f.meta.project, `meta.project em ${f.path}`).toBeTruthy();
      expect(f.meta.github, `meta.github em ${f.path}`).toMatch(/^https:\/\/github.com\//);
      expect(f.meta.stack && f.meta.stack.length).toBeGreaterThan(0);
    }
  });

  it("filesByPath está consistente com ALL_FILES", () => {
    expect(filesByPath.size).toBe(ALL_FILES.length);
    for (const f of ALL_FILES) {
      expect(filesByPath.get(f.path)).toBe(f);
    }
  });

  it("TREE tem nó raiz fabricio-junio", () => {
    expect(TREE.name).toBe("fabricio-junio");
    expect(TREE.children.length).toBeGreaterThan(0);
  });
});
