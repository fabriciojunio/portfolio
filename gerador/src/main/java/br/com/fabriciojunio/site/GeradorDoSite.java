package br.com.fabriciojunio.site;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

/**
 * Ponto de entrada: le o conteudo e escreve o site.
 *
 * <pre>
 *   java -jar gerador.jar conteudo/site.json gerado
 * </pre>
 *
 * <p>A saida e versionada no repositorio, e a Vercel so serve arquivo estatico.
 * A alternativa seria rodar isto no build da Vercel, que exigiria JVM no
 * ambiente de build dela; nao vale apostar o site nisso. O fluxo de CI confere
 * que o gerado bate com o gerador, entao editar o HTML na mao quebra o build em
 * vez de passar despercebido.
 */
public final class GeradorDoSite {

    private final Conteudo conteudo;
    private final Path destino;

    GeradorDoSite(Conteudo conteudo, Path destino) {
        this.conteudo = conteudo;
        this.destino = destino;
    }

    public static void main(String[] args) throws IOException {
        Path entrada = Path.of(args.length > 0 ? args[0] : "conteudo/site.json");
        Path saida = Path.of(args.length > 1 ? args[1] : "gerado");

        var gerador = new GeradorDoSite(Conteudo.ler(entrada), saida);
        var escritos = gerador.gerar();

        for (var arquivo : escritos) {
            System.out.println("  " + arquivo);
        }
        System.out.println(escritos.size() + " arquivos em " + saida.toAbsolutePath());
    }

    /**
     * Escreve tudo e devolve os caminhos, relativos ao destino, em ordem
     * estavel. A ordem importa porque o CI compara a lista.
     */
    List<String> gerar() throws IOException {
        limpar();
        Files.createDirectories(destino);

        var escritos = new ArrayList<String>();

        for (var idioma : Idioma.todos()) {
            String caminho = idioma.caminho() + "index.html";
            escrever(caminho, new Pagina(conteudo, idioma).render());
            escritos.add(caminho);
        }

        escrever("site.css", recurso("/site.css"));
        escritos.add("site.css");

        escrever("sitemap.xml", sitemap());
        escritos.add("sitemap.xml");

        return escritos;
    }

    /**
     * Apaga a saida anterior antes de escrever.
     *
     * <p>Sem isto, remover um idioma deixaria a pasta dele no repositorio para
     * sempre, servida e indexada, sem nada no codigo que a explique.
     */
    private void limpar() throws IOException {
        if (!Files.exists(destino)) {
            return;
        }
        try (var caminhos = Files.walk(destino)) {
            caminhos.sorted(java.util.Comparator.reverseOrder()).forEach(p -> {
                try {
                    Files.delete(p);
                } catch (IOException e) {
                    throw new UncheckedIOException(e);
                }
            });
        }
    }

    private void escrever(String caminhoRelativo, String conteudoDoArquivo) throws IOException {
        Path arquivo = destino.resolve(caminhoRelativo);
        Files.createDirectories(arquivo.getParent());
        // Quebra de linha sempre \n, mesmo no Windows. Sem isso o arquivo
        // gerado aqui difere do gerado no CI e a comparacao acusa mudanca que
        // nao existe.
        Files.writeString(arquivo, conteudoDoArquivo.replace("\r\n", "\n"),
                StandardCharsets.UTF_8);
    }

    private String recurso(String nome) throws IOException {
        try (var entrada = GeradorDoSite.class.getResourceAsStream(nome)) {
            if (entrada == null) {
                throw new IOException("recurso nao encontrado: " + nome);
            }
            return new String(entrada.readAllBytes(), StandardCharsets.UTF_8);
        }
    }

    /**
     * Sitemap com as tres versoes e o hreflang entre elas, que e o que faz o
     * buscador entender que sao a mesma pagina em idiomas diferentes em vez de
     * conteudo duplicado.
     */
    private String sitemap() {
        var xml = new StringBuilder();
        xml.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n")
                .append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"\n")
                .append("        xmlns:xhtml=\"http://www.w3.org/1999/xhtml\">\n");

        for (var idioma : Idioma.todos()) {
            xml.append("  <url>\n")
                    .append("    <loc>").append(Html.escapar(idioma.url(Pagina.BASE))).append("</loc>\n");
            for (var outro : Idioma.todos()) {
                xml.append("    <xhtml:link rel=\"alternate\" hreflang=\"")
                        .append(Html.escapar(outro.tagHtml()))
                        .append("\" href=\"").append(Html.escapar(outro.url(Pagina.BASE)))
                        .append("\"/>\n");
            }
            xml.append("    <changefreq>monthly</changefreq>\n")
                    .append("    <priority>").append(idioma == Idioma.PT ? "1.0" : "0.8")
                    .append("</priority>\n")
                    .append("  </url>\n");
        }

        xml.append("</urlset>\n");
        return xml.toString();
    }
}
