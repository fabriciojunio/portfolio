package br.com.fabriciojunio.site;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/**
 * Gera o site de verdade, a partir do conteudo de verdade, e verifica a saida.
 *
 * <p>O conteudo real e usado de proposito. Um exemplo inventado provaria que o
 * gerador funciona para o exemplo; o que interessa e que ele funcione para os
 * 26 projetos que existem, com acento, aspas e travessao no meio do texto.
 */
@DisplayName("Gerador do site")
class GeradorDoSiteTest {

    private static Conteudo conteudo;

    /** O conteudo fica na raiz do repositorio, um nivel acima do gerador. */
    private static Path arquivoDeConteudo() {
        return Path.of("..", "conteudo", "site.json");
    }

    @BeforeAll
    static void carregar() throws IOException {
        conteudo = Conteudo.ler(arquivoDeConteudo());
    }

    @Nested
    @DisplayName("Escape de HTML")
    class Escape {

        @Test
        @DisplayName("neutraliza os caracteres que quebram a marcacao")
        void escapaOsCincoCaracteres() {
            assertThat(Html.escapar("<script>alert(1)</script>"))
                    .isEqualTo("&lt;script&gt;alert(1)&lt;/script&gt;");
            assertThat(Html.escapar("a & b")).isEqualTo("a &amp; b");
            assertThat(Html.escapar("diz \"oi\"")).isEqualTo("diz &quot;oi&quot;");
            assertThat(Html.escapar("d'agua")).isEqualTo("d&#39;agua");
        }

        @Test
        @DisplayName("nao mexe em acento, que e a maior parte do texto")
        void preservaAcento() {
            assertThat(Html.escapar("Fabrício Júnio, integração"))
                    .isEqualTo("Fabrício Júnio, integração");
        }

        @Test
        @DisplayName("trata nulo como vazio em vez de escrever a palavra null")
        void nuloViraVazio() {
            assertThat(Html.escapar(null)).isEmpty();
            assertThat(Html.atributo("href", null)).isEmpty();
        }

        @Test
        @DisplayName("escapa o valor do atributo, fechando a saida por aspas")
        void escapaAtributo() {
            assertThat(Html.atributo("title", "a\" onload=\"x"))
                    .isEqualTo(" title=\"a&quot; onload=&quot;x\"");
        }

        /**
         * Toda janela aberta por target=_blank tem acesso a esta pagina pelo
         * window.opener se o noopener faltar.
         */
        @Test
        @DisplayName("todo link externo leva noopener e noreferrer")
        void linkExternoEProtegido() {
            assertThat(Html.linkExterno("https://exemplo.com", "Exemplo", null))
                    .contains("rel=\"noopener noreferrer\"")
                    .contains("target=\"_blank\"");
        }
    }

    @Nested
    @DisplayName("Validacao do conteudo")
    class Validacao {

        @Test
        @DisplayName("o conteudo real passa")
        void conteudoRealEValido() {
            assertThat(conteudo.blocos().todos()).hasSizeGreaterThanOrEqualTo(20);
        }

        @Test
        @DisplayName("todo projeto tem texto nos tres idiomas")
        void todoProjetoTemOsTresIdiomas() {
            for (var projeto : conteudo.blocos().todos()) {
                for (var idioma : Idioma.values()) {
                    assertThat(projeto.textoEm(idioma).oneLine())
                            .as("resumo de %s em %s", projeto.slug(), idioma.codigo())
                            .isNotBlank();
                }
            }
        }

        /**
         * Contagem diferente de destaques significa que uma traducao perdeu uma
         * linha. Na tela isso nao parece defeito: parece que o projeto tem
         * menos a dizer em ingles.
         */
        @Test
        @DisplayName("os destaques batem em quantidade entre os idiomas")
        void destaquesBatem() {
            for (var projeto : conteudo.blocos().todos()) {
                int esperado = projeto.textoEm(Idioma.PT).highlights().size();
                for (var idioma : Idioma.values()) {
                    assertThat(projeto.textoEm(idioma).highlights())
                            .as("destaques de %s em %s", projeto.slug(), idioma.codigo())
                            .hasSize(esperado);
                }
            }
        }

