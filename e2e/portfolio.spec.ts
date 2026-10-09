import { expect, test } from "@playwright/test";

test("destaques, roteiro e expansão dos acadêmicos", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Analista de Sistemas/);
  await expect(page.getByText("Analista de Sistemas", { exact: true }).first()).toBeVisible();
  const first = page.locator("#work-almanaque");
  await first.getByRole("button").click();
  await expect(first.getByText(/A busca publicada usa o banco/)).toBeVisible();
  await expect(first.getByRole("link", { name: /explorar código na IDE/ })).toHaveAttribute("href", "/lab?arquivo=%2Fprojetos%2Falmanaque.php");
  await expect(page.locator("#work-cardiocam")).toBeHidden();
  await page.getByRole("button", { name: /Outros projetos e trabalhos acadêmicos/ }).click();
  await page.locator("#work-cardiocam").getByRole("button").click();
  await expect(page.locator("#work-cardiocam").getByText(/sinais sintéticos/)).toBeVisible();
  await expect(page.locator("#work-cardiocam").getByRole("link", { name: /Abrir simulação/ })).toHaveAttribute("href", "/lab?arquivo=%2Fprojetos%2Fcardiocam.py&run=1");
  await page.getByRole("button", { name: /Outros projetos e trabalhos acadêmicos/ }).click();
  await expect(page.locator("#work-cardiocam")).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test("a IDE abre o projeto solicitado sem painel de execução indevido", async ({ page, isMobile }) => {
  const errors: string[] = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto("/lab?arquivo=%2Fprojetos%2Falmanaque.php&run=1");
  await expect(page.getByText("Almanaque", { exact: true })).toBeVisible();
  await expect(page.locator(".monaco-editor")).toBeVisible();
  await expect(page.getByRole("complementary", { name: "Painel de execução" })).toHaveCount(0);
  await expect(page.getByRole("dialog", { name: "Bem-vindo" })).toHaveCount(0);
  if (isMobile) {
    const details = page.getByRole("button", { name: "Detalhes do projeto" });
    await expect(details).toHaveAttribute("aria-expanded", "false");
    await details.click();
    await expect(page.getByText(/A busca publicada usa o banco/)).toBeVisible();
    await page.getByRole("button", { name: "Recolher detalhes" }).click();
    await expect(page.getByText(/A busca publicada usa o banco/)).toBeHidden();
  }
  expect(errors).toEqual([]);
});

test("a simulação executa e responde às entradas", async ({ page }) => {
  await page.goto("/lab?arquivo=%2Fprojetos%2Fpermaneia.ts&run=1");
  const panel = page.getByRole("complementary", { name: "Painel de execução" });
  await expect(panel).toBeVisible();
  await panel.getByRole("button", { name: "Trajetória saudável" }).click();
  await expect(panel.getByText(/· risco baixo$/)).toBeVisible();
  await panel.getByRole("button", { name: "Abandono em curso" }).click();
  await expect(panel.getByText(/· risco crítico$/)).toBeVisible();
  await page.getByRole("button", { name: "Fechar painel run" }).click();
  await expect(panel).toHaveCount(0);
});

test("as rotas antigas não expõem estudos retirados", async ({ page }) => {
  await page.goto("/resultados/anteparo");
  await expect(page.getByRole("heading", { name: "Projetos e pesquisa" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Ver projetos/ })).toHaveAttribute("href", "/#trabalho");
  await expect(page.getByText(/IFRS|LGD|Lastro/)).toHaveCount(0);
});

test("a árvore da IDE prioriza os destaques e permite expandir os demais", async ({ page, isMobile }) => {
  await page.goto("/lab?arquivo=%2Fprojetos%2Falmanaque.php");
  await expect(page.locator(".monaco-editor")).toBeVisible();
  await expect(page.getByText("clique, enter ou esc para pular")).toBeHidden();
  if (isMobile) await page.getByRole("button", { name: "Arquivos", exact: true }).click();
  const tree = page.getByRole("navigation", { name: "Estrutura de arquivos" });
  await expect(tree.getByRole("button", { name: "cardiocam.py", exact: true })).toBeHidden();
  await tree.getByText("Outros projetos (10)", { exact: true }).click();
  await tree.getByRole("button", { name: "cardiocam.py", exact: true }).click();
  await expect(page.getByText("Cardiocam", { exact: true })).toBeVisible();
  if (isMobile) await expect(tree).toBeHidden();
});
