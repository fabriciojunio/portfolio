import { describe, it, expect } from "vitest";
import { skillCategories } from "./skills";

describe("skills data", () => {
  it("should have 4 categories", () => {
    expect(skillCategories).toHaveLength(4);
  });

  it("every category should have a name, color and at least one skill", () => {
    skillCategories.forEach((cat) => {
      expect(cat.name).toBeTruthy();
      expect(cat.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(cat.skills.length).toBeGreaterThan(0);
    });
  });

  it("every skill should have a name and at least one project", () => {
    skillCategories.forEach((cat) => {
      cat.skills.forEach((s) => {
        expect(s.name).toBeTruthy();
        expect(s.projects.length).toBeGreaterThan(0);
      });
    });
  });

  it("should include key languages", () => {
    const langCategory = skillCategories.find((c) => c.name === "linguagens");
    expect(langCategory).toBeDefined();
    const langNames = langCategory!.skills.map((s) => s.name);
    expect(langNames).toContain("Python");
    expect(langNames).toContain("Java");
    expect(langNames).toContain("TypeScript");
    expect(langNames).toContain("Go");
  });

  it("should include key frameworks", () => {
    const fwCategory = skillCategories.find((c) => c.name === "frameworks");
    expect(fwCategory).toBeDefined();
    const fwNames = fwCategory!.skills.map((s) => s.name);
    expect(fwNames).toContain("Spring Boot");
    expect(fwNames).toContain("FastAPI");
  });
});
