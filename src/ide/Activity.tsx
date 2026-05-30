import type { ReactNode } from "react";

interface IconBtnProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

function IconBtn({ label, active, onClick, children }: IconBtnProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={`relative w-10 h-10 flex items-center justify-center text-[#6c7079] hover:text-[#e6e3dc] transition-colors ${active ? "text-[#e6e3dc]" : ""}`}
    >
      {active && (
        <span className="absolute left-0 top-1 bottom-1 w-[2px] bg-[#e36b3a]" />
      )}
      {children}
    </button>
  );
}

interface ActivityProps {
  onExplorer: () => void;
  onSearch: () => void;
  onRun: () => void;
}

export default function Activity({ onExplorer, onSearch, onRun }: ActivityProps) {
  return (
    <nav
      aria-label="Atividades"
      className="w-10 bg-[#0a0b0e] border-r border-[#1f222a] flex flex-col items-center py-1 select-none"
    >
      <IconBtn label="Arquivos" active onClick={onExplorer}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 3.5h4.5L8 5h8v9.5H2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      </IconBtn>
      <IconBtn label="Buscar (Ctrl/⌘+P)" onClick={onSearch}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M12 12l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </IconBtn>
      <IconBtn label="Run" onClick={onRun}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M5 3l9 6-9 6z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
        </svg>
      </IconBtn>

      <div className="flex-1" />

      <a
        href="https://github.com/fabriciojunio"
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub"
        aria-label="GitHub"
        className="w-10 h-10 flex items-center justify-center text-[#6c7079] hover:text-[#e6e3dc]"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.4 7.86 10.94.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.3 1.19-3.11-.12-.3-.52-1.48.11-3.08 0 0 .97-.31 3.18 1.18A11.05 11.05 0 0 1 12 5.8c.98 0 1.97.13 2.9.39 2.21-1.5 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.08.74.81 1.19 1.85 1.19 3.11 0 4.43-2.7 5.4-5.27 5.68.42.36.78 1.07.78 2.15v3.18c0 .31.21.66.79.55 4.57-1.54 7.86-5.86 7.86-10.94C23.5 5.65 18.35.5 12 .5z" />
        </svg>
      </a>
    </nav>
  );
}
