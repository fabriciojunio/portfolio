import { m } from "motion/react";
import { fadeUp, inViewOnce, stagger } from "../motion";
import { SOBRE } from "./data";
import { useTextos } from "./i18n";

export default function About() {
  const t = useTextos();

  return (
    <section id="sobre" className="relative py-28 md:py-40 px-6 md:px-10 max-w-[1280px] mx-auto">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
        <m.div variants={stagger()} {...inViewOnce}>
          <m.p variants={fadeUp} className="font-mono text-[10.5px] uppercase tracking-[2px] text-[#9a9a9a]">
            {t.sobre.secao}
          </m.p>
          <m.h2 variants={fadeUp} className="mt-5 font-serif text-[42px] md:text-[58px] leading-[1.08] text-[#ededed]">
            {t.sobre.titulo[0]}<em className="text-[#ffffff] not-italic">{t.sobre.titulo[1]}</em>{t.sobre.titulo[2]}
          </m.h2>
        </m.div>

        <m.div className="space-y-8" variants={stagger()} {...inViewOnce}>
          {t.sobre.longBio.map((p, i) => (
            <m.p
              key={i}
              variants={fadeUp}
              className="font-sans text-[16px] md:text-[17.5px] leading-[1.9] text-[#d4d4d4] max-w-[640px]"
            >
              {p}
            </m.p>
          ))}

          <m.div variants={fadeUp} className="pt-6 grid grid-cols-2 gap-x-10 gap-y-5 max-w-[480px]">
            <Info k={t.sobre.rotuloCargo}    v={t.sobre.cargo} />
            <Info k={t.sobre.rotuloCidade}   v={t.sobre.cidade} />
            <Info k={t.sobre.rotuloFormacao} v={t.sobre.formacaoValor} />
          </m.div>

          <m.div variants={fadeUp} className="pt-6 flex flex-wrap gap-5">
            <a
              href={SOBRE.contato.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] text-[#9a9a9a] hover:text-[#ffffff] transition-colors underline underline-offset-4 decoration-[#ffffff]/30 hover:decoration-[#ffffff]"
            >
              github.com/fabriciojunio →
            </a>
            <a
              href={SOBRE.contato.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] text-[#9a9a9a] hover:text-[#ffffff] transition-colors underline underline-offset-4 decoration-[#ffffff]/30 hover:decoration-[#ffffff]"
            >
              LinkedIn →
            </a>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[1.4px] text-[#767676]">{k}</div>
      <div className="font-sans text-[14px] text-[#ededed] mt-1.5 leading-snug">{v}</div>
    </div>
  );
}
