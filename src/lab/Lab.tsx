import { useState } from "react";
import BootScreen from "../ide/BootScreen";
import Layout from "../ide/Layout";

export default function Lab() {
  const [ready, setReady] = useState(false);
  return (
    <>
      <a
        href="/"
        className="fixed top-2 right-4 z-[70] text-[11px] font-mono text-[#9ea2ab] hover:text-[#e36b3a] bg-[#0a0b0e] border border-[#272b34] rounded px-2 py-1"
      >
        ← voltar ao portfólio
      </a>
      <Layout />
      {!ready && <BootScreen onDone={() => setReady(true)} />}
    </>
  );
}
