import { Suspense, lazy } from "react";
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
      {/* halo radial sutil no quadrante onde as cartas vivem */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 72% 38%, rgba(212,167,106,0.10), transparent 70%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center min-h-[80svh]">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <Avatar />
            <div className="font-mono text-[11px] uppercase tracking-[1.6px] text-[#a39c8f] leading-relaxed">
              <div>{SOBRE.cargo}</div>
              <div className="text-[#7a7468] mt-1">
                {SOBRE.empresa} · {SOBRE.cidade}
              </div>
            </div>
          </div>

          <h1 className="font-serif text-[#d4a76a] tracking-[-0.02em]">
            <span className="block text-[56px] sm:text-[78px] md:text-[96px] lg:text-[112px] leading-[1.02]">
              Fabrício
            </span>
            <span className="block text-[56px] sm:text-[78px] md:text-[96px] lg:text-[112px] leading-[1.02] text-[#e4bd86] mt-1 md:mt-2">
              Júnio
            </span>
          </h1>

          <p className="mt-12 max-w-[500px] text-[16px] md:text-[18px] text-[#d6cfc1] leading-[1.9] font-sans">
            {SOBRE.bio}
          </p>

          <div className="mt-12 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onScrollTo("trabalho")}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f5f1e8] text-[#0a0a0a] text-[13.5px] font-medium hover:bg-white transition-colors"
            >
              Ver trabalho
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
            <button
              type="button"
              onClick={() => onScrollTo("contato")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-[#f5f1e8] text-[13.5px] hover:border-[#d4a76a]/60 hover:text-[#d4a76a] transition-colors"
            >
              Conversar
            </button>
          </div>
        </div>

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
      <span className="font-serif text-[#d4a76a] text-[18px] leading-none">fj</span>
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
            className="font-serif text-[19px] md:text-[24px] text-[#7a7468] tracking-tight"
          >
            {it}
            <span className="text-[#d4a76a]/50 mx-12">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
