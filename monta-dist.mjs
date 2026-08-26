/**
 * Junta as duas metades do site numa pasta só.
 *
 * O site principal é HTML estático gerado por Java, e o /lab é a aplicação
 * React que o Vite compila. Nenhum dos dois sabe do outro, e é aqui que eles
 * viram um diretório publicável:
 *
 *   dist/index.html      página em português, gerada por Java
 *   dist/en/, dist/es/   as outras duas, idem
 *   dist/site.css        folha do site gerado
 *   dist/lab/index.html  a IDE no navegador, saída do Vite
 *   dist/assets/         bundles do Vite, referenciados por caminho absoluto
 *
 * O Vite escreve o index.html dele na raiz do dist. Se ele ficasse ali, a
 * página em português seria sobrescrita pelo SPA, e o site inteiro voltaria a
 * depender de JavaScript para exibir texto.
 */
import { cp, mkdir, rename, rm, access } from "node:fs/promises";
import { join } from "node:path";

const DIST = "dist";
const GERADO = "gerado";

async function existe(caminho) {
  try {
    await access(caminho);
    return true;
  } catch {
    return false;
  }
}

if (!(await existe(join(GERADO, "index.html")))) {
  console.error(
    `\n  Falta ${GERADO}/index.html.\n` +
      `  Rode o gerador antes:  npm run gerar\n`,
  );
  process.exit(1);
}

// O SPA sai da raiz e vai para /lab antes de qualquer cópia, para não haver
// um instante em que os dois index.html disputem o mesmo caminho.
await mkdir(join(DIST, "lab"), { recursive: true });
if (await existe(join(DIST, "index.html"))) {
  await rm(join(DIST, "lab", "index.html"), { force: true });
  await rename(join(DIST, "index.html"), join(DIST, "lab", "index.html"));
}

await cp(GERADO, DIST, { recursive: true });

console.log("dist montado: site gerado na raiz, IDE em /lab");
