package br.com.fabriciojunio.site;

import java.util.List;

import static br.com.fabriciojunio.site.Html.atributo;
import static br.com.fabriciojunio.site.Html.escapar;
import static br.com.fabriciojunio.site.Html.linkExterno;

/**
 * Monta a pagina inteira de um idioma.
 *
 * <p>Sem motor de template de proposito. O site tem seis secoes e uma unica
 * pagina por idioma; um Thymeleaf ou Freemarker aqui adicionaria um arquivo de
 * template, uma sintaxe e uma dependencia para render menos verificacao do que
 * o proprio compilador ja da. Com texto em Java, um campo que deixa de existir
 * no registro quebra o build.
 *
 * <p>Regra que atravessa a classe inteira: todo texto vindo do conteudo passa
 * por {@link Html#escapar}. Nao existe caminho que concatene texto cru.
 */
final class Pagina {

    /** Onde o site vive. Usado no canonical, no hreflang e no Open Graph. */
    static final String BASE = "https://portfolio-a3qn.vercel.app";

    private final Conteudo conteudo;
    private final Idioma idioma;
    private final Conteudo.Textos t;

    Pagina(Conteudo conteudo, Idioma idioma) {
        this.conteudo = conteudo;
        this.idioma = idioma;
        this.t = conteudo.textosEm(idioma);
    }

    String render() {
        var html = new StringBuilder(64 * 1024);

        html.append("<!doctype html>\n")
                .append("<html lang=\"").append(escapar(idioma.tagHtml())).append("\">\n")
                .append(cabecalho())
                .append("<body>\n")
                .append(pularParaConteudo())
                .append(navegacao())
                .append("<main id=\"conteudo\">\n")
                .append(hero())
                .append(sobre())
                .append(trabalho())
                .append(stack())
                .append(contato())
                .append("</main>\n")
                .append(rodape())
                .append("</body>\n</html>\n");

        return html.toString();
    }

    // ------------------------------------------------------------------
    // cabecalho
    // ------------------------------------------------------------------

    private String cabecalho() {
        String raiz = idioma.raizRelativa();
        String titulo = "Fabrício Júnio — " + t.sobre().cargo();

        var head = new StringBuilder();
        head.append("<head>\n")
                .append("<meta charset=\"utf-8\">\n")
                .append("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n")
                .append("<title>").append(escapar(titulo)).append("</title>\n")
                .append("<meta name=\"description\"")
                .append(atributo("content", t.sobre().bio())).append(">\n")
                .append("<link rel=\"canonical\"")
                .append(atributo("href", idioma.url(BASE))).append(">\n");

        // hreflang em todos os sentidos, mais o x-default apontando para o
        // portugues. Sem o conjunto completo o buscador trata cada idioma como
        // pagina solta e pode servir a errada.
        for (var outro : Idioma.todos()) {
            head.append("<link rel=\"alternate\"")
                    .append(atributo("hreflang", outro.tagHtml()))
                    .append(atributo("href", outro.url(BASE))).append(">\n");
        }
        head.append("<link rel=\"alternate\" hreflang=\"x-default\"")
                .append(atributo("href", Idioma.PT.url(BASE))).append(">\n");

        head.append("<meta property=\"og:type\" content=\"profile\">\n")
                .append("<meta property=\"og:title\"").append(atributo("content", titulo)).append(">\n")
                .append("<meta property=\"og:description\"")
                .append(atributo("content", t.sobre().bio())).append(">\n")
                .append("<meta property=\"og:url\"")
                .append(atributo("content", idioma.url(BASE))).append(">\n")
                .append("<meta property=\"og:locale\"")
                .append(atributo("content", idioma.tagHtml().replace('-', '_'))).append(">\n")
                .append("<meta name=\"twitter:card\" content=\"summary\">\n");

        head.append("<link rel=\"icon\" type=\"image/svg+xml\"")
                .append(atributo("href", raiz + "favicon.svg")).append(">\n")
                .append("<link rel=\"stylesheet\"")
                .append(atributo("href", raiz + "site.css")).append(">\n")
                .append("</head>\n");

        return head.toString();
    }

    /**
     * Atalho para quem navega por teclado pular a barra e cair no conteudo.
     * Fica visualmente escondido ate receber foco.
     */
    private String pularParaConteudo() {
        String rotulo = switch (idioma) {
            case PT -> "Pular para o conteúdo";
            case EN -> "Skip to content";
            case ES -> "Saltar al contenido";
        };
        return "<a class=\"pular\" href=\"#conteudo\">" + escapar(rotulo) + "</a>\n";
    }

