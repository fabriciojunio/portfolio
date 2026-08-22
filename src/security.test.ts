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
      // Não existe um único <form> no site, então nem o próprio destino
      // precisa ser permitido: 'none' fecha o vetor de exfiltração por
      // formulário injetado.
      expect(csp).toContain("form-action 'none'");
    });

    it("should allow workers from self and blob (Monaco needs blob workers)", () => {
      const csp = getHeader("Content-Security-Policy");
      expect(csp).toContain("worker-src 'self' blob:");
    });

    it("keeps child-src in step with worker-src", () => {
      // child-src é o que navegadores de CSP nível 2 consultam para worker.
      // Deixá-lo em 'none' derrubaria o editor só nesses navegadores, que é
      // o tipo de quebra que ninguém reproduz.
      const csp = getHeader("Content-Security-Policy");
      expect(csp).toContain("child-src 'self' blob:");
    });

    it("keeps data: in font-src, because subfontes pequenas são embutidas", () => {
      // O build embute as subfontes menores como data: URI. Fechar font-src
      // em 'self' passa no teste de cabeçalho e quebra a tipografia no ar.
      const csp = getHeader("Content-Security-Policy");
      expect(csp).toContain("font-src 'self' data:");
    });

    it("blocks what the site never uses", () => {
      const csp = getHeader("Content-Security-Policy");
      expect(csp).toContain("media-src 'none'");
      expect(csp).toContain("manifest-src 'self'");
      expect(csp).toContain("upgrade-insecure-requests");
    });

    it("should block plugins and nested framing (object-src/frame-src none)", () => {
      const csp = getHeader("Content-Security-Policy");
      expect(csp).toContain("object-src 'none'");
      expect(csp).toContain("frame-src 'none'");
    });

    it("should disable the legacy XSS auditor (X-XSS-Protection 0)", () => {
      expect(getHeader("X-XSS-Protection")).toBe("0");
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

  describe("cross-origin isolation headers", () => {
    const vercelConfig = JSON.parse(
      readFileSync(resolve(__dirname, "../vercel.json"), "utf-8"),
    );
    const headers = vercelConfig.headers[0].headers;
    const getHeader = (key: string) =>
      headers.find((h: { key: string }) => h.key === key)?.value;

    it("isolates the browsing context (COOP)", () => {
      expect(getHeader("Cross-Origin-Opener-Policy")).toBe("same-origin");
    });

    it("refuses to be embedded as a resource by other origins (CORP)", () => {
      expect(getHeader("Cross-Origin-Resource-Policy")).toBe("same-origin");
    });

    it("declares an embedder policy", () => {
      // credentialless, e não require-corp: o site não carrega nada de outra
      // origem, então os dois se comportam igual aqui, e credentialless não
      // quebra caso um dia entre um recurso externo sem CORP.
      expect(getHeader("Cross-Origin-Embedder-Policy")).toBe("credentialless");
    });

    it("asks for its own agent cluster", () => {
      expect(getHeader("Origin-Agent-Cluster")).toBe("?1");
    });

    it("blocks legacy Flash and PDF cross-domain policies", () => {
      expect(getHeader("X-Permitted-Cross-Domain-Policies")).toBe("none");
    });

    it("does not prefetch DNS of outbound links", () => {
      // Prefetch resolve o domínio de todo link da página antes do clique, o
      // que entrega ao resolvedor de DNS uma lista do que o visitante nem
      // abriu.
      expect(getHeader("X-DNS-Prefetch-Control")).toBe("off");
    });

    it("locks down every browser feature the site does not use", () => {
      const pp = getHeader("Permissions-Policy") as string;
      const fechados = [
        "camera", "microphone", "geolocation", "payment", "usb", "serial",
        "bluetooth", "hid", "midi", "accelerometer", "gyroscope",
        "magnetometer", "display-capture", "idle-detection",
        "browsing-topics", "interest-cohort", "local-fonts",
        "publickey-credentials-get", "screen-wake-lock", "xr-spatial-tracking",
      ];
      for (const f of fechados) expect(pp).toContain(`${f}=()`);
    });
  });

  describe("cache headers", () => {
    const vercelConfig = JSON.parse(
      readFileSync(resolve(__dirname, "../vercel.json"), "utf-8"),
    );
    const regra = (fonte: string) =>
      vercelConfig.headers.find((h: { source: string }) => h.source === fonte);

    it("marks hashed assets as immutable", () => {
      const v = regra("/assets/(.*)").headers[0].value;
      expect(v).toContain("immutable");
      expect(v).toContain("max-age=31536000");
    });

    it("revalidates the HTML, so a new CSP takes effect on the next visit", () => {
      const v = regra("/").headers[0].value;
      expect(v).toContain("must-revalidate");
      expect(v).toContain("max-age=0");
    });
  });

  describe(".well-known/security.txt (RFC 9116)", () => {
    const txt = readFileSync(
      resolve(__dirname, "../public/.well-known/security.txt"),
      "utf-8",
    );

    it("has the two fields the RFC requires", () => {
      expect(txt).toMatch(/^Contact:\s*mailto:.+$/m);
      expect(txt).toMatch(/^Expires:\s*.+$/m);
    });

    it("has not expired", () => {
      // Um security.txt vencido é inválido pela RFC, e some do radar de quem
      // procura para onde reportar.
      const linha = txt.match(/^Expires:\s*(.+)$/m);
      const quando = new Date(linha![1].trim());
      expect(quando.getTime()).toBeGreaterThan(Date.now());
    });

    it("points at the policy and declares the canonical address", () => {
      expect(txt).toMatch(/^Policy:\s*https:\/\//m);
      expect(txt).toMatch(/^Canonical:\s*https:\/\//m);
    });
  });

  describe("no dangerous sinks in the source", () => {
    const raizes = ["src/site", "src/ide", "src/demos", "src/vfs", "src/lab", "src/commands"];
    const proibidos: Array<[string, RegExp]> = [
      ["dangerouslySetInnerHTML", /dangerouslySetInnerHTML/],
      ["innerHTML =", /\.innerHTML\s*=/],
      ["eval(", /(?:^|[^.\w])eval\s*\(/],
      ["new Function(", /new\s+Function\s*\(/],
      ["document.write(", /document\.write\s*\(/],
    ];

    // Teste do teste. Um dos padrões daqui já foi escrito errado e passou
    // verde: um \b dentro de string virou caractere de backspace, e a busca
    // por eval nunca casava com nada. Padrão que não pega o caso óbvio não
    // está protegendo coisa alguma.
    it("the patterns actually catch what they are looking for", () => {
      const iscas = [
        'const a = <div dangerouslySetInnerHTML={{ __html: x }} />',
        "el.innerHTML = perigo;",
        "const r = eval(entradaDoUsuario);",
        "const f = new Function('return 1');",
        'document.write("<b>oi</b>");',
      ];
      proibidos.forEach(([nome, padrao], i) => {
        expect(iscas[i], `padrão ${nome} não pegou a isca`).toMatch(padrao);
      });
    });

    raizes.forEach((d) => {
      const full = resolve(__dirname, "..", d);
      const files = readdirSync(full)
        .filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"))
        .map((f) => join(full, f));

      files.forEach((file) => {
        it(`${file.split(/[\\/]/).slice(-2).join("/")} has no HTML or code injection sink`, () => {
          const content = readFileSync(file, "utf-8");
          for (const [nome, padrao] of proibidos)
            expect(content, `usa ${nome}`).not.toMatch(padrao);
        });
      });
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
      expect(html).toContain("#0a0a0a");
    });
  });

  describe("robots.txt should block AI crawlers", () => {
    const txt = readFileSync(
      resolve(__dirname, "../public/robots.txt"),
      "utf-8",
    );
    const blocked = [
      "GPTBot",
      "ChatGPT-User",
      "OAI-SearchBot",
      "Google-Extended",
      "CCBot",
      "anthropic-ai",
      "ClaudeBot",
      "PerplexityBot",
      "Applebot-Extended",
      "Bytespider",
      "Amazonbot",
      "Meta-ExternalAgent",
      "cohere-ai",
      "AI2Bot",
    ];

    it("has no byte order mark, which some parsers choke on", () => {
      expect(txt.charCodeAt(0)).not.toBe(0xfeff);
    });

    it("still lets search engines in and points at the sitemap", () => {
      expect(txt).toMatch(/^User-agent: \*$/m);
      expect(txt).toMatch(/^Sitemap: https:\/\//m);
    });
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
