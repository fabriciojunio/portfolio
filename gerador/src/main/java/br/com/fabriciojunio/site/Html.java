package br.com.fabriciojunio.site;

/**
 * Montagem de HTML com escape obrigatorio.
 *
 * <p>O conteudo do site e meu, mas isso nao dispensa o escape. O texto passa
 * por um JSON, e um projeto novo com aspas, {@code &} ou um sinal de menor no
 * meio da frase produziria HTML quebrado em silencio: a pagina abre, so que com
 * um pedaco faltando. Escapar sempre custa nada e tira a categoria inteira de
 * erro do caminho.
 *
 * <p>A politica de seguranca do site nao permite script inline
 * ({@code script-src 'self'}), entao esta classe nao oferece nenhuma forma de
 * escrever {@code <script>} com conteudo. E de proposito: se o gerador nao sabe
 * emitir script inline, ninguem adiciona um sem perceber que a pagina vai parar
 * de funcionar em producao.
 */
final class Html {

    private Html() {
    }

    /**
     * Escapa texto para ir dentro de um elemento ou de um atributo entre aspas
     * duplas.
     *
     * <p>Os cinco caracteres cobrem os dois contextos. A aspa simples entra
     * junto porque atributo com aspa simples e erro comum de quem edita HTML
     * gerado depois.
     */
    static String escapar(String texto) {
        if (texto == null) {
            return "";
        }
        var saida = new StringBuilder(texto.length() + 16);
        for (int i = 0; i < texto.length(); i++) {
            char c = texto.charAt(i);
            switch (c) {
                case '&' -> saida.append("&amp;");
                case '<' -> saida.append("&lt;");
                case '>' -> saida.append("&gt;");
                case '"' -> saida.append("&quot;");
                case '\'' -> saida.append("&#39;");
                default -> saida.append(c);
            }
        }
        return saida.toString();
    }

    /**
     * Um atributo, ja escapado. Devolve string vazia quando o valor e nulo, o
     * que evita {@code href="null"} espalhado pela pagina.
     */
    static String atributo(String nome, String valor) {
        if (valor == null || valor.isBlank()) {
            return "";
        }
        return " " + nome + "=\"" + escapar(valor) + "\"";
    }

    /**
     * Link externo.
     *
     * <p>Todo link para fora leva {@code rel="noopener noreferrer"}. O
     * {@code noopener} impede que a pagina aberta mexa nesta pelo
     * {@code window.opener}, e o {@code noreferrer} evita vazar de onde a
     * pessoa veio. Concentrar isso aqui e o que garante que nenhum link novo
     * escape da regra.
     */
    static String linkExterno(String href, String texto, String classe) {
        return "<a" + atributo("href", href)
                + " target=\"_blank\" rel=\"noopener noreferrer\""
                + atributo("class", classe)
                + ">" + escapar(texto) + "</a>";
    }
}
