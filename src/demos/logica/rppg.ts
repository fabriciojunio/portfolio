// Caminho de sinais do Cardiocam, reduzido ao que cabe no browser.
// Gera uma série RGB como a que sai da média espacial do rosto, aplica
// GREEN e POS (a projeção do snippet em projetos/cardiocam.py) e lê a
// frequência no pico do espectro.

export const FPS = 30;
export const SEGUNDOS = 10;
export const N = FPS * SEGUNDOS;

export const BPM_MIN = 42;
export const BPM_MAX = 240;

// Linhas da projeção no plano ortogonal à direção do tom de pele.
const PROJECAO = [
  [0, 1, -1],
  [-2, 1, 1],
];

export interface Serie {
  r: number[];
  g: number[];
  b: number[];
}

function media(v: number[]): number {
  return v.reduce((a, b) => a + b, 0) / v.length;
}

function desvio(v: number[]): number {
  const m = media(v);
  return Math.sqrt(media(v.map((x) => (x - m) ** 2)));
}

/** Ruído pseudoaleatório reprodutível: o mesmo ajuste dá o mesmo gráfico. */
function ruido(semente: number): () => number {
  let s = semente;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296 - 0.5;
  };
}

function normalizar(v: number[]): number[] {
  const m = media(v);
  const d = desvio(v);
  if (d < 1e-12) return v.map(() => 0);
  return v.map((x) => (x - m) / d);
}

/**
 * Série RGB sintética com pulso, ruído de sensor e luz do ambiente variando.
 *
 * O pulso vale cerca de 1% da intensidade e aparece bem mais no verde, que é
 * onde a hemoglobina absorve. É por isso que o canal verde sozinho já funciona
 * em cena parada, e é também por isso que ele não sobrevive à luz oscilando: a
 * variação de iluminação mexe nos três canais de uma vez.
 */
export function gerar(bpm: number, nivelRuido: number, oscilacao: number): Serie {
  const rnd = ruido(20260814);
  const r: number[] = [];
  const g: number[] = [];
  const b: number[] = [];
  const amplitude = 0.01;

  for (let i = 0; i < N; i++) {
    const t = i / FPS;
    const pulso = Math.sin(2 * Math.PI * (bpm / 60) * t);

    // 1,15 Hz é 69 bpm: dentro da banda cardíaca, que é o caso ruim de verdade.
    const luz = oscilacao * Math.sin(2 * Math.PI * 1.15 * t + 0.7);

    r.push(0.62 * (1 + luz) + amplitude * 0.35 * pulso + nivelRuido * rnd());
    g.push(0.51 * (1 + luz) + amplitude * 1.0 * pulso + nivelRuido * rnd());
    b.push(0.43 * (1 + luz) + amplitude * 0.4 * pulso + nivelRuido * rnd());
  }
  return { r, g, b };
}

/** Só o canal verde, invertido: mais sangue absorve mais luz. */
export function green(s: Serie): number[] {
  return normalizar(s.g).map((x) => -x);
}

/** POS: projeção no plano ortogonal ao tom de pele, com peso por desvio. */
export function pos(s: Serie): number[] {
  const bloco = [s.r, s.g, s.b];
  const medias = bloco.map(media);
  const norm = bloco.map((canal, i) =>
    canal.map((x) => (Math.abs(medias[i]) < 1e-12 ? x : x / medias[i])),
  );

  const projetado = PROJECAO.map((linha) =>
    norm[0].map(
      (_, i) =>
        linha[0] * norm[0][i] + linha[1] * norm[1][i] + linha[2] * norm[2][i],
    ),
  );

  const d2 = desvio(projetado[1]);
  const alfa = d2 > 1e-12 ? desvio(projetado[0]) / d2 : 0;
  return normalizar(projetado[0].map((x, i) => x + alfa * projetado[1][i]));
}

/** Pico do espectro dentro da banda cardíaca, em batimentos por minuto. */
export function estimarBpm(sinal: number[]): { bpm: number; espectro: number[] } {
  const m = media(sinal);
  const centrado = sinal.map((x) => x - m);

  // Janela de Hann: sem ela o corte abrupto espalha energia e inventa picos.
  const janelado = centrado.map(
    (x, i) => x * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (N - 1))),
  );

  const espectro: number[] = [];
  let melhorK = 0;
  let melhorMag = -1;

  const kMin = Math.floor(((BPM_MIN / 60) * N) / FPS);
  const kMax = Math.ceil(((BPM_MAX / 60) * N) / FPS);

  for (let k = kMin; k <= kMax; k++) {
    let re = 0;
    let im = 0;
    for (let i = 0; i < N; i++) {
      const ang = (-2 * Math.PI * k * i) / N;
      re += janelado[i] * Math.cos(ang);
      im += janelado[i] * Math.sin(ang);
    }
    const mag = Math.hypot(re, im);
    espectro.push(mag);
    if (mag > melhorMag) {
      melhorMag = mag;
      melhorK = k;
    }
  }

  return { bpm: (melhorK * FPS * 60) / N, espectro };
}
