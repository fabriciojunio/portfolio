"""
Cartao de link (Open Graph), 1200 x 630, gravado em public/og.png.

Por que existe: sem og:image, colar o endereco do portfolio no LinkedIn, no
WhatsApp ou no Slack gera um cartao sem imagem, e o cartao sem imagem ocupa uma
faixa fina de texto cinza. A diferenca nao e estetica: num perfil, o cartao e o
unico lugar onde o link aparece grande.

A imagem fica commitada. Isto aqui nao roda no build nem na integracao
continua, justamente para o site nao passar a depender de Python; e um gerador
de artefato, nao um passo de build.

    python scripts/gerar-cartao-og.py

Precisa de Pillow. Mesma linguagem visual da capa do LinkedIn em
carreira/gerar-capa.py: fundo quase preto, serifada no nome, monoespacada nos
rotulos, sem cor nenhuma.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

LARGURA, ALTURA = 1200, 630

FUNDO = (10, 10, 10)
BRANCO = (255, 255, 255)
TEXTO = (237, 237, 237)
FRACO = (154, 154, 154)
APAGADO = (118, 118, 118)
LINHA = (38, 38, 38)

FONTES = "C:/Windows/Fonts/"

SAIDA = Path(__file__).resolve().parent.parent / "public" / "og.png"


def fonte(arquivo, tamanho):
    return ImageFont.truetype(FONTES + arquivo, tamanho)


def escrever_espacado(desenho, xy, texto, fnt, cor, espaco):
    """O PIL nao tem espacamento entre letras, e e ele que da o ar de rotulo."""
    x, y = xy
    for c in texto:
        desenho.text((x, y), c, font=fnt, fill=cor)
        x += desenho.textlength(c, font=fnt) + espaco


def gerar(caminho: Path) -> None:
    img = Image.new("RGB", (LARGURA, ALTURA), FUNDO)
    d = ImageDraw.Draw(img)

    serif = fonte("georgia.ttf", 72)
    mono = fonte("consola.ttf", 22)
    mono_peq = fonte("consola.ttf", 19)

    esq = 90

    # Malha de pontos no canto, igual a da capa: a mesma pessoa nos dois lugares.
    for coluna in range(5):
        for linha in range(5):
            x = LARGURA - 190 + coluna * 22
            y = 70 + linha * 22
            d.ellipse([x, y, x + 3, y + 3], fill=(44, 44, 44))

    d.text((esq, 150), "Fabrício Júnio", font=serif, fill=BRANCO)
    escrever_espacado(d, (esq + 4, 252), "AI ENGINEER · IA EM PRODUÇÃO", mono, FRACO, 5)

    d.line([(esq, 310), (LARGURA - 90, 310)], fill=LINHA, width=1)

    # Tres linhas e nao oito: o cartao aparece pequeno na linha do tempo, e
    # quem le passa menos de um segundo nele.
    linhas = [
        "risco de crédito, IFRS 9 e provisão sob CPC 25",
        "validação de modelo, calibração e explicabilidade",
        "Python e Java em produção",
    ]
    y = 352
    for texto in linhas:
        d.text((esq, y), texto, font=mono_peq, fill=TEXTO)
        y += 36

    escrever_espacado(
        d, (esq, 520), "seis estudos com os números abertos", mono_peq, FRACO, 1
    )
    escrever_espacado(
        d, (esq, 556), "fabriciojunio.vercel.app/resultados", mono_peq, APAGADO, 1
    )

    caminho.parent.mkdir(parents=True, exist_ok=True)
    img.save(caminho, "PNG", optimize=True)
    print(f"{caminho}  {LARGURA}x{ALTURA}")


if __name__ == "__main__":
    gerar(SAIDA)
