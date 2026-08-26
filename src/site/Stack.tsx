import { m } from "motion/react";
import { fadeUp, inViewOnce, stagger } from "../motion";
import { STACK_GROUPS } from "./data";
import { useTextos } from "./i18n";

export default function Stack() {
  const t = useTextos();

  return (
    <section
      id="stack"
      className="relative py-28 md:py-40 px-6 md:px-10 max-w-[1280px] mx-auto"
    >
      <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
        <m.div variants={stagger()} {...inViewOnce}>
          <m.p variants={fadeUp} className="font-mono text-[10.5px] uppercase tracking-[2px] text-[#9a9a9a]">
            {t.stack.secao}
          </m.p>
          <m.h2 variants={fadeUp} className="mt-5 font-serif text-[42px] md:text-[58px] leading-[1.08] text-[#ededed]">
            {t.stack.titulo[0]}<em className="text-[#ffffff] not-italic">{t.stack.titulo[1]}</em>{t.stack.titulo[2]}
          </m.h2>
          <m.p variants={fadeUp} className="mt-8 text-[15.5px] text-[#9a9a9a] max-w-[360px] leading-[1.9]">
            {t.stack.nota}
          </m.p>
        </m.div>

        <m.div className="space-y-0" variants={stagger(0.07)} {...inViewOnce}>
          {STACK_GROUPS.map((g) => (
            <m.div key={g.label} variants={fadeUp} className="grid grid-cols-[100px_1fr] gap-8 items-start border-t border-white/5 py-7">
              <div className="font-mono text-[11px] uppercase tracking-[1.6px] text-[#ffffff] pt-1">
                {t.stack.grupos[g.label] ?? g.label}
              </div>
              <ul className="flex flex-wrap gap-x-7 gap-y-3 m-0 p-0 list-none">
                {g.items.map((it) => (
                  <li key={it} className="font-serif text-[19px] md:text-[23px] text-[#ededed] leading-snug">
                    {it}
                  </li>
                ))}
              </ul>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
