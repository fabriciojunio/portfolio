import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { MotionProvider } from "../motion/provider";
import BootScreen from "../ide/BootScreen";
import Layout from "../ide/Layout";
import { useIDE } from "../state/useIDE";
import { aberturaPedida } from "./aberturaPelaUrl";

/**
 * Abre o arquivo pedido na URL e, se for o caso, já liga o painel de execução.
 *
 * É o que faz o botão "Rodar a demo interativa" da vitrine cair direto na
 * demo, em vez de largar a pessoa na IDE para procurar o arquivo na árvore.
 */
function useAberturaPelaUrl(): void {
  const { open, setRunPanel } = useIDE();

  useEffect(() => {
    const pedido = aberturaPedida(window.location.search);
    if (!pedido) return;

    open(pedido.caminho);
    if (pedido.rodar) setRunPanel(true);
  }, [open, setRunPanel]);
}

export default function Lab() {
  const [ready, setReady] = useState(false);
  useAberturaPelaUrl();

  return (
    <MotionProvider>
      <a
        href="/"
        className="fixed top-2 right-4 z-[70] text-[11px] font-mono text-[#9ea2ab] hover:text-[#e36b3a] bg-[#0a0b0e] border border-[#272b34] rounded px-2 py-1"
      >
        ← voltar ao portfólio
      </a>
      <Layout />
      <AnimatePresence>
        {!ready && <BootScreen onDone={() => setReady(true)} />}
      </AnimatePresence>
    </MotionProvider>
  );
}
