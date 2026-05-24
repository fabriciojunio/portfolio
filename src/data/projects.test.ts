import { describe, it, expect } from "vitest";
import { projects } from "./projects";

describe("projects data", () => {
  it("should have at least 10 projects", () => {
    expect(projects.length).toBeGreaterThanOrEqual(10);
  });

  it("should have unique IDs", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("should have unique names", () => {
    const names = projects.map((p) => p.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("every project should have required fields", () => {
    projects.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.shortDesc).toBeTruthy();
      expect(p.longDesc).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.tags.length).toBeGreaterThan(0);
      expect(p.metrics.length).toBeGreaterThan(0);
      expect(p.features.length).toBeGreaterThan(0);
      expect(p.architecture).toBeTruthy();
      expect(p.techStack.length).toBeGreaterThan(0);
      expect(p.github).toMatch(/^https:\/\/github\.com\//);
      expect(p.filters.length).toBeGreaterThan(0);
    });
  });

  it("every github link should be a valid URL", () => {
    projects.forEach((p) => {
      expect(() => new URL(p.github)).not.toThrow();
    });
  });

  it("every metric should have value, label and color", () => {
    projects.forEach((p) => {
      p.metrics.forEach((m) => {
        expect(m.value).toBeTruthy();
        expect(m.label).toBeTruthy();
        expect(m.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });
  });

  it("every techStack item should have name and valid hex color", () => {
    projects.forEach((p) => {
      p.techStack.forEach((t) => {
        expect(t.name).toBeTruthy();
        expect(t.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });
  });

  it("filters should only contain valid categories", () => {
    const validFilters = [
      "data-science",
      "full-stack",
      "mobile",
      "java",
      "python",
      "javascript",
      "go",
    ];
    projects.forEach((p) => {
      p.filters.forEach((f) => {
        expect(validFilters).toContain(f);
      });
    });
  });

  it("should have projects in each major category", () => {
    const categories = new Set(projects.flatMap((p) => p.filters));
    expect(categories).toContain("data-science");
    expect(categories).toContain("full-stack");
    expect(categories).toContain("mobile");
    expect(categories).toContain("python");
    expect(categories).toContain("java");
    expect(categories).toContain("javascript");
  });

  it("no demo link should be an empty string", () => {
    projects.forEach((p) => {
      if (p.demo !== null) {
        expect(p.demo).toBeTruthy();
        expect(() => new URL(p.demo!)).not.toThrow();
      }
    });
  });
});
