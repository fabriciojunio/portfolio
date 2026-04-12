import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiBriefcase, FiBookOpen, FiMapPin, FiAward } from "react-icons/fi";

const CODE_LINES = [
  "Analista de Sistemas na Nexum Tecnologia,",
  "onde desenvolvo automações, integrações via",
  "API e robôs Java na plataforma Lecom BPM.",
  "",
  "Curso Ciência da Computação na UNISAGRADO",
  "e estudo Data Science e Machine Learning",
  "por conta, aplicando em projetos reais.",
  "",
  "Meu foco: conectar desenvolvimento de",
  "software com inteligência de dados.",
];

const INFO = [
  { icon: FiBriefcase, label: "Cargo", value: "Analista de Sistemas Jr", sub: "Nexum Tecnologia" },
  { icon: FiBookOpen, label: "Formação", value: "Ciência da Computação", sub: "UNISAGRADO" },
  { icon: FiMapPin, label: "Local", value: "Bauru, SP", sub: "Brasil" },
  { icon: FiAward, label: "Incubadora", value: "Saruê", sub: "UNESP Bauru" },
];

export default function About() {
  return (
    <section id="sobre" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-[3fr_2fr] gap-8 items-start"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-accent-green mb-2">
            sobre
          </p>
          <h2 className="text-[22px] font-semibold text-text-primary mb-6">Quem sou eu</h2>

          <div className="bg-[rgba(255,255,255,0.02)] border border-border rounded-lg p-5">
            <div className="font-mono text-[13px] leading-relaxed">
              {CODE_LINES.map((line, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-text-dim text-[11px] select-none w-5 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[#cbd5e1] whitespace-pre">{line || "\u00A0"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <ul className="space-y-4">
            {INFO.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label} className="flex items-start gap-3">
                  <Icon className="text-accent-green mt-1" size={16} />
                  <div>
                    <div className="text-[10px] uppercase tracking-[1px] text-text-muted">
                      {item.label}
                    </div>
                    <div className="text-[13px] text-text-primary font-medium">{item.value}</div>
                    <div className="text-[12px] text-text-secondary">{item.sub}</div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4 mt-6 pt-5 border-t border-border">
            <a
              href="https://github.com/fabriciojunio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <FiGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/fabr%C3%ADcioj%C3%BAnio/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <FiLinkedin size={20} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
