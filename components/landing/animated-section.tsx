"use client";

import { useEffect, useRef, type ReactNode } from "react";

type AnimationType = "reveal" | "reveal-left" | "reveal-right" | "reveal-scale" | "stagger-children";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  threshold?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}

export function AnimatedSection({
  children,
  animation = "reveal",
  delay = 0,
  threshold = 0.15,
  className = "",
  as: Tag = "div",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("visible");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <Tag>
      <div ref={ref} className={`${animation} ${className}`}>
        {children}
      </div>
    </Tag>
  );
}