        @Test
        @DisplayName("nenhum slug repetido")
        void slugsUnicos() {
            var slugs = conteudo.blocos().todos().stream().map(Conteudo.Projeto::slug).toList();
            assertThat(slugs).doesNotHaveDuplicates();
        }

        @Test
        @DisplayName("todo github apontado e um endereco do GitHub")
        void githubEValido() {
            for (var projeto : conteudo.blocos().todos()) {
                if (projeto.github() != null) {
                    assertThat(projeto.github())
                            .as("github de %s", projeto.slug())
                            .startsWith("https://github.com/");
                }
            }
        }

        @Test
        @DisplayName("recusa conteudo sem um dos idiomas, dizendo qual projeto")
        void recusaTraducaoFaltando(@TempDir Path pasta) throws IOException {
            String json = Files.readString(arquivoDeConteudo());
            // Remove a chave do espanhol de um projeto e confere que a falha
            // aponta o culpado em vez de estourar um NullPointerException.
            String quebrado = json.replaceFirst("\"es\"\\s*:\\s*\\{", "\"xx\": {");
            Path arquivo = pasta.resolve("quebrado.json");
            Files.writeString(arquivo, quebrado);

            assertThatThrownBy(() -> Conteudo.ler(arquivo))
                    .isInstanceOf(IllegalStateException.class)
                    .hasMessageContaining("es");
        }
    }

    @Nested
    @DisplayName("Caminhos entre idiomas")
    class Caminhos {

        @Test
        @DisplayName("o portugues fica na raiz e os outros em subpasta")
        void caminhoDeCadaIdioma() {
            assertThat(Idioma.PT.caminho()).isEmpty();
            assertThat(Idioma.EN.caminho()).isEqualTo("en/");
            assertThat(Idioma.ES.caminho()).isEqualTo("es/");
        }

        /**
         * O link do seletor e relativo, entao subir um nivel a partir de /en/
         * tem que chegar na raiz. Errar aqui produz link que funciona num
         * idioma e quebra no outro.
         */
        @Test
        @DisplayName("de dentro de um idioma, o caminho de volta sobe um nivel")
        void caminhoRelativo() {
            assertThat(Idioma.PT.caminhoRelativoPara(Idioma.EN)).isEqualTo("en/");
            assertThat(Idioma.EN.caminhoRelativoPara(Idioma.PT)).isEqualTo("../");
            assertThat(Idioma.EN.caminhoRelativoPara(Idioma.ES)).isEqualTo("../es/");
            assertThat(Idioma.PT.caminhoRelativoPara(Idioma.PT)).isEqualTo("./");
        }

        @Test
        @DisplayName("a url absoluta nao duplica barra")
        void urlAbsoluta() {
            assertThat(Idioma.PT.url("https://x.dev")).isEqualTo("https://x.dev/");
            assertThat(Idioma.EN.url("https://x.dev")).isEqualTo("https://x.dev/en/");
        }
    }

    @Nested
    @DisplayName("Paginas geradas")
    class Paginas {

        @ParameterizedTest
        @EnumSource(Idioma.class)
        @DisplayName("cada idioma declara o proprio lang e o proprio canonical")
        void declaraIdioma(Idioma idioma) {
            String html = new Pagina(conteudo, idioma).render();

            assertThat(html).startsWith("<!doctype html>");
            assertThat(html).contains("<html lang=\"" + idioma.tagHtml() + "\">");
            assertThat(html).contains("<link rel=\"canonical\" href=\""
                    + idioma.url(Pagina.BASE) + "\">");
        }

