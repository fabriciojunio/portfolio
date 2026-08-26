package br.com.fabriciojunio.site;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

/**
 * O conteudo do site, lido de {@code conteudo/site.json}.
 *
 * <p>O JSON e gerado a partir do TypeScript onde o texto e escrito. Isso
 * mantem uma fonte so: o data.ts continua sendo o lugar onde eu penso, e o
 * gerador nao guarda copia de nada.
 *
 * <p>Os registros abaixo sao propositalmente rigidos. Campo que falta no JSON
 * vira nulo e explode na geracao, e nao numa pagina publicada com um buraco no
 * meio. A validacao em {@link #validar()} existe para que a falha aconteca no
 * build, com o nome do projeto na mensagem.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
record Conteudo(
        Blocos blocos,
        Map<String, Textos> textos,
        Contato contato,
        List<GrupoDaStack> stack,
        List<String> empresas) {

    @JsonIgnoreProperties(ignoreUnknown = true)
    record Blocos(
            List<Projeto> backend,
            List<Projeto> produto,
            List<Projeto> faculdade,
            List<Projeto> acervo) {

        List<Projeto> todos() {
            return java.util.stream.Stream
                    .of(backend, produto, faculdade, acervo)
                    .flatMap(List::stream)
                    .toList();
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record Projeto(
            String slug,
            String name,
            String year,
            String github,
            String demo,
            String labDemo,
            List<String> stack,
            String snippetLang,
            String snippet,
            Map<String, TextoDoProjeto> texto) {

        TextoDoProjeto textoEm(Idioma idioma) {
            var achado = texto.get(idioma.codigo());
            if (achado == null) {
                throw new IllegalStateException(
                        "projeto '" + slug + "' sem texto em " + idioma.codigo());
            }
            return achado;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record TextoDoProjeto(String oneLine, String what, String role, List<String> highlights) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record GrupoDaStack(String label, List<String> items) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record Contato(String email, String github, String linkedin) {
    }

    // ---- textos do site, por idioma ----

    @JsonIgnoreProperties(ignoreUnknown = true)
    record Textos(
            String htmlLang,
            Nav nav,
            Hero hero,
            Sobre sobre,
            Trabalho trabalho,
            Stack stack,
            ContatoTexto contato,
            Rodape rodape) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record Nav(String sobre, String trabalho, String stack, String contato,
               String menu, String fechar, String topo, String abrirMenu,
               String trocarIdioma) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record Hero(String disponivel, String verTrabalho, String conversar) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record Sobre(String secao, List<String> titulo, String cargo, String cidade,
                 String formacao, String formacaoValor,
                 String rotuloCargo, String rotuloCidade, String rotuloFormacao,
                 String bio, List<String> longBio) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record Trabalho(String secao, List<String> titulo, String chamada,
                    BlocosDeTexto blocos, String acervo, String verDemo, String fechar) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record BlocosDeTexto(TituloENota backend, TituloENota produto, TituloENota faculdade) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record TituloENota(String titulo, String nota) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record Stack(String secao, List<String> titulo, String nota, Map<String, String> grupos) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record ContatoTexto(String secao, List<String> titulo, String chamada, String email) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record Rodape(String lab, String labTitulo, String codigo) {
    }

    // ---- leitura ----

    static Conteudo ler(Path arquivo) throws IOException {
        var mapeador = new ObjectMapper()
                .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        var conteudo = mapeador.readValue(Files.readString(arquivo), Conteudo.class);
        conteudo.validar();
        return conteudo;
    }

    Textos textosEm(Idioma idioma) {
        var achado = textos.get(idioma.codigo());
        if (achado == null) {
            throw new IllegalStateException("sem textos do site em " + idioma.codigo());
        }
        return achado;
    }

    /**
     * Falha cedo, com o nome do que esta faltando.
     *
     * <p>Sem isto, um projeto sem traducao geraria uma pagina em ingles com o
     * card vazio, e ninguem repararia ate alguem de fora abrir o site.
     */
    void validar() {
        for (var idioma : Idioma.values()) {
            if (textos.get(idioma.codigo()) == null) {
                throw new IllegalStateException("faltam os textos do site em " + idioma.codigo());
            }
        }

        for (var projeto : blocos.todos()) {
            int destaquesEmPortugues = projeto.textoEm(Idioma.PT).highlights().size();

            for (var idioma : Idioma.values()) {
                var texto = projeto.texto().get(idioma.codigo());
                if (texto == null) {
                    throw new IllegalStateException(
                            "projeto '" + projeto.slug() + "' sem texto em " + idioma.codigo());
                }
                if (texto.oneLine() == null || texto.oneLine().isBlank()) {
                    throw new IllegalStateException(
                            "projeto '" + projeto.slug() + "' sem resumo em " + idioma.codigo());
                }
                if (texto.highlights().size() != destaquesEmPortugues) {
                    throw new IllegalStateException(
                            "projeto '" + projeto.slug() + "' tem "
                                    + texto.highlights().size() + " destaques em "
                                    + idioma.codigo() + " e " + destaquesEmPortugues
                                    + " em portugues");
                }
            }
        }
    }
}
