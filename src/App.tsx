import { Suspense, lazy, useEffect, useState } from "react";

const Site = lazy(() => import("./site/Site"));
const Lab = lazy(() => import("./lab/Lab"));

function isLabRoute(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.pathname.replace(/\/+$/, "").toLowerCase() === "/lab";
}

export default function App() {
  const [lab, setLab] = useState<boolean>(isLabRoute);

  useEffect(() => {
    const onNav = () => setLab(isLabRoute());
    window.addEventListener("popstate", onNav);
    return () => window.removeEventListener("popstate", onNav);
  }, []);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#6f6a60] font-mono text-[12px]">
          carregando…
        </div>
      }
    >
      {lab ? <Lab /> : <Site />}
    </Suspense>
  );
}
