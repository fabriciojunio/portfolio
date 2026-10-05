export type Rota = "site" | "lab" | "resultados";

/**
 * Qual tela o endereço atual pede.
 *
 * `/resultados` aceita um projeto no fim do caminho, como `/resultados/lastro`,
 * para que o README de cada repositório possa linkar direto o seu. Quem decide
 * qual projeto abrir é a própria tela de resultados.
 *
 * Mora fora do App.tsx porque exportar função junto de componente derruba o
 * recarregamento rápido do Vite, e porque assim dá para testar sem montar nada.
 */
export function rotaDoEndereco(caminho: string): Rota {
  const limpo = caminho.replace(/\/+$/, "").toLowerCase();
  if (limpo === "/lab") return "lab";
  if (limpo === "/resultados" || limpo.startsWith("/resultados/")) return "resultados";
  return "site";
}
