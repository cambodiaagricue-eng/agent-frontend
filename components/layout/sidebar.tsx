"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ChevronLeft, X } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useLanguage } from "@/components/landing/language-provider";
import { cn } from "@/lib/utils";
import { useAuthStore, useSidebarStore } from "@/lib/store";

const navItems = [
  { href: "/dashboard", label: "Dashboard", key: "sidebar.dashboard", icon: LayoutDashboard },
];

export function Sidebar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const { isOpen, isMobileOpen, toggle, closeMobile } = useSidebarStore();

  return (
    <>
      {isMobileOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={closeMobile}
        />
      ) : null}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-[88vw] max-w-72 flex-col border-r border-border/50 bg-white transition-all duration-300 lg:max-w-none",
          isOpen ? "lg:w-64" : "lg:w-20",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border/50 px-4">
          <Link href="/dashboard" className="flex items-center gap-3" onClick={closeMobile}>
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl">
              <Image src="/logo.png" alt="Mayura" width={48} height={48} className="object-contain" />
            </div>
            {isOpen ? (
              <div>
                <p className="text-lg font-bold text-primary">Mayura</p>
                <p className="text-[10px] text-muted-foreground">{t("app.brandTag")}</p>
              </div>
            ) : null}
          </Link>
          <button className="rounded-lg p-1 hover:bg-gray-100 lg:hidden" onClick={closeMobile}>
            <X className="h-5 w-5" />
          </button>
          <button className="hidden rounded-lg p-1.5 hover:bg-gray-100 lg:flex" onClick={toggle}>
            <ChevronLeft className={cn("h-4 w-4 transition-transform", !isOpen && "rotate-180")} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map(({ href, label, key, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={closeMobile}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {isOpen ? <span>{t(key) || label}</span> : null}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border/50 p-3">
          <Link href="/dashboard" onClick={closeMobile} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-gray-50">
            <Avatar name={user?.username ?? "Farmer"} size="sm" />
            {isOpen ? (
              <div className="overflow-hidden">
                <p className="truncate text-sm font-medium">{user?.username ?? "Farmer"}</p>
                <p className="truncate text-xs text-muted-foreground">{user?.role ?? "farmer"}</p>
              </div>
            ) : null}
          </Link>
        </div>
      </aside>
    </>
  );
}
