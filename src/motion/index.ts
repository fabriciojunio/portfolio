import type { Transition, Variants } from "motion/react";

/**
 * Curva de saída suave (ease-out). Movimento entra rápido e desacelera,
 * dá sensação de resposta sem parecer arrastado. Usada como padrão.
 */
export const EASE_OUT = [0.22, 0.61, 0.36, 1] as const;

/** Transição base: curta (300ms) e proposital. Menos é mais. */
export const BASE_TRANSITION: Transition = {
  duration: 0.3,
  ease: EASE_OUT,
};

/** Fade sutil subindo poucos pixels. Só opacity + transform. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

/** Fade sutil descendo (para cabeçalhos/barras que entram do topo). */
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -8 },
  show: { opacity: 1, y: 0 },
};

/** Só opacidade, para conteúdo denso onde translate distrai. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

/**
 * Container que revela filhos em cascata leve. `step` pequeno para não
 * virar "onda" longa; `delay` opcional antes do primeiro filho.
 */
export function stagger(step = 0.06, delay = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: step, delayChildren: delay },
    },
  };
}

/** Padrão de revelação ao entrar na viewport, uma única vez. */
export const inViewOnce = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.2 },
} as const;
