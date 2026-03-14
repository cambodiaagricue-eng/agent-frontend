"use client";

import { usePathname } from "next/navigation";
import { LanguageToggle } from "@/components/landing/language-toggle";

export function GlobalLanguageToggle() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const shouldShow =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/member/") ||
    pathname === "/community" ||
    pathname === "/loans" ||
    pathname === "/face-auth";

  if (isLanding || !shouldShow) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-[60] hidden sm:block">
      <LanguageToggle variant="dark" />
    </div>
  );
}
