import { SOBRE } from "./data";

export default function About() {
  return (
    <section id="sobre" className="relative py-28 md:py-40 px-6 md:px-10 max-w-[1280px] mx-auto">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[2px] text-[#a39c8f]">
            01 · sobre
          </p>
          <h2 className="mt-5 font-serif text-[42px] md:text-[58px] leading-[1.08] text-[#f5f1e8]">
            Código que <em className="text-[#d4a76a] not-italic">funciona</em> em produção.
          </h2>
        </div>

        <div className="space-y-8">
          {SOBRE.longBio.map((p, i) => (
            <p
              key={i}
              className="font-sans text-[16px] md:text-[17.5px] leading-[1.9] text-[#d6cfc1] max-w-[640px]"
            >
              {p}
            </p>
          ))}

          <div className="pt-6 grid grid-cols-2 gap-x-10 gap-y-5 max-w-[480px]">
            <Info k="Cargo"    v={SOBRE.cargo} />
            <Info k="Empresa"  v={SOBRE.empresa} />
            <Info k="Cidade"   v={SOBRE.cidade} />
            <Info k="Formação" v="Ciência da Computação, UNISAGRADO" />
          </div>

          <div className="pt-6 flex flex-wrap gap-5">
            <a
              href={SOBRE.contato.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] text-[#a39c8f] hover:text-[#d4a76a] transition-colors underline underline-offset-4 decoration-[#d4a76a]/30 hover:decoration-[#d4a76a]"
            >
              github.com/fabriciojunio →
            </a>
            <a
              href={SOBRE.contato.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] text-[#a39c8f] hover:text-[#d4a76a] transition-colors underline underline-offset-4 decoration-[#d4a76a]/30 hover:decoration-[#d4a76a]"
            >
              LinkedIn →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[1.4px] text-[#7a7468]">{k}</div>
      <div className="font-sans text-[14px] text-[#f5f1e8] mt-1.5 leading-snug">{v}</div>
    </div>
  );
}