        @ParameterizedTest
        @EnumSource(Idioma.class)
        @DisplayName("cada pagina aponta para as outras duas com hreflang")
        void hreflangCompleto(Idioma idioma) {
            String html = new Pagina(conteudo, idioma).render();

            for (var outro : Idioma.values()) {
                assertThat(html)
                        .as("hreflang de %s em %s", outro.codigo(), idioma.codigo())
                        .contains("hreflang=\"" + outro.tagHtml() + "\"");
            }
            assertThat(html).contains("hreflang=\"x-default\"");
        }

        /**
         * A politica de seguranca do site nao permite script inline. Um script
         * que escapasse para o HTML gerado nao apareceria em teste nenhum: a
         * pagina abre normalmente em desenvolvimento e so falha em producao,
         * silenciosamente, quando o navegador bloqueia.
         */
        @ParameterizedTest
        @EnumSource(Idioma.class)
        @DisplayName("nao emite script inline, que a CSP bloquearia")
        void semScriptInline(Idioma idioma) {
            String html = new Pagina(conteudo, idioma).render();

            assertThat(html).doesNotContain("<script");
            assertThat(html).doesNotContain(" onclick=");
            assertThat(html).doesNotContain(" onload=");
        }

        @ParameterizedTest
        @EnumSource(Idioma.class)
        @DisplayName("todo projeto aparece na pagina, no idioma certo")
        void todosOsProjetosAparecem(Idioma idioma) {
            String html = new Pagina(conteudo, idioma).render();

            for (var projeto : conteudo.blocos().todos()) {
                assertThat(html)
                        .as("nome de %s em %s", projeto.slug(), idioma.codigo())
                        .contains(Html.escapar(projeto.name()));
                assertThat(html)
                        .as("resumo de %s em %s", projeto.slug(), idioma.codigo())
                        .contains(Html.escapar(projeto.textoEm(idioma).oneLine()));
            }
        }

        @Test
        @DisplayName("a pagina em ingles nao carrega texto em portugues")
        void inglesNaoVazaPortugues() {
            String html = new Pagina(conteudo, Idioma.EN).render();

            // Frases do português que não têm por que aparecer em inglês. Nome
            // de projeto e de tecnologia continuam valendo, e por isso não
            // entram nesta lista.
            assertThat(html)
                    .doesNotContain("Desenvolvedor back-end")
                    .doesNotContain("Escrevi tudo")
                    .doesNotContain("Respondo em até");
        }

        @ParameterizedTest
        @EnumSource(Idioma.class)
        @DisplayName("todo link externo sai protegido")
        void linksExternosProtegidos(Idioma idioma) {
            String html = new Pagina(conteudo, idioma).render();

            int alvosEmBranco = contar(html, "target=\"_blank\"");
            int protegidos = contar(html, "rel=\"noopener noreferrer\"");

            assertThat(alvosEmBranco).isPositive();
            assertThat(protegidos).isEqualTo(alvosEmBranco);
        }

        @ParameterizedTest
        @EnumSource(Idioma.class)
        @DisplayName("a folha de estilo vem da propria origem, no caminho certo")
        void cssRelativo(Idioma idioma) {
            String html = new Pagina(conteudo, idioma).render();
            assertThat(html).contains("href=\"" + idioma.raizRelativa() + "site.css\"");
        }

        @Test
        @DisplayName("nao sobra marcador de template por preencher")
        void semMarcadorPendente() {
            for (var idioma : Idioma.values()) {
                String html = new Pagina(conteudo, idioma).render();
                assertThat(html).doesNotContain("{{").doesNotContain("null\"");
            }
        }

        private int contar(String texto, String agulha) {
            int total = 0;
            int i = texto.indexOf(agulha);
            while (i >= 0) {
                total++;
                i = texto.indexOf(agulha, i + agulha.length());
            }
            return total;
        }
    }

    @Nested
    @DisplayName("Escrita em disco")
    class Escrita {

