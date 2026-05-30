import { SOBRE } from "./data";

export default function About() {
  return (
    <section id="sobre" className="relative py-24 md:py-32 px-6 md:px-10 max-w-[1280px] mx-auto">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[2px] text-[#9b958a]">
            01 / sobre
          </p>
          <h2 className="mt-4 font-serif text-[42px] md:text-[54px] leading-[1.02] text-[#f5f1e8]">
            Codigo que <em className="text-[#e8b450] not-italic">funciona</em> em producao.
          </h2>
        </div>

        <div className="space-y-6">
          {SOBRE.longBio.map((p, i) => (
            <p
              key={i}
              className="font-sans text-[15.5px] md:text-[17px] leading-[1.7] text-[#cfc8b9] max-w-[640px]"
            >
              {p}
            </p>
          ))}

          <div className="pt-4 grid grid-cols-2 gap-x-8 gap-y-3 max-w-[460px]">
            <Info k="Cargo"    v={SOBRE.cargo} />
            <Info k="Empresa"  v={SOBRE.empresa} />
            <Info k="Cidade"   v={SOBRE.cidade} />
            <Info k="Formacao" v="Ciencia da Computacao — UNISAGRADO" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[1.4px] text-[#6f6a60]">{k}</div>
      <div className="font-sans text-[14px] text-[#f5f1e8] mt-1">{v}</div>
    </div>
  );
}
