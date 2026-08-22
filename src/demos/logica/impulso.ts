// A regra central do voo do Bicudo, do snippet em projetos/bicudo.cs.
//
// No Flappy Bird o impulso TROCA a velocidade vertical por um valor fixo. Ele
// não soma. É uma linha de diferença no código e é o que decide se o jogo é
// sobre ritmo ou sobre martelar o botão: somando, dois toques seguidos mandam
// o pássaro para fora da tela e a única estratégia vira apertar mais rápido.

export const FPS = 60;
export const QUADROS = 96;

// Valores do Passaro.cs do projeto.
export const IMPULSO = 6.2; // unidades por segundo
export const GRAVIDADE = 18; // unidades por segundo ao quadrado
export const QUEDA_MAXIMA = 10; // teto da velocidade de queda

export const ALTURA_INICIAL = 1;
export const TETO = 7; // meia altura que a câmera enxerga
export const CHAO = -5.1;

export type Modo = "troca" | "soma";

export interface QuadroDoVoo {
  quadro: number;
  altura: number;
  velocidade: number;
  bateuAsa: boolean;
}

export interface Voo {
  linha: QuadroDoVoo[];
  alturaMaxima: number;
  saiuPeloTeto: boolean;
  quadroQueCaiu: number | null;
}

/**
 * Roda o voo quadro a quadro, na mesma ordem do jogo: o toque mexe na
 * velocidade, a gravidade puxa, e só então o pássaro se move.
 *
 * `quadrosComToque` são os quadros em que o jogador bateu a asa.
 */
export function simular(quadrosComToque: number[], modo: Modo): Voo {
  const dt = 1 / FPS;
  const toques = new Set(quadrosComToque);

  let altura = ALTURA_INICIAL;
  let velocidade = 0;
  let alturaMaxima = altura;
  let saiuPeloTeto = false;
  let quadroQueCaiu: number | null = null;

  const linha: QuadroDoVoo[] = [];

  for (let q = 0; q < QUADROS; q++) {
    const bateuAsa = toques.has(q);

    if (bateuAsa) {
      // A linha inteira da diferença mora aqui.
      velocidade = modo === "troca" ? IMPULSO : velocidade + IMPULSO;
    }

    velocidade -= GRAVIDADE * dt;
    velocidade = Math.max(velocidade, -QUEDA_MAXIMA);
    altura += velocidade * dt;

    if (altura > alturaMaxima) alturaMaxima = altura;
    if (altura > TETO) saiuPeloTeto = true;
    if (quadroQueCaiu === null && altura <= CHAO) quadroQueCaiu = q;

    linha.push({ quadro: q, altura, velocidade, bateuAsa });
  }

  return { linha, alturaMaxima, saiuPeloTeto, quadroQueCaiu };
}

/**
 * A velocidade logo depois de cada batida de asa.
 *
 * Trocando, a lista é toda igual ao impulso, venha o pássaro subindo ou
 * despencando. Somando, ela cresce.
 */
export function velocidadesDepoisDeCadaToque(
  quadrosComToque: number[],
  modo: Modo,
): number[] {
  const { linha } = simular(quadrosComToque, modo);
  const dt = 1 / FPS;

  // A linha guarda a velocidade já depois da gravidade daquele quadro; somar
  // de volta devolve o valor no instante da batida.
  return linha
    .filter((q) => q.bateuAsa)
    .map((q) => q.velocidade + GRAVIDADE * dt);
}

/** Toques igualmente espaçados, do primeiro quadro em diante. */
export function toquesEspacados(intervalo: number, quantos: number): number[] {
  return Array.from({ length: quantos }, (_, i) => i * intervalo);
}
