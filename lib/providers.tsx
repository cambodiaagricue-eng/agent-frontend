"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { SessionBootstrap } from "@/components/auth/session-bootstrap";
import { LanguageProvider } from "@/components/landing/language-provider";
import { GlobalLanguageToggle } from "@/components/language/global-language-toggle";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <SessionBootstrap />
        <GlobalLanguageToggle />
        {children}
      </QueryClientProvider>
    </LanguageProvider>
  );
}
