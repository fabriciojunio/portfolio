import { m } from "motion/react";
import { fadeUp, inViewOnce, stagger } from "../motion";
import { SOBRE } from "./data";
import { useTextos } from "./i18n";

export default function Contact() {
  const t = useTextos();
  const LINKS = [
    { label: t.contato.email, value: SOBRE.contato.email,        href: `mailto:${SOBRE.contato.email}` },
    { label: "GitHub",        value: "github.com/fabriciojunio", href: SOBRE.contato.github },
    { label: "LinkedIn",      value: "in/fabriciojunio",         href: SOBRE.contato.linkedin },
  ];

  return (
    <section id="contato" className="relative py-28 md:py-44 px-6 md:px-10 max-w-[1280px] mx-auto">
      <m.div variants={stagger()} {...inViewOnce}>
        <m.p variants={fadeUp} className="font-mono text-[10.5px] uppercase tracking-[2px] text-[#9a9a9a]">
          {t.contato.secao}
        </m.p>

        <m.h2 variants={fadeUp} className="mt-5 font-serif text-[54px] md:text-[80px] lg:text-[110px] leading-[1.0] text-[#ededed] tracking-[-0.02em]">
          {t.contato.titulo[0]}
          <br />
          <span className="text-[#ffffff]">{t.contato.titulo[1]}</span>{t.contato.titulo[2]}
        </m.h2>

        <m.p variants={fadeUp} className="mt-12 max-w-[520px] text-[16px] md:text-[17.5px] text-[#d4d4d4] leading-[1.9]">
          {t.contato.chamada}
        </m.p>
      </m.div>

      <m.ul className="mt-14 border-t border-white/10 max-w-[640px]" variants={stagger(0.07)} {...inViewOnce}>
        {LINKS.map((l) => (
          <m.li key={l.label} variants={fadeUp} className="border-b border-white/10">
            <a
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between py-6 hover:pl-2 transition-[padding] duration-200"
            >
              <span className="font-mono text-[10.5px] uppercase tracking-[1.6px] text-[#767676] w-20 shrink-0">
                {l.label}
              </span>
              <span className="flex-1 font-serif text-[20px] md:text-[26px] text-[#ededed] group-hover:text-[#ffffff] transition-colors truncate">
                {l.value}
              </span>
              <span aria-hidden className="ml-4 text-[#9a9a9a] group-hover:text-[#ffffff] group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </m.li>
        ))}
      </m.ul>
    </section>
  );
}
