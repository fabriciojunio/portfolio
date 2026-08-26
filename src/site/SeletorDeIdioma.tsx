import { IDIOMAS } from "./i18n";
import { useIdioma, useTextos } from "./i18n";

/**
 * Troca de idioma: PT, EN, ES.
 *
 * Três botões visíveis em vez de um menu suspenso. São só três opções, e um
 * menu esconderia a informação que mais importa aqui, que é a de que o site
 * existe em outras línguas. Quem chega em inglês precisa ver isso sem clicar.
 *
 * Cada botão declara o próprio lang, para o leitor de tela pronunciar
 * "English" em inglês e "Español" em espanhol em vez de tentar em português.
 */
export default function SeletorDeIdioma({ compacto = false }: { compacto?: boolean }) {
  const { idioma, trocar } = useIdioma();
  const t = useTextos();

  return (
    <div
      role="group"
      aria-label={t.nav.trocarIdioma}
      className={`flex items-center ${compacto ? "gap-0.5" : "gap-1"}`}
    >
      {IDIOMAS.map(({ codigo, rotulo, nome }) => {
        const atual = codigo === idioma;
        return (
          <button
            key={codigo}
            type="button"
            lang={codigo}
            title={nome}
            aria-current={atual ? "true" : undefined}
            onClick={() => trocar(codigo)}
            className={`px-2 py-1 font-mono text-[10.5px] tracking-[1.2px] border transition-colors ${
              atual
                ? "text-[#ffffff] border-white/25"
                : "text-[#767676] border-transparent hover:text-[#ededed]"
            }`}
          >
            {rotulo}
          </button>
        );
      })}
    </div>
  );
}
