import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";
import { BASE_TRANSITION } from ".";

/**
 * Provider único de animação. Carrega apenas o bundle `domAnimation`
 * (animações, exit, gestos hover/tap/focus e inView) evitando o peso de
 * layout/drag. `reducedMotion="user"` desliga transform/movimento quando o
 * usuário pede menos animação, mantendo só a opacidade (respeita o SO).
 * `strict` obriga o uso do componente leve `m.*` em vez de `motion.*`.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={BASE_TRANSITION}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
