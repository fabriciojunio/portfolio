import { useEffect, useState } from "react";
import { m } from "motion/react";
import SeletorDeIdioma from "./SeletorDeIdioma";
import { useTextos } from "./i18n";

interface Props {
  onNavigate: (section: string) => void;
}

export default function Nav({ onNavigate }: Props) {
  const t = useTextos();
  const ITEMS = [
    { id: "sobre",    label: t.nav.sobre },
    { id: "trabalho", label: t.nav.trabalho },
    { id: "stack",    label: t.nav.stack },
    { id: "contato",  label: t.nav.contato },
  ];

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    ["sobre", "trabalho", "stack", "contato"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <m.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-30 transition-colors duration-300 ${
        scrolled ? "bg-[#0a0a0a] border-b border-white/10" : ""
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <button
          type="button"
          onClick={() => go("topo")}
          className="text-[#ededed] font-serif text-[15px] tracking-tight"
          aria-label={t.nav.topo}
        >
          fj.
        </button>

        <nav className="hidden md:flex items-center gap-8 text-[12.5px] font-sans">
          {ITEMS.map((it) => (
            <button
              key={it.id}
              type="button"
              onClick={() => go(it.id)}
              className={`transition-colors duration-200 ${
                active === it.id
                  ? "text-[#ffffff]"
                  : "text-[#9a9a9a] hover:text-[#ededed]"
              }`}
            >
              {it.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <SeletorDeIdioma />
          <a
            href="https://github.com/fabriciojunio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12.5px] text-[#9a9a9a] hover:text-[#ededed] transition-colors"
          >
            GitHub →
          </a>
        </div>

        <button
          type="button"
          aria-label={t.nav.abrirMenu}
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="md:hidden text-[#ededed] text-[13px] font-mono tracking-wide"
        >
          {open ? t.nav.fechar : t.nav.menu}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0a0a]">
          <nav className="px-6 py-4 flex flex-col gap-3 text-[#ededed] font-sans text-[14px]">
            {ITEMS.map((it) => (
              <button
                key={it.id}
                type="button"
                onClick={() => go(it.id)}
                className="text-left py-1"
              >
                {it.label}
              </button>
            ))}
            <a
              href="https://github.com/fabriciojunio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-left py-1 text-[#ffffff]"
            >
              GitHub →
            </a>
            <div className="pt-2 border-t border-white/10 mt-1">
              <SeletorDeIdioma compacto />
            </div>
          </nav>
        </div>
      )}
    </m.header>
  );
}
