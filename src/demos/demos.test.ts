import { describe, expect, it } from "vitest";
import { cruzou, dentroDoSegmento, lado } from "./logica/contagemDeLinha";
import { estimarBpm, gerar, green, pos } from "./logica/rppg";
import { ULTIMO_QUADRO_NO_CHAO, simular } from "./logica/pulo";
import {
  IMPULSO,
  QUEDA_MAXIMA,
  simular as voar,
  toquesEspacados,
  velocidadesDepoisDeCadaToque,
} from "./logica/impulso";

// As demos rodam a mesma conta dos projetos de verdade, e não uma animação
// que finge o resultado. Estes testes existem para que continue assim: se
// alguém "simplificar" a matemática para o gráfico ficar bonito, quebra aqui.

describe("Contaflux — contagem por cruzamento de linha", () => {
  const vertical = { x1: 300, y1: 60, x2: 300, y2: 240 };

  it("o sinal do produto vetorial separa os dois lados", () => {
    expect(Math.sign(lado(vertical, 280, 150))).not.toBe(
      Math.sign(lado(vertical, 320, 150)),
    );
  });

  it("ponto em cima da linha dá zero", () => {
    expect(lado(vertical, 300, 150)).toBe(0);
  });

  it("a troca de sinal entre dois quadros é o que conta a travessia", () => {
    expect(cruzou(lado(vertical, 296, 150), lado(vertical, 304, 150))).toBe(true);
  });

  it("quem anda sem alcançar a linha não troca de sinal", () => {
    expect(cruzou(lado(vertical, 260, 150), lado(vertical, 290, 150))).toBe(false);
  });

  it("a linha é segmento: fora do trecho desenhado não conta", () => {
    expect(dentroDoSegmento(vertical, 300, 150)).toBe(true);
    // Muito acima do primeiro ponto: cruzaria o prolongamento da reta.
    expect(dentroDoSegmento(vertical, 300, -80)).toBe(false);
    expect(dentroDoSegmento(vertical, 300, 400)).toBe(false);
  });

  it("é assim que se conta uma pista só", () => {
    const soPistaDeCima = { x1: 300, y1: 74, x2: 300, y2: 150 };
    expect(dentroDoSegmento(soPistaDeCima, 300, 110)).toBe(true);
    expect(dentroDoSegmento(soPistaDeCima, 300, 200)).toBe(false);
  });
});

describe("Cardiocam — GREEN e POS", () => {
  it("com luz estável os dois acham o batimento", () => {
    const serie = gerar(72, 0.002, 0);
    expect(estimarBpm(green(serie)).bpm).toBeCloseTo(72, -0.5);
    expect(estimarBpm(pos(serie)).bpm).toBeCloseTo(72, -0.5);
  });

  it.each([54, 72, 96, 120])("acha %i bpm em cena limpa", (bpm) => {
    const serie = gerar(bpm, 0.001, 0);
    expect(Math.abs(estimarBpm(pos(serie)).bpm - bpm)).toBeLessThan(4);
  });

  it("com a luz oscilando na banda cardíaca, o POS ganha do GREEN", () => {
    // 4% de oscilação a 1,15 Hz, que é 69 bpm: bem dentro da banda e perto
    // do batimento real. É o caso que o canal verde sozinho não resolve.
    const serie = gerar(96, 0.002, 0.04);
    const erroGreen = Math.abs(estimarBpm(green(serie)).bpm - 96);
    const erroPos = Math.abs(estimarBpm(pos(serie)).bpm - 96);

    expect(erroPos).toBeLessThan(5);
    expect(erroGreen).toBeGreaterThan(erroPos);
  });

  it("a série gerada é reprodutível, senão o gráfico tremeria sozinho", () => {
    expect(gerar(72, 0.004, 0.02).g).toEqual(gerar(72, 0.004, 0.02).g);
  });
});

describe("Kaida — coyote time e buffer de pulo", () => {
  const COYOTE = 0.12;
  const BUFFER = 0.15;

  it("apoiado no chão, o pulo sai no mesmo quadro do comando", () => {
    const r = simular(10, COYOTE, BUFFER);
    expect(r.quadroDoPulo).toBe(10);
  });

  it("logo depois da borda o coyote ainda deixa pular", () => {
    const r = simular(ULTIMO_QUADRO_NO_CHAO + 3, COYOTE, BUFFER);
    expect(r.quadroDoPulo).toBe(ULTIMO_QUADRO_NO_CHAO + 3);
  });

  it("passado o coyote, o pulo se perde", () => {
    const r = simular(ULTIMO_QUADRO_NO_CHAO + 15, COYOTE, BUFFER);
    expect(r.quadroDoPulo).toBeNull();
  });

  it("sem coyote, o mesmo comando de três quadros tarde já falha", () => {
    const comPerdao = simular(ULTIMO_QUADRO_NO_CHAO + 3, COYOTE, BUFFER);
    const semPerdao = simular(ULTIMO_QUADRO_NO_CHAO + 3, 0, 0);

    expect(comPerdao.quadroDoPulo).not.toBeNull();
    expect(semPerdao.quadroDoPulo).toBeNull();
  });

  it("o motivo descreve o que aconteceu, e não um texto fixo", () => {
    expect(simular(5, COYOTE, BUFFER).motivo).toContain("chão");
    expect(simular(ULTIMO_QUADRO_NO_CHAO + 3, COYOTE, BUFFER).motivo).toContain(
      "coyote",
    );
    expect(simular(ULTIMO_QUADRO_NO_CHAO + 15, COYOTE, BUFFER).motivo).toContain(
      "perde",
    );
  });

  it("a linha do tempo cobre os quadros pedidos e marca onde acaba o chão", () => {
    const { linha } = simular(10, COYOTE, BUFFER);
    expect(linha[ULTIMO_QUADRO_NO_CHAO].noChao).toBe(true);
    expect(linha[ULTIMO_QUADRO_NO_CHAO + 1].noChao).toBe(false);
  });
});

describe("Bicudo — o impulso troca a velocidade, não soma", () => {
  const seguidos = [0, 6, 12, 18];

  it("trocando, toda batida devolve exatamente o mesmo impulso", () => {
    const vs = velocidadesDepoisDeCadaToque(seguidos, "troca");
    for (const v of vs) expect(v).toBeCloseTo(IMPULSO, 5);
  });

  it("somando, a velocidade cresce a cada batida", () => {
    const vs = velocidadesDepoisDeCadaToque(seguidos, "soma");
    for (let i = 1; i < vs.length; i++) expect(vs[i]).toBeGreaterThan(vs[i - 1]);
  });

  it("é isso que impede o jogo de virar quem aperta mais rápido", () => {
    const rajada = toquesEspacados(4, 6);
    expect(voar(rajada, "troca").saiuPeloTeto).toBe(false);
    expect(voar(rajada, "soma").saiuPeloTeto).toBe(true);
  });

  it("sem bater asa nenhuma, o pássaro cai e encosta no chão", () => {
    expect(voar([], "troca").quadroQueCaiu).not.toBeNull();
  });

  it("a queda tem teto, senão não dá tempo de reagir ao chão", () => {
    const { linha } = voar([], "troca");
    for (const q of linha) expect(q.velocidade).toBeGreaterThanOrEqual(-QUEDA_MAXIMA - 1e-9);
  });
});
