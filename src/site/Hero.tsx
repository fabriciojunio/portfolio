import { Suspense, lazy } from "react";
import { m } from "motion/react";
import { fadeUp, stagger } from "../motion";
import { EMPRESAS, SOBRE } from "./data";

const Cards3D = lazy(() => import("./Cards3D"));

interface Props {
  onScrollTo: (id: string) => void;
}

export default function Hero({ onScrollTo }: Props) {
  return (
    <section
      id="topo"
      className="relative min-h-[100svh] pt-24 md:pt-28 pb-16 overflow-hidden"
    >
      {/*
        No lugar do brilho radial que ficava aqui: uma régua fina, alinhada à
        coluna do texto. Ela não decora, mostra onde a grade começa, que é o
        que sustenta uma página sem cor.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-6 md:left-10 w-px bg-white/[0.06]"
      />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center min-h-[80svh]">
        <m.div
          className="relative z-10"
          variants={stagger(0.09, 0.08)}
          initial="hidden"
          animate="show"
        >
          <m.div variants={fadeUp} className="flex items-center gap-3 mb-12">
            <Avatar />
            <div className="font-mono text-[11px] uppercase tracking-[1.6px] text-[#9a9a9a] leading-relaxed">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span>{SOBRE.cargo}</span>
                <span className="flex items-center gap-1.5 normal-case tracking-normal text-[#ededed] text-[10px]">
                  <span className="w-[5px] h-[5px] bg-[#ededed] shrink-0" />
                  disponível
                </span>
              </div>
              <div className="text-[#767676] mt-1">
                {SOBRE.cidade}
              </div>
            </div>
          </m.div>

          <m.h1 variants={fadeUp} className="font-serif text-[#ffffff] tracking-[-0.02em]">
            <span className="block text-[56px] sm:text-[78px] md:text-[96px] lg:text-[112px] leading-[1.02]">
              Fabrício
            </span>
            <span className="block text-[56px] sm:text-[78px] md:text-[96px] lg:text-[112px] leading-[1.02] text-[#ffffff] mt-1 md:mt-2">
              Júnio
            </span>
          </m.h1>

          <m.p
            variants={fadeUp}
            className="mt-12 max-w-[500px] text-[16px] md:text-[18px] text-[#d4d4d4] leading-[1.9] font-sans"
          >
            {SOBRE.bio}
          </m.p>

          <m.div variants={fadeUp} className="mt-12 flex flex-wrap gap-3">
            <m.button
              type="button"
              onClick={() => onScrollTo("trabalho")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#ededed] text-[#0a0a0a] text-[12px] font-mono uppercase tracking-[1.4px] hover:bg-white transition-colors"
            >
              Ver trabalho
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </m.button>
            <m.button
              type="button"
              onClick={() => onScrollTo("contato")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-[#ededed] text-[12px] font-mono uppercase tracking-[1.4px] hover:border-[#ffffff] hover:text-[#ffffff] transition-colors"
            >
              Conversar
            </m.button>
          </m.div>

        </m.div>

        <div className="relative lg:h-[660px] h-[460px]">
          <Suspense fallback={null}>
            <Cards3D />
          </Suspense>
        </div>
      </div>

      <Marquee items={EMPRESAS} />
    </section>
  );
}

function Avatar() {
  return (
    <div className="w-11 h-11 rounded-full bg-[#161616] border border-white/10 flex items-center justify-center overflow-hidden">
      <span className="font-serif text-[#ffffff] text-[18px] leading-none">fj</span>
    </div>
  );
}


function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-[#0a0a0a]/60 overflow-hidden">
      <div className="flex items-center gap-12 py-5 px-6 md:px-10 animate-[marquee_36s_linear_infinite] whitespace-nowrap">
        {doubled.map((it, i) => (
          <span
            key={i}
            className="font-serif text-[19px] md:text-[24px] text-[#767676] tracking-tight"
          >
            {it}
            <span className="text-[#ffffff]/50 mx-12">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
