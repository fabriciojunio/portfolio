import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const LINKS = [
  { href: "https://github.com/fabriciojunio", label: "github.com/fabriciojunio" },
  {
    href: "https://www.linkedin.com/in/fabr%C3%ADcioj%C3%BAnio/",
    label: "linkedin.com/in/fabríciojúnio",
  },
  { href: "mailto:fabriciojadias@gmail.com", label: "fabriciojadias@gmail.com" },
];

export default function Contact() {
  return (
    <section id="contato" className="py-24 px-6 md:px-12 max-w-3xl mx-auto">
      <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
        <h2 className="text-[28px] font-bold text-text-primary">Vamos conversar?</h2>
        <p className="text-[14px] text-text-secondary mt-3 leading-relaxed">
          Aberto a oportunidades em Data Science, Machine Learning e Desenvolvimento de Software.
        </p>

        <div className="mt-8 bg-[rgba(255,255,255,0.02)] border border-border rounded-lg p-5 font-mono text-[12px] leading-relaxed">
          <div>
            <span className="text-accent-green">$</span>{" "}
            <span className="text-[#cbd5e1]">echo "vamos_conversar"</span>
          </div>
          {LINKS.map((l) => (
            <div key={l.href}>
              <span className="text-accent-green">→</span>{" "}
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                {l.label}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="https://github.com/fabriciojunio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-text-primary rounded-lg px-5 py-2.5 text-sm transition"
          >
            <FiGithub size={14} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/fabr%C3%ADcioj%C3%BAnio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-text-primary rounded-lg px-5 py-2.5 text-sm transition"
          >
            <FiLinkedin size={14} /> LinkedIn
          </a>
          <a
            href="mailto:fabriciojadias@gmail.com"
            className="inline-flex items-center gap-2 bg-accent-green text-bg rounded-lg px-5 py-2.5 text-sm font-semibold hover:brightness-110 transition"
          >
            <FiMail size={14} /> Email
          </a>
        </div>
      </div>
    </section>
  );
}
