import { useEffect, useRef, useState } from "react";

interface Options {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  startOnVisible?: boolean;
}

export function useCountUp({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  startOnVisible = true,
}: Options) {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(!startOnVisible);

  useEffect(() => {
    if (!startOnVisible) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStarted(true);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!started) return;
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setValue(end);
      return;
    }

    let raf = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, end, duration]);

  return { ref, display: `${prefix}${value}${suffix}` };
}
