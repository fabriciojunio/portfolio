import { SOBRE } from "./data";

const LINKS = [
  { label: "E-mail",   value: SOBRE.contato.email,         href: `mailto:${SOBRE.contato.email}` },
  { label: "GitHub",   value: "github.com/fabriciojunio",  href: SOBRE.contato.github },
  { label: "LinkedIn", value: "in/fabriciojunio",          href: SOBRE.contato.linkedin },
];

export default function Contact() {
  return (
    <section id="contato" className="relative py-24 md:py-36 px-6 md:px-10 max-w-[1280px] mx-auto">
      <p className="font-mono text-[10.5px] uppercase tracking-[2px] text-[#9b958a]">
        04 / contato
      </p>

      <h2 className="mt-4 font-serif text-[54px] md:text-[80px] lg:text-[110px] leading-[0.95] text-[#f5f1e8] tracking-[-0.02em]">
        Vamos
        <br />
        <span className="text-[#e8b450]">trabalhar</span> juntos?
      </h2>

      <p className="mt-8 max-w-[520px] text-[15.5px] md:text-[17px] text-[#cfc8b9] leading-relaxed">
        Procuro oportunidade FullStack (CLT ou PJ). Topo conversar sobre projeto pontual, freelance tecnico ou contratacao. Respondo em ate 24h uteis.
      </p>

      <ul className="mt-12 border-t border-white/10 max-w-[640px]">
        {LINKS.map((l) => (
          <li key={l.label} className="border-b border-white/10">
            <a
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between py-5 hover:pl-2 transition-[padding] duration-200"
            >
              <span className="font-mono text-[10.5px] uppercase tracking-[1.6px] text-[#6f6a60] w-20 shrink-0">
                {l.label}
              </span>
              <span className="flex-1 font-serif text-[20px] md:text-[26px] text-[#f5f1e8] group-hover:text-[#e8b450] transition-colors truncate">
                {l.value}
              </span>
              <span aria-hidden className="ml-4 text-[#9b958a] group-hover:text-[#e8b450] group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
