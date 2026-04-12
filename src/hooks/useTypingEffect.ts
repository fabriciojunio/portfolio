import { useEffect, useState } from "react";

export function useTypingEffect(text: string, speed = 40) {
  const [display, setDisplay] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplay("");
    setIsComplete(false);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplay(text);
      setIsComplete(true);
      return;
    }

    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setIsComplete(true);
      }
    }, speed);

    return () => window.clearInterval(id);
  }, [text, speed]);

  return { display, isComplete };
}
