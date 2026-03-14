"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { useLanguage } from "@/components/landing/language-provider";
import { cn } from "@/lib/utils";
import { useAuthStore, useSidebarStore } from "@/lib/store";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function AppLayout({ children, title, subtitle }: AppLayoutProps) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen } = useSidebarStore();
  const hydrated = useAuthStore((state) => state.hydrated);
  const sessionChecked = useAuthStore((state) => state.sessionChecked);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!hydrated || !sessionChecked) {
      return;
    }
    if (!isAuthenticated) {
      router.replace("/auth/login");
      return;
    }
    if (user && user.role !== "agent") {
      router.replace("/auth/login");
    }
  }, [
    hydrated,
    sessionChecked,
    isAuthenticated,
    user,
    pathname,
    router,
  ]);

  if (!hydrated || !sessionChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">{t("app.loadingSession")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className={cn("min-w-0 transition-all duration-300", isOpen ? "lg:ml-64" : "lg:ml-20")}>
        <Header title={title} subtitle={subtitle} />
        <main className="mx-auto max-w-7xl px-3 py-4 sm:px-4 md:px-6 md:py-6">{children}</main>
      </div>
    </div>
  );
}
