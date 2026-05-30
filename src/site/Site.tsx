import { useCallback } from "react";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Hero from "./Hero";
import Nav from "./Nav";
import Stack from "./Stack";
import Work from "./Work";

export default function Site() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 56;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f1e8] antialiased">
      <Nav onNavigate={scrollTo} />
      <main>
        <Hero onScrollTo={scrollTo} />
        <About />
        <Work />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
