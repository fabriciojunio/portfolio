import { expect, test } from "@playwright/test";

test("segurança primeiro, destaques e expansão dos acadêmicos", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Engenheiro de Segurança · AppSec/);
  await expect(page.getByText("Engenheiro de Segurança · AppSec", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Disponível", { exact: true })).toBeVisible();
  await page.screenshot({ path: test.info().outputPath("inicio.png"), animations: "disabled" });
  await expect(page.getByRole("link", { name: /LinkedIn in\/fabríciojúnio/ })).toHaveAttribute("href", "https://www.linkedin.com/in/fabr%C3%ADcioj%C3%BAnio/");
  const seguranca = page.getByRole("heading", { level: 3, name: "Segurança de aplicações", exact: true });
  const destaques = page.getByRole("heading", { level: 3, name: "Destaques", exact: true });
  expect((await seguranca.boundingBox())!.y).toBeLessThan((await destaques.boundingBox())!.y);
  const brecha = page.locator("#work-brecha");
  await brecha.getByRole("button").first().click();
  await expect(brecha.getByText("segurança aplicada")).toBeVisible();
  await expect(brecha.getByRole("link", { name: /código no GitHub/ })).toHaveAttribute("href", "https://github.com/fabriciojunio/brecha");
  const vitrine = page.locator("#work-vitrine-bauru");
  await vitrine.getByRole("button").first().click();
  await expect(vitrine.getByText(/Secretaria Municipal de Desenvolvimento Econômico, Turismo e Inovação/)).toBeVisible();
  await expect(page.locator("#work-conectagente").getByRole("button").first()).toContainText("selecionado para a Saruê");
  await expect(page.locator("#work-permaneia")).toBeHidden();
  await page.getByRole("button", { name: /Outros projetos e trabalhos acadêmicos/ }).click();
  await expect(page.locator("#work-permaneia")).toBeVisible();
  const almanaque = page.locator("#work-almanaque");
  await almanaque.getByRole("button").first().click();
  await expect(almanaque.getByRole("link", { name: /explorar código na IDE/ })).toHaveAttribute("href", "/lab?arquivo=%2Fprojetos%2Falmanaque.php");
  const lastro = page.locator("#work-lastro");
  await lastro.getByRole("button").first().click();
  await expect(lastro.getByText(/permanecem privados até a defesa/)).toBeVisible();
  await expect(lastro.getByRole("link", { name: /código no GitHub/ })).toHaveCount(0);
  await page.getByRole("button", { name: /Outros projetos e trabalhos acadêmicos/ }).click();
  await expect(page.locator("#work-permaneia")).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
  await page.locator("#trabalho").scrollIntoViewIfNeeded();
  await page.screenshot({ path: test.info().outputPath("projetos.png"), animations: "disabled" });
});

test("o crivo abre em Go na IDE com o trecho real", async ({ page }) => {
  await page.goto("/lab?arquivo=%2Fprojetos%2Fcrivo.go");
  await expect(page.getByRole("status", { name: "Inicializando IDE" })).toBeHidden();
  await expect(page.getByText("crivo.go").first()).toBeVisible();
});

test("a IDE abre o projeto solicitado sem painel de execução indevido", async ({ page, isMobile }) => {
  const errors: string[] = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto("/lab?arquivo=%2Fprojetos%2Falmanaque.php&run=1");
  await expect(page.getByText("Almanaque", { exact: true })).toBeVisible();
  await expect(page.locator(".monaco-editor")).toBeVisible();
  await expect(page.getByRole("status", { name: "Inicializando IDE" })).toBeHidden();
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
  await page.screenshot({ path: test.info().outputPath("ide.png"), animations: "disabled" });
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

test("a pesquisa privada abre apenas a apresentação pública", async ({ page, isMobile }) => {
  await page.goto("/lab?arquivo=%2Fprojetos%2Flastro.md&run=1");
  await expect(page.getByRole("heading", { name: "Lastro: pesquisa em dependência financeira", exact: true })).toBeVisible();
  await expect(page.getByRole("article").getByText(/Código e artefatos privados até a defesa/)).toBeVisible();
  if (isMobile) await page.getByRole("button", { name: "Detalhes do projeto" }).click();
  await expect(page.getByText("Apresentação pública do projeto", { exact: true })).toBeVisible();
  await expect(page.getByText("código privado", { exact: true })).toBeVisible();
  await expect(page.getByRole("complementary", { name: "Painel de execução" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: /arquivo de origem|código no GitHub/ })).toHaveCount(0);
});

test("as rotas antigas não expõem estudos retirados", async ({ page }) => {
  await page.goto("/resultados/anteparo");
  await expect(page.getByRole("heading", { name: "Projetos e pesquisa" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Ver projetos/ })).toHaveAttribute("href", "/#trabalho");
  await expect(page.getByText(/IFRS|LGD/)).toHaveCount(0);
});

test("a árvore da IDE mostra segurança e destaques e permite expandir os demais", async ({ page, isMobile }) => {
  await page.goto("/lab?arquivo=%2Fprojetos%2Fbrecha.java");
  await expect(page.locator(".monaco-editor")).toBeVisible();
  await expect(page.getByText("clique, enter ou esc para pular")).toBeHidden();
  if (isMobile) await page.getByRole("button", { name: "Arquivos", exact: true }).click();
  const tree = page.getByRole("navigation", { name: "Estrutura de arquivos" });
  await expect(tree.getByRole("button", { name: "brecha.java", exact: true })).toBeVisible();
  await expect(tree.getByRole("button", { name: "crivo.go", exact: true })).toBeVisible();
  await expect(tree.getByRole("button", { name: "permaneia.ts", exact: true })).toBeHidden();
  await tree.getByText("Outros projetos (13)", { exact: true }).click();
  await tree.getByRole("button", { name: "permaneia.ts", exact: true }).click();
  await expect(page.getByText("PermaneIA", { exact: true })).toBeVisible();
  if (isMobile) await expect(tree).toBeHidden();
});