    // ------------------------------------------------------------------
    // navegacao
    // ------------------------------------------------------------------

    private String navegacao() {
        var nav = new StringBuilder();
        nav.append("<header class=\"topo\">\n<div class=\"envolucro barra\">\n")
                .append("<a class=\"marca\" href=\"#topo\"")
                .append(atributo("aria-label", t.nav().topo())).append(">fj.</a>\n")
                .append("<nav class=\"menu\"")
                .append(atributo("aria-label", t.nav().trabalho())).append(">\n");

        nav.append(itemDeMenu("#sobre", t.nav().sobre()))
                .append(itemDeMenu("#trabalho", t.nav().trabalho()))
                .append(itemDeMenu("#stack", t.nav().stack()))
                .append(itemDeMenu("#contato", t.nav().contato()));

        nav.append("</nav>\n").append(seletorDeIdioma()).append("</div>\n</header>\n");
        return nav.toString();
    }

    private String itemDeMenu(String href, String rotulo) {
        return "<a" + atributo("href", href) + ">" + escapar(rotulo) + "</a>\n";
    }

    /**
     * Seletor de idioma como links de verdade.
     *
     * <p>Sao ancoras, e nao botoes com JavaScript, por dois motivos: a politica
     * de seguranca do site proibe script inline, e link e o que permite abrir o
     * outro idioma em aba nova, copiar o endereco e ser seguido por um robo de
     * busca.
     */
    private String seletorDeIdioma() {
        var seletor = new StringBuilder();
        seletor.append("<nav class=\"idiomas\"")
                .append(atributo("aria-label", t.nav().trocarIdioma())).append(">\n");

        for (var outro : Idioma.todos()) {
            boolean atual = outro == idioma;
            seletor.append("<a")
                    .append(atributo("href", idioma.caminhoRelativoPara(outro)))
                    .append(atributo("hreflang", outro.tagHtml()))
                    .append(atributo("lang", outro.tagHtml()))
                    .append(atributo("title", outro.nome()))
                    .append(atributo("class", atual ? "idioma atual" : "idioma"))
                    .append(atual ? " aria-current=\"true\"" : "")
                    .append(">").append(escapar(outro.rotulo())).append("</a>\n");
        }

        seletor.append("</nav>\n");
        return seletor.toString();
    }

    // ------------------------------------------------------------------
    // secoes
    // ------------------------------------------------------------------

    private String hero() {
        var s = new StringBuilder();
        s.append("<section id=\"topo\" class=\"hero\">\n<div class=\"envolucro\">\n")
                .append("<div class=\"identidade\">\n")
                .append("<span class=\"avatar\" aria-hidden=\"true\">fj</span>\n")
                .append("<span class=\"cargo\">").append(escapar(t.sobre().cargo()))
                .append("<span class=\"selo\"><span class=\"ponto\" aria-hidden=\"true\"></span>")
                .append(escapar(t.hero().disponivel())).append("</span>")
                .append("<span class=\"cidade\">").append(escapar(t.sobre().cidade()))
                .append("</span></span>\n</div>\n")
                .append("<h1><span>Fabrício</span><span>Júnio</span></h1>\n")
                .append("<p class=\"bio\">").append(escapar(t.sobre().bio())).append("</p>\n")
                .append("<div class=\"acoes\">\n")
                .append("<a class=\"botao\" href=\"#trabalho\">")
                .append(escapar(t.hero().verTrabalho())).append(" <span aria-hidden=\"true\">&rarr;</span></a>\n")
                .append("<a class=\"botao vazado\" href=\"#contato\">")
                .append(escapar(t.hero().conversar())).append("</a>\n")
                .append("</div>\n</div>\n")
                .append(esteira())
                .append("</section>\n");
        return s.toString();
    }

    /** Faixa rolante com as tecnologias. Puramente decorativa, some do leitor de tela. */
    private String esteira() {
        var s = new StringBuilder("<div class=\"esteira\" aria-hidden=\"true\"><div class=\"trilho\">");
        for (int volta = 0; volta < 2; volta++) {
            for (var item : conteudo.empresas()) {
                s.append("<span>").append(escapar(item)).append("</span>");
            }
        }
        s.append("</div></div>\n");
        return s.toString();
    }

