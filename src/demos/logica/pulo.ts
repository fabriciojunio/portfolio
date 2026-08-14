// As duas regras de tempo do pulo do Kaida, do snippet em projetos/kaida.cs.
// Elas existem porque, sem elas, o controle parece "não responder", e o
// jogador culpa o jogo em vez do próprio tempo de reação.

export const FPS = 60;
export const QUADROS = 42;

// Valores do PlayerStats do projeto, em segundos.
export const COYOTE_PADRAO = 0.12;
export const BUFFER_PADRAO = 0.15;

/** Em que quadro o chão acaba: até aqui o personagem está apoiado. */
export const ULTIMO_QUADRO_NO_CHAO = 18;

export interface QuadroDaLinha {
  quadro: number;
  noChao: boolean;
  coyote: number;
  buffer: number;
}

export interface Resultado {
  quadroDoPulo: number | null;
  motivo: string;
  linha: QuadroDaLinha[];
}

/**
 * Roda a mesma lógica do controlador quadro a quadro.
 *
 * `quadroDoComando` é quando o jogador apertou pulo. Antes do fim do chão, o
 * pulo sai na hora. Depois, ele ainda sai enquanto o coyote não zerar. Se o
 * comando vier antes de tocar o chão, quem segura é o buffer.
 */
export function simular(
  quadroDoComando: number,
  coyoteTime: number,
  bufferTime: number,
): Resultado {
  const dt = 1 / FPS;
  let coyote = 0;
  let buffer = 0;
  let quadroDoPulo: number | null = null;
  const linha: QuadroDaLinha[] = [];

  for (let q = 0; q < QUADROS; q++) {
    const noChao = q <= ULTIMO_QUADRO_NO_CHAO;

    // Os timers descem sozinhos todo quadro; estar no chão recarrega o coyote.
    coyote = noChao ? coyoteTime : Math.max(0, coyote - dt);
    buffer = Math.max(0, buffer - dt);

    if (q === quadroDoComando) buffer = bufferTime;

    if (quadroDoPulo === null && (noChao || coyote > 0) && buffer > 0) {
      quadroDoPulo = q;
      buffer = 0;
    }

    linha.push({ quadro: q, noChao, coyote, buffer });
  }

  return { quadroDoPulo, motivo: explicar(quadroDoComando, quadroDoPulo), linha };
}

function explicar(quadroDoComando: number, quadroDoPulo: number | null): string {
  if (quadroDoPulo === null) {
    return quadroDoComando > ULTIMO_QUADRO_NO_CHAO
      ? "o comando veio depois de o coyote acabar: o pulo se perde"
      : "o comando veio cedo demais e o buffer expirou antes do chão";
  }
  if (quadroDoComando <= ULTIMO_QUADRO_NO_CHAO) {
    return "apoiado no chão: o pulo sai no mesmo quadro do comando";
  }
  if (quadroDoPulo === quadroDoComando) {
    return "já fora da borda, mas dentro do coyote: o pulo ainda vale";
  }
  return "comando guardado no buffer até haver chão de novo";
}
