import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const LINKS = [
  { id: "sobre", label: "sobre" },
  { id: "projetos", label: "projetos" },
  { id: "skills", label: "habilidades" },
  { id: "experiencia", label: "experiência" },
  { id: "contato", label: "contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("sobre");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const sections = LINKS.map((l) => document.getElementById(l.id));
      const y = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s && s.offsetTop <= y) {
          setActive(LINKS[i].id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 56;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-14 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-[rgba(15,17,23,0.8)] border-b border-border" : ""
      }`}
    >
      <div className="h-full max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#sobre" onClick={handleClick("sobre")} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulseDot" />
          <span className="font-mono text-sm text-[#e2e8f0]">fabricio.dev</span>
        </a>

        <ul className="hidden md:flex items-center gap-6">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={handleClick(l.id)}
                className={`font-mono text-xs transition-colors hover:text-text-primary ${
                  l.id === "contato"
                    ? "text-accent-green"
                    : active === l.id
                    ? "text-text-primary"
                    : "text-text-muted"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Abrir menu"
          className="md:hidden text-text-secondary"
          onClick={() => setMenuOpen(true)}
        >
          <FiMenu size={22} />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-md flex flex-col items-center justify-center gap-8">
          <button
            aria-label="Fechar menu"
            className="absolute top-4 right-6 text-text-secondary"
            onClick={() => setMenuOpen(false)}
          >
            <FiX size={26} />
          </button>
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={handleClick(l.id)}
              className={`font-mono text-lg ${
                l.id === "contato" ? "text-accent-green" : "text-text-primary"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
