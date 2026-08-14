import { filesByPath } from "../vfs";

export interface Abertura {
  caminho: string;
  rodar: boolean;
}

/**
 * Lê o que a URL da IDE está pedindo para abrir.
 *
 * O formato é `/lab?arquivo=/projetos/contaflux.py&run=1`, gerado pelo botão
 * "Rodar a demo interativa" da vitrine. Devolve null quando não há pedido ou
 * quando o caminho não existe: URL inventada não deve abrir aba nenhuma, e
 * `run=1` num arquivo sem demo não deve abrir um painel vazio.
 */
export function aberturaPedida(busca: string): Abertura | null {
  const parametros = new URLSearchParams(busca);
  const caminho = parametros.get("arquivo");
  if (!caminho) return null;

  const arquivo = filesByPath.get(caminho);
  if (!arquivo) return null;

  return {
    caminho,
    rodar: parametros.get("run") === "1" && Boolean(arquivo.runnable),
  };
}