    private String sobre() {
        var s = new StringBuilder();
        s.append("<section id=\"sobre\" class=\"secao\">\n<div class=\"envolucro colunas\">\n")
                .append("<div>\n").append(rotuloDaSecao(t.sobre().secao()))
                .append(tituloDaSecao(t.sobre().titulo())).append("</div>\n")
                .append("<div class=\"texto\">\n");

        for (var paragrafo : t.sobre().longBio()) {
            s.append("<p>").append(escapar(paragrafo)).append("</p>\n");
        }

        s.append("<dl class=\"ficha\">\n")
                .append(itemDaFicha(t.sobre().rotuloCargo(), t.sobre().cargo()))
                .append(itemDaFicha(t.sobre().rotuloCidade(), t.sobre().cidade()))
                .append(itemDaFicha(t.sobre().rotuloFormacao(), t.sobre().formacaoValor()))
                .append("</dl>\n")
                .append("<p class=\"links\">")
                .append(linkExterno(conteudo.contato().github(), "github.com/fabriciojunio", "sublinhado"))
                .append(linkExterno(conteudo.contato().linkedin(), "LinkedIn", "sublinhado"))
                .append("</p>\n</div>\n</div>\n</section>\n");
        return s.toString();
    }

    private String itemDaFicha(String rotulo, String valor) {
        return "<div><dt>" + escapar(rotulo) + "</dt><dd>" + escapar(valor) + "</dd></div>\n";
    }

    private String trabalho() {
        var s = new StringBuilder();
        s.append("<section id=\"trabalho\" class=\"secao\">\n<div class=\"envolucro\">\n")
                .append("<div class=\"colunas cabecalho-secao\">\n<div>")
                .append(rotuloDaSecao(t.trabalho().secao()))
                .append(tituloDaSecao(t.trabalho().titulo()))
                .append("</div>\n<p class=\"chamada\">")
                .append(escapar(t.trabalho().chamada())).append("</p>\n</div>\n");

        s.append(blocoDeProjetos(t.trabalho().blocos().backend(), conteudo.blocos().backend()))
                .append(blocoDeProjetos(t.trabalho().blocos().produto(), conteudo.blocos().produto()))
                .append(blocoDeProjetos(t.trabalho().blocos().faculdade(), conteudo.blocos().faculdade()));

        // O acervo vem dentro de details: fechado por padrao, mas presente no
        // HTML, o que mantem tudo indexavel e acessivel sem JavaScript.
        s.append("<details class=\"acervo\">\n<summary>")
                .append(escapar(t.trabalho().acervo()))
                .append(" (").append(conteudo.blocos().acervo().size()).append(")</summary>\n")
                .append(listaDeProjetos(conteudo.blocos().acervo()))
                .append("</details>\n");

        s.append("</div>\n</section>\n");
        return s.toString();
    }

    private String blocoDeProjetos(Conteudo.TituloENota cabecalho, List<Conteudo.Projeto> itens) {
        if (itens.isEmpty()) {
            return "";
        }
        return "<div class=\"bloco\">\n<div class=\"cabecalho-bloco\">\n<h3>"
                + escapar(cabecalho.titulo()) + "</h3>\n<p>"
                + escapar(cabecalho.nota()) + "</p>\n</div>\n"
                + listaDeProjetos(itens) + "</div>\n";
    }

    private String listaDeProjetos(List<Conteudo.Projeto> itens) {
        var s = new StringBuilder("<ol class=\"projetos\">\n");
        for (var projeto : itens) {
            s.append(cartaoDoProjeto(projeto));
        }
        s.append("</ol>\n");
        return s.toString();
    }

    private String cartaoDoProjeto(Conteudo.Projeto projeto) {
        var texto = projeto.textoEm(idioma);
        var s = new StringBuilder();

        s.append("<li class=\"projeto\">\n<article>\n")
                .append("<div class=\"linha-projeto\">\n")
                .append("<h4>").append(escapar(projeto.name())).append("</h4>\n")
                .append("<span class=\"ano\">").append(escapar(projeto.year())).append("</span>\n")
                .append("</div>\n")
                .append("<p class=\"resumo\">").append(escapar(texto.oneLine())).append("</p>\n")
                .append("<p class=\"detalhe\">").append(escapar(texto.what())).append("</p>\n")
                .append("<p class=\"detalhe papel\">").append(escapar(texto.role())).append("</p>\n");

        if (!texto.highlights().isEmpty()) {
            s.append("<ul class=\"destaques\">\n");
            for (var destaque : texto.highlights()) {
                s.append("<li>").append(escapar(destaque)).append("</li>\n");
            }
            s.append("</ul>\n");
        }

        s.append("<ul class=\"stack\">\n");
        for (var item : projeto.stack()) {
            s.append("<li>").append(escapar(item)).append("</li>\n");
        }
        s.append("</ul>\n");

        // Repositorio privado nao vira link morto: simplesmente nao aparece.
        s.append("<p class=\"acoes-projeto\">");
        if (projeto.github() != null) {
            s.append(linkExterno(projeto.github(), "GitHub", "sublinhado"));
        }
        if (projeto.demo() != null) {
            s.append(linkExterno(projeto.demo(), "Demo", "sublinhado"));
        }
        if (projeto.labDemo() != null) {
            s.append("<a class=\"sublinhado\"")
                    .append(atributo("href", idioma.raizRelativa() + "lab?arquivo="
                            + java.net.URLEncoder.encode(projeto.labDemo(),
                            java.nio.charset.StandardCharsets.UTF_8) + "&amp;run=1"))
                    .append(">").append(escapar(t.trabalho().verDemo())).append("</a>");
        }
        s.append("</p>\n</article>\n</li>\n");

        return s.toString();
    }

