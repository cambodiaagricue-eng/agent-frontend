"use client";

import { useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { LanguageToggle } from "@/components/landing/language-toggle";
import { useLanguage } from "@/components/landing/language-provider";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth-api";
import { useAuthStore, useSidebarStore } from "@/lib/store";
import { useOnboardingStore } from "@/lib/onboarding-store";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const { toggleMobile } = useSidebarStore();
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.logout);
  const resetOnboarding = useOnboardingStore((state) => state.resetOnboarding);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Ignore server logout failures and clear local state regardless.
    } finally {
      clearSession();
      resetOnboarding();
      router.replace("/auth/login");
    }
  };

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b border-border/50 bg-white/85 px-3 py-2 backdrop-blur-md sm:px-4 md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button className="rounded-xl p-2 hover:bg-gray-100 lg:hidden" onClick={toggleMobile}>
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          {title ? <h1 className="truncate text-base font-bold sm:text-lg">{title}</h1> : null}
          {subtitle ? <p className="hidden truncate text-xs text-muted-foreground sm:block">{subtitle}</p> : null}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <LanguageToggle variant="light" className="hidden sm:flex px-3" />
        <div className="hidden items-center gap-2 sm:flex">
          <Avatar name={user?.username ?? "Farmer"} size="sm" />
          <div className="text-right">
            <p className="text-sm font-medium">{user?.username ?? "Farmer"}</p>
            <p className="text-xs text-muted-foreground">{user?.phone ?? ""}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout} aria-label={t("app.logout")}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
