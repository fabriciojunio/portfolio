import { useEffect, useState } from "react";
import { useIDE } from "../state/useIDE";

const SEEN_KEY = "fj.portfolio.welcome.v1";

export default function Welcome() {
  const ide = useIDE();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const seen = window.localStorage.getItem(SEEN_KEY);
      if (!seen) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const close = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const openDemo = () => {
    close();
    ide.open("/projetos/goldata.py");
    setTimeout(() => ide.setRunPanel(true), 200);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[3px] flex items-center justify-center px-4 animate-[fadeIn_0.2s_ease-out]"
      role="dialog"
      aria-label="Bem-vindo"
      onClick={close}
    >
      <div
        className="w-full max-w-[560px] bg-[#13151a] border border-[#272b34] rounded-lg shadow-2xl font-mono text-[#c9c5ba] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[1.5px] text-[#6c7079]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e36b3a]" />
            portfólio · fabrício júnio
          </div>
          <h1 className="mt-2 text-[20px] text-[#e6e3dc] font-medium leading-snug">
            Esse portfólio é, ele mesmo, um projeto.
          </h1>
          <p className="mt-2 text-[13px] text-[#9ea2ab] leading-relaxed">
            Em vez de um site rolável com cards, montei um IDE de verdade no
            browser. Você navega pelos meus projetos como navegaria pelo meu
            workspace: abrindo arquivos, lendo o código e, em alguns,
            executando trechos para ver o resultado.
          </p>
        </div>

        <div className="px-6 pb-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Tip k="① arquivos" v="clique na sidebar à esquerda" />
          <Tip k="② terminal" v="aceita comandos: ls, cat, open, run" />
          <Tip k="③ Run" v="botão verde nos projetos com demo" />
        </div>

        <div className="px-6 py-4 flex flex-col sm:flex-row gap-2 border-t border-[#1f222a] mt-2">
          <button
            type="button"
            onClick={openDemo}
            className="flex-1 text-[12.5px] px-4 py-2.5 rounded-sm bg-[#e36b3a] text-[#0a0b0e] font-medium hover:brightness-110"
          >
            ▸ ver uma demo interativa (xG)
          </button>
          <button
            type="button"
            onClick={() => {
              close();
              ide.open("/sobre.md");
            }}
            className="flex-1 text-[12.5px] px-4 py-2.5 rounded-sm bg-[#0a0b0e] border border-[#272b34] text-[#e6e3dc] hover:border-[#e36b3a]"
          >
            ler sobre mim
          </button>
          <button
            type="button"
            onClick={close}
            className="text-[11.5px] px-3 py-2.5 text-[#6c7079] hover:text-[#e6e3dc]"
          >
            explorar
          </button>
        </div>

        <div className="px-6 pb-5 text-[10.5px] text-[#6c7079]">
          atalhos: <kbd className="text-[#9ea2ab]">Ctrl/⌘+K</kbd> paleta ·{" "}
          <kbd className="text-[#9ea2ab]">Ctrl/⌘+P</kbd> arquivo ·{" "}
          <kbd className="text-[#9ea2ab]">Ctrl/⌘+`</kbd> terminal
        </div>
      </div>
    </div>
  );
}

function Tip({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-[#0a0b0e] border border-[#272b34] rounded p-2.5">
      <div className="text-[10px] uppercase tracking-[1.2px] text-[#e36b3a]">
        {k}
      </div>
      <div className="text-[11.5px] text-[#c9c5ba] mt-1 leading-snug">{v}</div>
    </div>
  );
}
