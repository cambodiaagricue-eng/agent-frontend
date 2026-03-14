"use client";

import { useEffect, useRef, useState } from "react";

interface LiveCounterProps {
  /** Target value to count up to initially */
  end: number;
  /** Suffix shown after the number (e.g. "+", "%") */
  suffix?: string;
  /** Prefix shown before the number */
  prefix?: string;
  /** Duration of the initial count-up in ms */
  duration?: number;
  /** How often to tick after reach (ms). 0 = no live ticking */
  tickInterval?: number;
  /** How much to add per tick (randomised ±50%) */
  tickAmount?: number;
  className?: string;
}

export function LiveCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2200,
  tickInterval = 3000,
  tickAmount = 1,
  className = "",
}: LiveCounterProps) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"idle" | "counting" | "live">("idle");
  const ref = useRef<HTMLSpanElement>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Intersection Observer — start count-up when visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === "idle") {
          setPhase("counting");
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [phase]);

  // Count-up animation
  useEffect(() => {
    if (phase !== "counting") return;

    const startTime = performance.now();
    let raf: number;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * end);
      setCount(current);

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setCount(end);
        setPhase("live");
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [phase, end, duration]);

  // Live ticking — continuous small increments after count-up
  useEffect(() => {
    if (phase !== "live" || tickInterval <= 0) return;

    tickRef.current = setInterval(() => {
      setCount((prev) => {
        // ±50% randomisation around tickAmount
        const delta = Math.max(1, Math.round(tickAmount * (0.5 + Math.random())));
        return prev + delta;
      });
    }, tickInterval);

    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [phase, tickInterval, tickAmount]);

  // Pulse animation on live tick
  const pulseClass = phase === "live" ? "live-counter-pulse" : "";

  return (
    <span ref={ref} className={`${className} ${pulseClass} inline-block transition-transform duration-300`}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
