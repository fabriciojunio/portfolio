import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
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
    ide.open("/projetos/jis.java");
    setTimeout(() => ide.setRunPanel(true), 200);
  };

  return (
    <AnimatePresence>
    {open && (
    <m.div
      className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[3px] flex items-center justify-center px-4"
      role="dialog"
      aria-label="Bem-vindo"
      onClick={close}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <m.div
        className="w-full max-w-[560px] bg-[#151515] border border-[#262626] rounded-lg shadow-2xl font-mono text-[#c4c4c4] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.97, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 4 }}
        transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[1.5px] text-[#6b6b6b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff]" />
            portfólio · fabrício júnio
          </div>
          <h1 className="mt-2 text-[20px] text-[#ededed] font-medium leading-snug">
            Esse portfólio é, ele mesmo, um projeto.
          </h1>
          <p className="mt-2 text-[13px] text-[#9a9a9a] leading-relaxed">
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

        <div className="px-6 py-4 flex flex-col sm:flex-row gap-2 border-t border-[#1c1c1c] mt-2">
          <button
            type="button"
            onClick={openDemo}
            className="flex-1 text-[12.5px] px-4 py-2.5 rounded-sm bg-[#ffffff] text-[#0c0c0c] font-medium hover:brightness-110"
          >
            ▸ ver uma demo interativa (Java)
          </button>
          <button
            type="button"
            onClick={() => {
              close();
              ide.open("/sobre.md");
            }}
            className="flex-1 text-[12.5px] px-4 py-2.5 rounded-sm bg-[#0c0c0c] border border-[#262626] text-[#ededed] hover:border-[#ffffff]"
          >
            ler sobre mim
          </button>
          <button
            type="button"
            onClick={close}
            className="text-[11.5px] px-3 py-2.5 text-[#6b6b6b] hover:text-[#ededed]"
          >
            explorar
          </button>
        </div>

        <div className="px-6 pb-5 text-[10.5px] text-[#6b6b6b]">
          atalhos: <kbd className="text-[#9a9a9a]">Ctrl/⌘+K</kbd> paleta ·{" "}
          <kbd className="text-[#9a9a9a]">Ctrl/⌘+P</kbd> arquivo ·{" "}
          <kbd className="text-[#9a9a9a]">Ctrl/⌘+`</kbd> terminal
        </div>
      </m.div>
    </m.div>
    )}
    </AnimatePresence>
  );
}

function Tip({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-[#0c0c0c] border border-[#262626] rounded p-2.5">
      <div className="text-[10px] uppercase tracking-[1.2px] text-[#ffffff]">
        {k}
      </div>
      <div className="text-[11.5px] text-[#c4c4c4] mt-1 leading-snug">{v}</div>
    </div>
  );
}
