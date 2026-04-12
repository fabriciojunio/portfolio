import { useState, useEffect } from "react";

const CONSENT_KEY = "portfolio_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimento de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-[#1a1b26] border-t border-border"
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1">
          <p className="text-[13px] text-text-secondary leading-relaxed">
            Este site utiliza apenas cookies essenciais para funcionamento (sem
            rastreamento ou analytics). Nenhum dado pessoal é coletado ou
            armazenado. Em conformidade com a{" "}
            <span className="text-accent-green">LGPD (Lei 13.709/2018)</span>.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="text-[12px] font-mono px-4 py-2 rounded-md border border-border text-text-muted hover:text-text-primary transition"
          >
            Recusar
          </button>
          <button
            onClick={accept}
            className="text-[12px] font-mono px-4 py-2 rounded-md bg-accent-green text-bg font-semibold hover:brightness-110 transition"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