        @Test
        @DisplayName("escreve uma pagina por idioma, mais css e sitemap")
        void escreveTudo(@TempDir Path destino) throws IOException {
            var escritos = new GeradorDoSite(conteudo, destino).gerar();

            assertThat(escritos).containsExactly(
                    "index.html", "en/index.html", "es/index.html", "site.css", "sitemap.xml");

            for (var caminho : escritos) {
                assertThat(destino.resolve(caminho)).isNotEmptyFile();
            }
        }

        /**
         * A saida e versionada e comparada no CI. Com CRLF no Windows e LF no
         * Linux, a comparacao acusaria mudanca em todo arquivo a cada build.
         */
        @Test
        @DisplayName("grava sempre com quebra de linha unix")
        void quebraDeLinhaUnix(@TempDir Path destino) throws IOException {
            new GeradorDoSite(conteudo, destino).gerar();

            String html = Files.readString(destino.resolve("index.html"));
            assertThat(html).doesNotContain("\r\n");
        }

        @Test
        @DisplayName("gerar duas vezes produz exatamente o mesmo resultado")
        void geracaoEDeterministica(@TempDir Path destino) throws IOException {
            new GeradorDoSite(conteudo, destino).gerar();
            String primeira = Files.readString(destino.resolve("index.html"));

            new GeradorDoSite(conteudo, destino).gerar();
            String segunda = Files.readString(destino.resolve("index.html"));

            assertThat(segunda).isEqualTo(primeira);
        }

        /**
         * Sem a limpeza, tirar um idioma deixaria a pasta dele publicada e
         * indexada para sempre, sem nada no codigo que a explicasse.
         */
        @Test
        @DisplayName("apaga o que sobrou da geracao anterior")
        void limpaAntesDeEscrever(@TempDir Path destino) throws IOException {
            Files.createDirectories(destino.resolve("fr"));
            Files.writeString(destino.resolve("fr/index.html"), "idioma removido");

            new GeradorDoSite(conteudo, destino).gerar();

            assertThat(destino.resolve("fr/index.html")).doesNotExist();
        }

        @Test
        @DisplayName("o sitemap lista os tres idiomas com hreflang cruzado")
        void sitemapCompleto(@TempDir Path destino) throws IOException {
            new GeradorDoSite(conteudo, destino).gerar();

            String xml = Files.readString(destino.resolve("sitemap.xml"));

            for (var idioma : Idioma.values()) {
                assertThat(xml).contains("<loc>" + idioma.url(Pagina.BASE) + "</loc>");
            }
            assertThat(xml).contains("xmlns:xhtml");
            assertThat(contarOcorrencias(xml, "<url>")).isEqualTo(3);
        }

        private int contarOcorrencias(String texto, String agulha) {
            return texto.split(java.util.regex.Pattern.quote(agulha), -1).length - 1;
        }
    }

    @Test
    @DisplayName("o css vai junto e traz a rampa de cinza")
    void cssAcompanha(@TempDir Path destino) throws IOException {
        new GeradorDoSite(conteudo, destino).gerar();

        String css = Files.readString(destino.resolve("site.css"));
        assertThat(css).contains("--bg: #0a0a0a").contains("prefers-reduced-motion");
    }

    /**
     * O JSON de conteudo tambem entra na comparacao do CI, e nao so o HTML.
     * Um carimbo de tempo dentro dele faria a comparacao acusar diferenca em
     * todo build sem nada ter mudado, e o time aprenderia a ignorar o job.
     */
    @Test
    @DisplayName("o conteudo exportado nao carrega carimbo de tempo")
    void conteudoSemCarimboDeTempo() throws IOException {
        String json = Files.readString(arquivoDeConteudo());
        assertThat(json).doesNotContain("geradoEm");
    }

    @Test
    @DisplayName("os tres idiomas estao declarados e sao unicos")
    void idiomasDeclarados() {
        List<Idioma> todos = Idioma.todos();
        assertThat(todos).hasSize(3).containsExactly(Idioma.PT, Idioma.EN, Idioma.ES);
        assertThat(todos.stream().map(Idioma::codigo).toList()).doesNotHaveDuplicates();
    }
}
