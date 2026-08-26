package br.com.fabriciojunio.site;

import java.util.Arrays;
import java.util.List;

/**
 * Os tres idiomas do site, e onde cada um mora.
 *
 * <p>Uma URL por idioma, e nao troca por JavaScript. A diferenca importa: um
 * buscador indexa {@code /en/} como pagina em ingles e mostra ela para quem
 * pesquisa em ingles, o que a troca no cliente nao consegue, porque para o
 * robo existe uma pagina so.
 *
 * <p>O portugues fica na raiz porque e o principal. Colocar o portugues em
 * {@code /pt/} e deixar a raiz redirecionando custaria um salto a mais para a
 * maioria dos visitantes.
 */
enum Idioma {

    PT("pt", "pt-BR", "", "Português"),
    EN("en", "en", "en/", "English"),
    ES("es", "es", "es/", "Español");

    private final String codigo;
    private final String tagHtml;
    private final String caminho;
    private final String nome;

    Idioma(String codigo, String tagHtml, String caminho, String nome) {
        this.codigo = codigo;
        this.tagHtml = tagHtml;
        this.caminho = caminho;
        this.nome = nome;
    }

    /** Chave usada no JSON de conteudo: pt, en, es. */
    String codigo() {
        return codigo;
    }

    /** Valor do atributo lang do documento. Portugues vai como pt-BR. */
    String tagHtml() {
        return tagHtml;
    }

    /** Prefixo do caminho, com barra final. Vazio para o portugues. */
    String caminho() {
        return caminho;
    }

    /** Nome do idioma no proprio idioma, para o seletor. */
    String nome() {
        return nome;
    }

    /** Rotulo curto do seletor: PT, EN, ES. */
    String rotulo() {
        return codigo.toUpperCase(java.util.Locale.ROOT);
    }

    /** URL absoluta desta versao da pagina. */
    String url(String base) {
        return base.endsWith("/") ? base + caminho : base + "/" + caminho;
    }

    /**
     * Caminho relativo daqui ate outro idioma.
     *
     * <p>Precisa ser relativo porque a pagina em {@code /en/} referencia a raiz
     * como {@code ../}, e a raiz referencia o ingles como {@code en/}. Errar
     * isso produz link que funciona num idioma e quebra no outro, que e o tipo
     * de coisa que so aparece quando alguem troca de idioma duas vezes.
     */
    String caminhoRelativoPara(Idioma destino) {
        String subir = this == PT ? "" : "../";
        String alvo = subir + destino.caminho();
        return alvo.isEmpty() ? "./" : alvo;
    }

    /** Raiz do site vista daqui, para CSS e imagens. */
    String raizRelativa() {
        return this == PT ? "" : "../";
    }

    static List<Idioma> todos() {
        return Arrays.asList(values());
    }
}
