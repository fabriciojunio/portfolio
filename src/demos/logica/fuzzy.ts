// PermaneIA: motor de inferência fuzzy Mamdani.
//
// É a mesma conta que roda no projeto, e não uma animação que finge o
// resultado. As quatro etapas do método estão aqui: fuzzificação, disparo das
// regras pelo mínimo, agregação pelo máximo e defuzzificação por centroide.

export type TermoFrequencia = "baixa" | "media" | "alta";
export type TermoNotas = "baixa" | "media" | "alta";
export type TermoEngajamento = "baixo" | "medio" | "alto";
export type TermoRisco = "baixo" | "medio" | "alto" | "critico";

/** Pertinência trapezoidal (a, b, c, d): sobe, fica em 1 no platô, desce. */
function trapezio(a: number, b: number, c: number, d: number) {
  return (x: number): number => {
    if (x >= b && x <= c) return 1;
    if (x <= a || x >= d) return 0;
    if (x < b) return (x - a) / (b - a);
    return (d - x) / (d - c);
  };
}

/** Triangular é o trapézio com o platô reduzido a um ponto. */
function triangulo(a: number, b: number, c: number) {
  return trapezio(a, b, b, c);
}

export const FREQUENCIA: Record<TermoFrequencia, (x: number) => number> = {
  baixa: trapezio(0, 0, 40, 60),
  media: trapezio(50, 63, 72, 85),
  alta: trapezio(80, 90, 100, 100),
};

export const NOTAS: Record<TermoNotas, (x: number) => number> = {
  baixa: trapezio(0, 0, 3, 5),
  media: triangulo(4, 5.5, 7),
  alta: trapezio(6.5, 8, 10, 10),
};

export const ENGAJAMENTO: Record<TermoEngajamento, (x: number) => number> = {
  baixo: trapezio(0, 0, 1.5, 3),
  medio: triangulo(2, 4, 6),
  alto: trapezio(5, 7, 10, 10),
};

export const RISCO: Record<TermoRisco, (x: number) => number> = {
  baixo: trapezio(0, 0, 0.1, 0.3),
  medio: triangulo(0.2, 0.4, 0.6),
  alto: triangulo(0.5, 0.675, 0.85),
  critico: trapezio(0.75, 0.9, 1, 1),
};

export type Regra = {
  id: number;
  se: { frequencia: TermoFrequencia; notas: TermoNotas; engajamento: TermoEngajamento };
  entao: TermoRisco;
  porque: string;
};

function r(
  id: number,
  frequencia: TermoFrequencia,
  notas: TermoNotas,
  engajamento: TermoEngajamento,
  entao: TermoRisco,
  porque: string,
): Regra {
  return { id, se: { frequencia, notas, engajamento }, entao, porque };
}

/**
 * Base fatorial completa: 3 x 3 x 3 = 27 combinações, todas escritas.
 *
 * Com a base completa, nenhuma entrada cai num vazio e a saída nunca vem de uma
 * agregação vazia.
 */
export const REGRAS: Regra[] = [
  r(1, "baixa", "baixa", "baixo", "critico", "Os três sinais no pior patamar ao mesmo tempo."),
  r(2, "baixa", "baixa", "medio", "critico", "Sem presença e sem nota, o vínculo com a disciplina já se rompeu."),
  r(3, "baixa", "baixa", "alto", "critico", "Acesso alto sem presença e sem nota costuma ser tentativa tardia."),
  r(4, "baixa", "media", "baixo", "critico", "Presença e engajamento no chão; a nota vai acompanhar."),
  r(5, "baixa", "media", "medio", "alto", "A ausência nas aulas é o problema dominante."),
  r(6, "baixa", "media", "alto", "alto", "Sumiu da sala mas segue na plataforma."),
  r(7, "baixa", "alta", "baixo", "alto", "Notas boas, presença e engajamento em queda. Um critério por nota diria que este aluno está tranquilo."),
  r(8, "baixa", "alta", "medio", "alto", "Bom desempenho não anula a ausência sistemática."),
  r(9, "baixa", "alta", "alto", "medio", "Nota alta e plataforma ativa, mas ausente da sala."),
  r(10, "media", "baixa", "baixo", "critico", "Reprovação por nota e por falta se aproximam juntas."),
  r(11, "media", "baixa", "medio", "alto", "Desempenho ruim com presença apertada."),
  r(12, "media", "baixa", "alto", "medio", "Acessa com constância: parece dificuldade de conteúdo."),
  r(13, "media", "media", "baixo", "alto", "Tudo mediano e o engajamento caindo."),
  r(14, "media", "media", "medio", "medio", "Situação mediana em todas as frentes."),
  r(15, "media", "media", "alto", "medio", "Plataforma ativa indica vínculo preservado."),
  r(16, "media", "alta", "baixo", "alto", "Notas boas escondem o desligamento."),
  r(17, "media", "alta", "medio", "medio", "Bom desempenho com presença no limite."),
  r(18, "media", "alta", "alto", "baixo", "Nota e plataforma compensam a presença mediana."),
  r(19, "alta", "baixa", "baixo", "alto", "Vem às aulas, mas não aprende e não usa o material."),
  r(20, "alta", "baixa", "medio", "medio", "Presença garantida e alguma busca por material."),
  r(21, "alta", "baixa", "alto", "medio", "Presente e engajado que ainda vai mal: dificuldade de aprendizagem."),
  r(22, "alta", "media", "baixo", "medio", "Presença boa, mas plataforma abandonada."),
  r(23, "alta", "media", "medio", "medio", "Perfil regular, sem alarme e sem folga."),
  r(24, "alta", "media", "alto", "baixo", "Trajetória saudável."),
  r(25, "alta", "alta", "baixo", "medio", "Vai bem, mas parou de acessar a plataforma."),
  r(26, "alta", "alta", "medio", "baixo", "Trajetória sólida."),
  r(27, "alta", "alta", "alto", "baixo", "Os três sinais no melhor patamar."),
];

