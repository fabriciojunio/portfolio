import { describe, expect, it, vi } from "vitest";
import { runCommand } from "./registry";

const baseCtx = () => ({
  open: vi.fn(),
  setTerminal: vi.fn(),
  setPalette: vi.fn(),
  setRunPanel: vi.fn(),
  setQuickOpen: vi.fn(),
  getActivePath: () => "/projetos/goldata.py",
});

describe("terminal command registry", () => {
  it("ajuda lista os comandos", () => {
    const r = runCommand("ajuda", baseCtx());
    expect(r.lines.join("\n")).toContain("ls [pasta]");
    expect(r.lines.join("\n")).toContain("open <arquivo>");
  });

  it("clear devolve sentinela", () => {
    const r = runCommand("clear", baseCtx());
    expect(r.lines).toEqual(["__clear__"]);
  });

  it("ls / mostra os filhos do root", () => {
    const r = runCommand("ls", baseCtx());
    expect(r.lines.some((l) => l.includes("projetos"))).toBe(true);
  });

  it("cat sobre.md devolve o conteúdo do arquivo", () => {
    const r = runCommand("cat sobre.md", baseCtx());
    expect(r.lines.join("\n")).toContain("Fabrício Júnio");
  });

  it("open invoca o callback de abrir arquivo", () => {
    const ctx = baseCtx();
    const r = runCommand("open projetos/goldata.py", ctx);
    r.effect?.();
    expect(ctx.open).toHaveBeenCalledWith("/projetos/goldata.py");
  });

  it("run dispara o painel quando o arquivo é runnable", () => {
    const ctx = baseCtx();
    const r = runCommand("run", ctx);
    r.effect?.();
    expect(ctx.setRunPanel).toHaveBeenCalledWith(true);
  });

  it("comando desconhecido informa o usuário", () => {
    const r = runCommand("zzz", baseCtx());
    expect(r.lines[0]).toContain("não encontrado");
  });

  it("sudo é só piada", () => {
    const r = runCommand("sudo rm -rf /", baseCtx());
    expect(r.lines.join("\n")).toContain("sudoers");
  });

  it("git status devolve mensagem realista", () => {
    const r = runCommand("git status", baseCtx());
    expect(r.lines.join("\n")).toContain("On branch main");
  });
});
