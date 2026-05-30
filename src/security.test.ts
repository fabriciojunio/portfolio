import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { resolve, join } from "path";

describe("security", () => {
  describe("vercel.json security headers", () => {
    const vercelConfig = JSON.parse(
      readFileSync(resolve(__dirname, "../vercel.json"), "utf-8"),
    );
    const headers = vercelConfig.headers[0].headers;
    const getHeader = (key: string) =>
      headers.find((h: { key: string }) => h.key === key)?.value;

    it("should have Content-Security-Policy with default-src self", () => {
      const csp = getHeader("Content-Security-Policy");
      expect(csp).toBeDefined();
      expect(csp).toContain("default-src 'self'");
      expect(csp).toContain("frame-ancestors 'none'");
      expect(csp).toContain("base-uri 'self'");
      expect(csp).toContain("form-action 'self'");
    });

    it("should allow workers from self and blob (Monaco needs blob workers)", () => {
      const csp = getHeader("Content-Security-Policy");
      expect(csp).toContain("worker-src 'self' blob:");
    });

    it("should NOT allow third-party CDNs", () => {
      const csp = getHeader("Content-Security-Policy");
      expect(csp).not.toMatch(/https?:\/\//);
    });

    it("should have HSTS with long max-age and preload", () => {
      const hsts = getHeader("Strict-Transport-Security");
      expect(hsts).toContain("max-age=63072000");
      expect(hsts).toContain("includeSubDomains");
      expect(hsts).toContain("preload");
    });

    it("should have X-Content-Type-Options nosniff", () => {
      expect(getHeader("X-Content-Type-Options")).toBe("nosniff");
    });

    it("should have X-Frame-Options DENY", () => {
      expect(getHeader("X-Frame-Options")).toBe("DENY");
    });

    it("should have Referrer-Policy strict-origin-when-cross-origin", () => {
      expect(getHeader("Referrer-Policy")).toBe(
        "strict-origin-when-cross-origin",
      );
    });

    it("should have Permissions-Policy blocking sensitive APIs", () => {
      const pp = getHeader("Permissions-Policy");
      expect(pp).toContain("camera=()");
      expect(pp).toContain("microphone=()");
      expect(pp).toContain("geolocation=()");
      expect(pp).toContain("interest-cohort=()");
    });
  });

  describe("index.html security", () => {
    const html = readFileSync(resolve(__dirname, "../index.html"), "utf-8");

    it("should have lang attribute set to pt-BR", () => {
      expect(html).toContain('lang="pt-BR"');
    });

    it("should have charset UTF-8", () => {
      expect(html).toContain('charset="UTF-8"');
    });

    it("should have viewport meta tag", () => {
      expect(html).toContain("viewport");
    });

    it("should set theme color matching the dark UI", () => {
      expect(html).toContain('name="theme-color"');
      expect(html).toContain("#0a0b0e");
    });
  });

  describe("robots.txt should block AI crawlers", () => {
    const txt = readFileSync(
      resolve(__dirname, "../public/robots.txt"),
      "utf-8",
    );
    const blocked = [
      "GPTBot",
      "Google-Extended",
      "CCBot",
      "anthropic-ai",
      "ClaudeBot",
      "Bytespider",
    ];
    blocked.forEach((agent) => {
      it(`should block ${agent}`, () => {
        expect(txt).toContain(`User-agent: ${agent}`);
      });
    });
  });

  describe("external links should use noopener noreferrer", () => {
    const dirs = ["src/ide", "src/demos", "src/vfs"];
    dirs.forEach((d) => {
      const full = resolve(__dirname, "..", d);
      const files = readdirSync(full)
        .filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"))
        .map((f) => join(full, f));
      files.forEach((file) => {
        it(`${file.split(/[\\/]/).slice(-2).join("/")} keeps external links secure`, () => {
          const content = readFileSync(file, "utf-8");
          const externalLinks = content.match(/target="_blank"/g) || [];
          const secureLinks = content.match(/rel="noopener noreferrer"/g) || [];
          expect(secureLinks.length).toBeGreaterThanOrEqual(externalLinks.length);
        });
      });
    });
  });

  describe("vite config", () => {
    const cfg = readFileSync(resolve(__dirname, "../vite.config.ts"), "utf-8");

    it("should drop console and debugger in production", () => {
      expect(cfg).toContain('drop: ["console", "debugger"]');
    });

    it("should disable source maps", () => {
      expect(cfg).toContain("sourcemap: false");
    });
  });
});
