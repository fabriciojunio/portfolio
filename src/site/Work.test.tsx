import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Work from "./Work";
import { IdiomaContext } from "./i18n";
import { PROJECTS } from "./data";

afterEach(cleanup);

describe("visualização dos projetos", () => {
  it("apresenta os destaques e mantém os complementares fechados", () => {
    render(<Work />);
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveTextContent("Almanaque");
    expect(buttons[1]).toHaveTextContent("Vitrine Bauru");
    expect(buttons[2]).toHaveTextContent("Feira do Comando");
    expect(screen.queryByRole("button", { name: /PermaneIA/ })).toBeNull();
  });
  it("expande e recolhe os trabalhos acadêmicos pelo teclado", async () => {
    const user = userEvent.setup();
    render(<Work />);
    const toggle = screen.getByRole("button", { name: /Outros projetos e trabalhos acadêmicos/ });
    toggle.focus();
    await user.keyboard("{Enter}");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: /PermaneIA/ })).toBeVisible();
    await user.keyboard(" ");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("button", { name: /PermaneIA/ })).toBeNull();
  });
  it("o Almanaque mostra roteiro, acesso e o arquivo certo, sem execução fictícia", async () => {
    const user = userEvent.setup();
    render(<Work />);
    const card = document.getElementById("work-almanaque")!;
    const scope = within(card);
    expect(scope.getByText(/A busca publicada usa o banco/)).not.toBeVisible();
    await user.click(scope.getByRole("button"));
    expect(scope.getByText(/A busca publicada usa o banco/)).toBeVisible();
    expect(scope.getByRole("link", { name: /abrir demonstração/ })).toHaveAttribute("href", "https://almanaque-ecru.vercel.app");
    expect(scope.getByRole("link", { name: /explorar código na IDE/ })).toHaveAttribute("href", "/lab?arquivo=%2Fprojetos%2Falmanaque.php");
    expect(scope.queryByRole("link", { name: /simulação/ })).toBeNull();
    expect(scope.getByText(/suporte@almanaque.com.br/)).toBeVisible();
    await user.click(scope.getByRole("button"));
    expect(scope.getByText(/A busca publicada usa o banco/)).not.toBeVisible();
  });
  it("a simulação do Cardiocam abre o algoritmo e declara seus limites", async () => {
    const user = userEvent.setup();
    render(<Work />);
    await user.click(screen.getByRole("button", { name: /Cardiocam/ }));
    const card = within(document.getElementById("work-cardiocam")!);
    expect(card.getByText(/não fornece diagnóstico/)).toBeVisible();
    expect(card.getByRole("link", { name: /Abrir simulação/ })).toHaveAttribute("href", "/lab?arquivo=%2Fprojetos%2Fcardiocam.py&run=1");
    expect(card.queryByRole("link", { name: /abrir demonstração/ })).toBeNull();
  });
  it.each(["en", "es"] as const)("traduz os controles e o escopo em %s", async idioma => {
    const user = userEvent.setup();
    render(<IdiomaContext.Provider value={{ idioma, trocar: () => {} }}><Work /></IdiomaContext.Provider>);
    const card = within(document.getElementById("work-koracrm")!);
    await user.click(card.getByRole("button"));
    expect(card.getByText(idioma === "en" ? /Laravel API is not deployed/ : /API Laravel no está publicada/)).toBeVisible();
    expect(card.getByRole("link", { name: idioma === "en" ? /open demo/ : /abrir demostración/ })).toHaveAttribute("href", PROJECTS.find(p => p.slug === "koracrm")!.demo);
  });
});
