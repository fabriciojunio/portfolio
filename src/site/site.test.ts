import { describe, expect, it } from "vitest";
import { PROJECTS, PROJETOS_EIXO, PROJETOS_PARCERIA, PROJETOS_ACERVO, SOBRE, STACK_GROUPS } from "./data";
import { DICIONARIO, IDIOMAS } from "./i18n";
import { TRADUCOES } from "./i18n-projetos";
import { ALL_FILES, filesByPath } from "../vfs";
import { CARTAS_DO_TOPO } from "./Cards3D";
import { aberturaPedida } from "../lab/aberturaPelaUrl";

describe("curadoria e coerência do portfólio", () => {
  it("prioriza os projetos de desenvolvimento solicitados", () => {
    expect(PROJETOS_EIXO.slice(0, 3).map(p => p.slug)).toEqual(["almanaque", "vitrine-bauru", "feira"]);
    expect([...CARTAS_DO_TOPO]).toEqual(PROJETOS_EIXO.map(p => p.slug));
    expect(PROJETOS_PARCERIA.map(p => p.slug)).toEqual(["conectagente", "cardiocam", "lastro"]);
  });
  it("cada projeto pertence a um único grupo", () => {
    const slugs = [...PROJETOS_EIXO, ...PROJETOS_PARCERIA, ...PROJETOS_ACERVO].map(p => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).toEqual(PROJECTS.map(p => p.slug));
  });
  it("preserva os trabalhos acadêmicos para consulta", () => {
    for (const slug of ["permaneia", "cardiocam", "baliza", "contaflux", "kaida", "bicudo", "laboratorio-vr"]) {
      expect([...PROJETOS_PARCERIA, ...PROJETOS_ACERVO].map(p => p.slug)).toContain(slug);
    }
  });
  it("não republica código dos projetos privados retirados", () => {
    const lastro = filesByPath.get("/projetos/lastro.md")!;
    expect(lastro.language).toBe("markdown");
    expect(lastro.meta?.presentationOnly).toBe(true);
    expect(lastro.meta?.source).toBeUndefined();
    expect(lastro.meta?.github).toBeUndefined();
    expect(lastro.runnable).toBeUndefined();
    expect(lastro.content).toContain("Código e artefatos privados até a defesa");
    for (const slug of ["anteparo", "cautela", "decurso", "prumo", "trato", "verbete", "quantbot-ml", "balcao", "registraservico", "bravor", "sintonia", "apontamento-horas"]) {
      expect(PROJECTS.map(p => p.slug)).not.toContain(slug);
      expect(ALL_FILES.some(f => f.path.includes(`/${slug}.`))).toBe(false);
    }
  });
  it("cada card possui conteúdo, roteiro e links válidos", () => {
    for (const p of PROJECTS) {
      expect(p.name.trim()).not.toBe("");
      expect(p.oneLine.length).toBeLessThan(100);
      expect(p.year).toMatch(/^\d{4}$/);
      if (p.github) expect(p.github).toMatch(/^https:\/\/github\.com\/fabriciojunio\//);
      else expect(p.presentationOnly).toBe(true);
      if (p.demo) expect(p.demo).toMatch(/^https:\/\//);
      expect(p.flow.length).toBeGreaterThanOrEqual(2);
      expect(p.demoNote.trim()).not.toBe("");
      expect(p.snippet.trim()).not.toBe("");
    }
  });
  it("card e IDE compartilham o mesmo código e metadados", () => {
    for (const p of PROJECTS) {
      const f = filesByPath.get(p.idePath)!;
      expect(f, p.slug).toBeDefined();
      expect(f.content).toBe(p.snippet);
      expect(f.meta).toMatchObject({ project: p.name, github: p.github ?? undefined, stack: p.stack, role: p.role, demo: p.demo, demoNote: p.demoNote });
      expect(aberturaPedida(`?arquivo=${encodeURIComponent(p.idePath)}`)).toEqual({ caminho: p.idePath, rodar: false });
    }
  });
  it("todos os links de simulação abrem um arquivo compatível", () => {
    for (const p of PROJECTS.filter(p => p.labDemo)) {
      expect(aberturaPedida(`?arquivo=${encodeURIComponent(p.labDemo!)}&run=1`)).toEqual({ caminho: p.labDemo, rodar: true });
    }
    const linked = new Set(PROJECTS.map(p => p.labDemo));
    for (const f of ALL_FILES.filter(f => f.runnable)) expect(linked.has(f.path)).toBe(true);
    expect(aberturaPedida("?arquivo=/projetos/almanaque.php&run=1")?.rodar).toBe(false);
  });
  it("descreve a atuação e separa pesquisa do trabalho", () => {
    expect(SOBRE.cargo).toBe("Analista de Sistemas");
    expect(SOBRE.bio).toContain("sustentação");
    expect(STACK_GROUPS.find(g => g.label === "trabalho")?.items).toContain("Lecom BPM");
    expect(STACK_GROUPS.find(g => g.label === "integracoes")?.items).toContain("MCP");
    expect(SOBRE.contato.email).toBe("junioad555@gmail.com");
  });
  it("corrige o algoritmo do AuthCore e o escopo das demonstrações", () => {
    const auth = PROJECTS.find(p => p.slug === "authcore")!;
    expect(auth.highlights?.join(" ")).toContain("HS256");
    expect(auth.snippet).not.toContain("RS256");
    expect(PROJECTS.find(p => p.slug === "koracrm")?.demoNote).toContain("API Laravel não está publicada");
    expect(PROJECTS.find(p => p.slug === "feira")?.demoNote).toContain("Simulação");
    expect(PROJECTS.find(p => p.slug === "cardiocam")?.demoNote).toContain("sintéticos");
  });
});

describe("idiomas", () => {
  it("o posicionamento e os rótulos estão atualizados em todos os idiomas", () => {
    for (const { codigo } of IDIOMAS) {
      const t = DICIONARIO[codigo];
      expect(t.sobre.cargo).not.toBe("AI Engineer");
      expect(t.sobre.longBio).toHaveLength(SOBRE.longBio.length);
      for (const g of STACK_GROUPS) expect(t.stack.grupos[g.label]).toBeTruthy();
      expect(Object.values(t.trabalho.card).every(Boolean)).toBe(true);
    }
  });
  it("todas as traduções cobrem a seleção atual, com roteiro e escopo", () => {
    for (const lang of ["en", "es"] as const) {
      expect(Object.keys(TRADUCOES[lang]).sort()).toEqual(PROJECTS.map(p => p.slug).sort());
      for (const p of PROJECTS) {
        const t = TRADUCOES[lang][p.slug];
        expect(t.highlights).toHaveLength(p.highlights!.length);
        expect(t.flow.length).toBeGreaterThanOrEqual(2);
        expect(t.demoNote.trim()).not.toBe("");
      }
    }
  });
});
