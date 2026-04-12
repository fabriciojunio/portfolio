import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import CookieConsent from "./components/CookieConsent";

const Projects = lazy(() => import("./components/Projects"));
const TechStack = lazy(() => import("./components/TechStack"));
const Timeline = lazy(() => import("./components/Timeline"));
const Experience = lazy(() => import("./components/Experience"));
const Education = lazy(() => import("./components/Education"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text-primary font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Suspense fallback={null}>
          <Projects />
          <TechStack />
          <Timeline />
          <Experience />
          <Education />
          <Contact />
          <Footer />
        </Suspense>
      </main>
      <CookieConsent />
    </div>
  );
}
