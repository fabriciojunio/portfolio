import { useEffect, useState } from "react";

interface Props {
  onNavigate: (section: string) => void;
}

const ITEMS = [
  { id: "sobre",    label: "Sobre" },
  { id: "trabalho", label: "Trabalho" },
  { id: "stack",    label: "Stack" },
  { id: "contato",  label: "Contato" },
];

export default function Nav({ onNavigate }: Props) {
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
    ITEMS.forEach(({ id }) => {
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
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-colors duration-300 ${
        scrolled ? "bg-[#0a0a0a]/70 backdrop-blur-md border-b border-white/5" : ""
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <button
          type="button"
          onClick={() => go("topo")}
          className="text-[#f5f1e8] font-serif text-[15px] tracking-tight"
          aria-label="Topo"
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
                  ? "text-[#d4a76a]"
                  : "text-[#9b958a] hover:text-[#f5f1e8]"
              }`}
            >
              {it.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/fabriciojunio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12.5px] text-[#9b958a] hover:text-[#f5f1e8] transition-colors"
          >
            GitHub →
          </a>
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="md:hidden text-[#f5f1e8] text-[13px] font-mono tracking-wide"
        >
          {open ? "Fechar" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#0a0a0a]/95 backdrop-blur-md">
          <nav className="px-6 py-4 flex flex-col gap-3 text-[#f5f1e8] font-sans text-[14px]">
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
              className="text-left py-1 text-[#d4a76a]"
            >
              GitHub →
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