    private String stack() {
        var s = new StringBuilder();
        s.append("<section id=\"stack\" class=\"secao\">\n<div class=\"envolucro colunas\">\n")
                .append("<div>").append(rotuloDaSecao(t.stack().secao()))
                .append(tituloDaSecao(t.stack().titulo()))
                .append("<p class=\"nota\">").append(escapar(t.stack().nota())).append("</p></div>\n")
                .append("<div class=\"grupos\">\n");

        for (var grupo : conteudo.stack()) {
            // O rotulo do grupo e traduzido; o nome das tecnologias nao.
            String rotulo = t.stack().grupos().getOrDefault(grupo.label(), grupo.label());
            s.append("<div class=\"grupo\">\n<h3>").append(escapar(rotulo)).append("</h3>\n<ul>\n");
            for (var item : grupo.items()) {
                s.append("<li>").append(escapar(item)).append("</li>\n");
            }
            s.append("</ul>\n</div>\n");
        }

        s.append("</div>\n</div>\n</section>\n");
        return s.toString();
    }

    private String contato() {
        var s = new StringBuilder();
        var titulo = t.contato().titulo();

        s.append("<section id=\"contato\" class=\"secao\">\n<div class=\"envolucro\">\n")
                .append(rotuloDaSecao(t.contato().secao()))
                .append("<h2 class=\"grande\">").append(escapar(titulo.get(0)))
                .append("<br><em>").append(escapar(titulo.get(1))).append("</em>")
                .append(escapar(titulo.get(2))).append("</h2>\n")
                .append("<p class=\"chamada\">").append(escapar(t.contato().chamada())).append("</p>\n")
                .append("<ul class=\"contatos\">\n")
                .append(linhaDeContato(t.contato().email(), conteudo.contato().email(),
                        "mailto:" + conteudo.contato().email(), false))
                .append(linhaDeContato("GitHub", "github.com/fabriciojunio",
                        conteudo.contato().github(), true))
                .append(linhaDeContato("LinkedIn", "in/fabriciojunio",
                        conteudo.contato().linkedin(), true))
                .append("</ul>\n</div>\n</section>\n");
        return s.toString();
    }

    private String linhaDeContato(String rotulo, String valor, String href, boolean externo) {
        String link = externo
                ? linkExterno(href, valor, null)
                : "<a" + atributo("href", href) + ">" + escapar(valor) + "</a>";
        return "<li><span class=\"rotulo\">" + escapar(rotulo) + "</span>" + link
                + "<span class=\"seta\" aria-hidden=\"true\">&rarr;</span></li>\n";
    }

    private String rodape() {
        String raiz = idioma.raizRelativa();
        return "<footer class=\"rodape\">\n<div class=\"envolucro barra\">\n"
                + "<span>&copy; 2026 Fabrício Júnio · Bauru, SP</span>\n"
                + "<span class=\"links-rodape\">"
                + "<a" + atributo("href", raiz + "lab") + atributo("title", t.rodape().labTitulo())
                + ">" + escapar(t.rodape().lab()) + "</a>"
                + linkExterno("https://github.com/fabriciojunio/portfolio", t.rodape().codigo(), null)
                + "</span>\n</div>\n</footer>\n";
    }

    // ------------------------------------------------------------------
    // pedacos repetidos
    // ------------------------------------------------------------------

    private String rotuloDaSecao(String texto) {
        return "<p class=\"rotulo-secao\">" + escapar(texto) + "</p>\n";
    }

    /**
     * O titulo vem em tres pedacos para que o do meio receba enfase sem que o
     * gerador precise interpretar marcacao dentro do texto traduzido. Marcacao
     * embutida em string de traducao e como um tradutor esquece a tag.
     */
    private String tituloDaSecao(List<String> partes) {
        return "<h2>" + escapar(partes.get(0))
                + "<em>" + escapar(partes.get(1)) + "</em>"
                + escapar(partes.get(2)) + "</h2>\n";
    }
}
