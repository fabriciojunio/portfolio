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
      className="relative min-h-[100svh] pt-20 pb-12 overflow-hidden"
    >
      {/* halo radial sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 35%, rgba(232,180,80,0.10), transparent 70%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 grid lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-12 items-center min-h-[80svh]">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <Avatar />
            <div className="font-mono text-[11px] uppercase tracking-[1.4px] text-[#9b958a]">
              <div>{SOBRE.cargo}</div>
              <div className="text-[#6f6a60]">{SOBRE.empresa} · {SOBRE.cidade}</div>
            </div>
          </div>

          <h1 className="font-serif text-[#e8b450] leading-[0.95] tracking-[-0.02em]">
            <span className="block text-[58px] sm:text-[78px] md:text-[92px] lg:text-[108px]">
              Fabrício
            </span>
            <span className="block text-[58px] sm:text-[78px] md:text-[92px] lg:text-[108px] text-[#f5d77a] -mt-2 md:-mt-3">
              Júnio
            </span>
          </h1>

          <p className="mt-6 max-w-[460px] text-[15px] md:text-[16px] text-[#cfc8b9] leading-relaxed font-sans">
            {SOBRE.bio}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onScrollTo("trabalho")}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f5f1e8] text-[#0a0a0a] text-[13px] font-medium hover:bg-white transition-colors"
            >
              Ver trabalho
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <button
              type="button"
              onClick={() => onScrollTo("contato")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-[#f5f1e8] text-[13px] hover:border-[#e8b450]/60 hover:text-[#e8b450] transition-colors"
            >
              Conversar
            </button>
          </div>
        </div>

        <div className="relative lg:h-[640px] h-[460px]">
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
    <div className="w-10 h-10 rounded-full bg-[#161616] border border-white/10 flex items-center justify-center overflow-hidden">
      <span className="font-serif text-[#e8b450] text-[17px]">fj</span>
    </div>
  );
}

function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-[#0a0a0a]/60 overflow-hidden">
      <div className="flex items-center gap-12 py-4 px-6 md:px-10 animate-[marquee_36s_linear_infinite] whitespace-nowrap">
        {doubled.map((it, i) => (
          <span
            key={i}
            className="font-serif text-[18px] md:text-[22px] text-[#6f6a60] tracking-tight"
          >
            {it}
            <span className="text-[#e8b450]/60 mx-12">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
