"use client";

import { useLanguage } from "./language-provider";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  variant?: "light" | "dark";
  className?: string;
}

export function LanguageToggle({
  variant = "light",
  className,
}: LanguageToggleProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "kh" : "en")}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer select-none",
        variant === "dark"
          ? "border border-white/25 text-white hover:bg-white/15"
          : "border border-border text-foreground bg-white/80 hover:bg-white",
        className
      )}
      aria-label="Toggle language"
    >
      <Globe className="h-3.5 w-3.5" />
      <span className="hidden sm:inline uppercase tracking-wide">
        {locale === "en" ? "KH" : "EN"}
      </span>
    </button>
  );
}
