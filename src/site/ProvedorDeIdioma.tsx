import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  CHAVE_ARMAZENAMENTO,
  DICIONARIO,
  IdiomaContext,
  idiomaInicial,
  type Idioma,
} from "./i18n";

/**
 * Guarda o idioma escolhido e o devolve para a árvore inteira.
 *
 * A escolha vai para o localStorage, então quem volta ao site não precisa
 * trocar de novo. Toda leitura e escrita fica dentro de try: navegador em
 * janela anônima, ou com dados de site bloqueados, lança só de encostar no
 * localStorage, e derrubar o site inteiro por causa de uma preferência de
 * idioma seria desproporcional.
 *
 * O atributo lang do documento acompanha a escolha. Não é detalhe: é o que
 * diz ao leitor de tela em que língua pronunciar, e ao navegador o que
 * oferecer para traduzir.
 */
export default function ProvedorDeIdioma({ children }: { children: ReactNode }) {
  const [idioma, setIdioma] = useState<Idioma>(idiomaInicial);

  const trocar = useCallback((novo: Idioma) => {
    setIdioma(novo);
    try {
      localStorage.setItem(CHAVE_ARMAZENAMENTO, novo);
    } catch {
      // Sem armazenamento: a escolha vale só nesta visita, que é melhor
      // do que não deixar trocar.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = DICIONARIO[idioma].htmlLang;
  }, [idioma]);

  const valor = useMemo(() => ({ idioma, trocar }), [idioma, trocar]);

  return <IdiomaContext.Provider value={valor}>{children}</IdiomaContext.Provider>;
}
