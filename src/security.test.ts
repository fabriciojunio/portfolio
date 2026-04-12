import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

describe("security", () => {
  describe("vercel.json security headers", () => {
    const vercelConfig = JSON.parse(
      readFileSync(resolve(__dirname, "../vercel.json"), "utf-8")
    );
    const headers = vercelConfig.headers[0].headers;
    const getHeader = (key: string) =>
      headers.find((h: { key: string }) => h.key === key)?.value;

    it("should have Content-Security-Policy", () => {
      const csp = getHeader("Content-Security-Policy");
      expect(csp).toBeDefined();
      expect(csp).toContain("default-src 'self'");
      expect(csp).toContain("frame-ancestors 'none'");
    });

    it("should have Strict-Transport-Security with long max-age", () => {
      const hsts = getHeader("Strict-Transport-Security");
      expect(hsts).toBeDefined();
      expect(hsts).toContain("max-age=63072000");
      expect(hsts).toContain("includeSubDomains");
    });

    it("should have X-Content-Type-Options nosniff", () => {
      expect(getHeader("X-Content-Type-Options")).toBe("nosniff");
    });

    it("should have X-Frame-Options DENY", () => {
      expect(getHeader("X-Frame-Options")).toBe("DENY");
    });

    it("should have X-XSS-Protection enabled", () => {
      expect(getHeader("X-XSS-Protection")).toContain("1");
    });

    it("should have Referrer-Policy", () => {
      expect(getHeader("Referrer-Policy")).toBe(
        "strict-origin-when-cross-origin"
      );
    });

    it("should have Permissions-Policy blocking sensitive APIs", () => {
      const pp = getHeader("Permissions-Policy");
      expect(pp).toContain("camera=()");
      expect(pp).toContain("microphone=()");
      expect(pp).toContain("geolocation=()");
    });
  });

  describe("index.html security", () => {
    const html = readFileSync(
      resolve(__dirname, "../index.html"),
      "utf-8"
    );

    it("should have lang attribute set to pt-BR", () => {
      expect(html).toContain('lang="pt-BR"');
    });

    it("should have charset UTF-8", () => {
      expect(html).toContain('charset="UTF-8"');
    });

    it("should have viewport meta tag", () => {
      expect(html).toContain("viewport");
    });
  });

  describe("external links security", () => {
    const componentFiles = [
      "src/components/About.tsx",
      "src/components/Contact.tsx",
      "src/components/Hero.tsx",
      "src/components/ProjectDetail.tsx",
    ];

    componentFiles.forEach((file) => {
      it(`${file} should use rel="noopener noreferrer" on external links`, () => {
        const content = readFileSync(resolve(__dirname, "..", file), "utf-8");
        const externalLinks = content.match(/target="_blank"/g) || [];
        const secureLinks = content.match(/rel="noopener noreferrer"/g) || [];
        expect(secureLinks.length).toBe(externalLinks.length);
      });
    });
  });
});
