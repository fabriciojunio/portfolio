// Regra de contagem do Contaflux, sem nada de interface.
// Mesma conta do snippet em projetos/contaflux.py.

export interface Linha {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/** Sinal indica o lado da linha; magnitude, a distância proporcional. */
export function lado(l: Linha, px: number, py: number): number {
  return (l.x2 - l.x1) * (py - l.y1) - (l.y2 - l.y1) * (px - l.x1);
}

/**
 * Confere se o cruzamento aconteceu dentro do trecho desenhado.
 *
 * A reta que passa pelos dois pontos é infinita, mas a linha de contagem não
 * é. Sem esta verificação, um veículo passando muito acima ou abaixo do trecho
 * marcado seria contado por cruzar o prolongamento: é justamente o que permite
 * contar só uma das pistas.
 */
export function dentroDoSegmento(l: Linha, px: number, py: number): boolean {
  const dx = l.x2 - l.x1;
  const dy = l.y2 - l.y1;
  const comprimento2 = dx * dx + dy * dy;
  if (comprimento2 < 1e-9) return false;
  const t = ((px - l.x1) * dx + (py - l.y1) * dy) / comprimento2;
  return t >= -0.05 && t <= 1.05;
}

/** A travessia é a troca de sinal entre dois quadros consecutivos. */
export function cruzou(anterior: number, atual: number): boolean {
  return Math.sign(anterior) !== Math.sign(atual);
}
