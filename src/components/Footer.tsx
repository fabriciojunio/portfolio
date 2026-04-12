import { FiShield } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-border py-6 px-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-text-dim">
          Feito com React + TypeScript por Fabricio Junio &copy; {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-1.5 text-[10px] text-text-dim">
          <FiShield size={12} className="text-accent-green" />
          <span>LGPD Compliant &middot; Nenhum dado pessoal coletado &middot; Zero tracking</span>
        </div>
      </div>
    </footer>
  );
}
