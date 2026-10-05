import { Suspense, lazy, useEffect, useState } from "react";
import { rotaDoEndereco, type Rota } from "./rota";

const Site = lazy(() => import("./site/Site"));
const Lab = lazy(() => import("./lab/Lab"));
const Resultados = lazy(() => import("./resultados/Resultados"));

function rotaAtual(): Rota {
  if (typeof window === "undefined") return "site";
  return rotaDoEndereco(window.location.pathname);
}

export default function App() {
  const [rota, setRota] = useState<Rota>(rotaAtual);

  useEffect(() => {
    const onNav = () => setRota(rotaAtual());
    window.addEventListener("popstate", onNav);
    return () => window.removeEventListener("popstate", onNav);
  }, []);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#767676] font-mono text-[12px]">
          carregando…
        </div>
      }
    >
      {rota === "lab" ? <Lab /> : rota === "resultados" ? <Resultados /> : <Site />}
    </Suspense>
  );
}