/**
 * Acessos brutos viram engajamento de 0 a 10 numa curva logarítmica: a
 * diferença entre 0 e 5 acessos diz muito mais sobre o vínculo do aluno do que
 * a diferença entre 60 e 65.
 */
export function normalizarEngajamento(acessos: number, saturacao = 40): number {
  if (acessos <= 0) return 0;
  return Math.min(10, (10 * Math.log1p(acessos)) / Math.log1p(saturacao));
}

export type Resultado = {
  score: number;
  faixa: TermoRisco;
  agregado: Record<TermoRisco, number>;
  disparadas: Array<{ id: number; forca: number; entao: TermoRisco; porque: string }>;
};

const PASSOS = 500;

export function inferir(frequencia: number, notas: number, engajamento: number): Resultado {
  // 1. Fuzzificação.
  const gf = {
    baixa: FREQUENCIA.baixa(frequencia),
    media: FREQUENCIA.media(frequencia),
    alta: FREQUENCIA.alta(frequencia),
  };
  const gn = { baixa: NOTAS.baixa(notas), media: NOTAS.media(notas), alta: NOTAS.alta(notas) };
  const ge = {
    baixo: ENGAJAMENTO.baixo(engajamento),
    medio: ENGAJAMENTO.medio(engajamento),
    alto: ENGAJAMENTO.alto(engajamento),
  };

  // 2 e 3. Disparo pelo mínimo e agregação pelo máximo.
  const agregado: Record<TermoRisco, number> = { baixo: 0, medio: 0, alto: 0, critico: 0 };
  const disparadas: Resultado["disparadas"] = [];

  for (const regra of REGRAS) {
    const forca = Math.min(gf[regra.se.frequencia], gn[regra.se.notas], ge[regra.se.engajamento]);
    if (forca <= 0) continue;
    if (forca > agregado[regra.entao]) agregado[regra.entao] = forca;
    disparadas.push({ id: regra.id, forca, entao: regra.entao, porque: regra.porque });
  }
  disparadas.sort((a, b) => b.forca - a.forca || a.id - b.id);

  // 4. Defuzzificação por centroide sobre o universo discretizado.
  let numerador = 0;
  let denominador = 0;
  for (let i = 0; i <= PASSOS; i += 1) {
    const x = i / PASSOS;
    let altura = 0;
    for (const termo of ["baixo", "medio", "alto", "critico"] as TermoRisco[]) {
      const corte = agregado[termo];
      if (corte <= 0) continue;
      altura = Math.max(altura, Math.min(corte, RISCO[termo](x)));
    }
    numerador += x * altura;
    denominador += altura;
  }

  const score = denominador === 0 ? 0.5 : numerador / denominador;

  // A faixa é o termo de maior pertinência no ponto. O empate fica com o de
  // menor risco: não se anuncia "crítico" onde "alto" explica igualmente bem.
  let faixa: TermoRisco = "baixo";
  let melhor = -1;
  for (const termo of ["baixo", "medio", "alto", "critico"] as TermoRisco[]) {
    const grau = RISCO[termo](score);
    if (grau > melhor) {
      melhor = grau;
      faixa = termo;
    }
  }

  return { score: Math.round(score * 1000) / 1000, faixa, agregado, disparadas };
}

/** O critério ingênuo usado hoje na maioria das secretarias: olhar só a média. */
export function criterioPorNota(notas: number): "em risco" | "sem risco" {
  return notas < 6 ? "em risco" : "sem risco";
}
