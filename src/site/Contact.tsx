import { SOBRE } from "./data";

const LINKS = [
  { label: "E-mail",   value: SOBRE.contato.email,         href: `mailto:${SOBRE.contato.email}` },
  { label: "GitHub",   value: "github.com/fabriciojunio",  href: SOBRE.contato.github },
  { label: "LinkedIn", value: "in/fabriciojunio",          href: SOBRE.contato.linkedin },
];

export default function Contact() {
  return (
    <section id="contato" className="relative py-28 md:py-44 px-6 md:px-10 max-w-[1280px] mx-auto">
      <p className="font-mono text-[10.5px] uppercase tracking-[2px] text-[#a39c8f]">
        04 · contato
      </p>

      <h2 className="mt-5 font-serif text-[54px] md:text-[80px] lg:text-[110px] leading-[1.0] text-[#f5f1e8] tracking-[-0.02em]">
        Precisa de
        <br />
        um <span className="text-[#d4a76a]">FullStack</span>?
      </h2>

      <p className="mt-12 max-w-[520px] text-[16px] md:text-[17.5px] text-[#d6cfc1] leading-[1.9]">
        Procuro oportunidade FullStack (CLT ou PJ). Topo conversar sobre projeto pontual, freelance técnico ou contratação. Respondo em até 24h úteis.
      </p>

      <ul className="mt-14 border-t border-white/10 max-w-[640px]">
        {LINKS.map((l) => (
          <li key={l.label} className="border-b border-white/10">
            <a
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between py-6 hover:pl-2 transition-[padding] duration-200"
            >
              <span className="font-mono text-[10.5px] uppercase tracking-[1.6px] text-[#7a7468] w-20 shrink-0">
                {l.label}
              </span>
              <span className="flex-1 font-serif text-[20px] md:text-[26px] text-[#f5f1e8] group-hover:text-[#d4a76a] transition-colors truncate">
                {l.value}
              </span>
              <span aria-hidden className="ml-4 text-[#a39c8f] group-hover:text-[#d4a76a] group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
