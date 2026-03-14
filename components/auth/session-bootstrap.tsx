"use client";

import { useEffect, useRef } from "react";
import { me, refresh, toAppUser } from "@/lib/auth-api";
import { useAuthStore } from "@/lib/store";

export function SessionBootstrap() {
  const hydrated = useAuthStore((state) => state.hydrated);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const setSessionChecked = useAuthStore((state) => state.setSessionChecked);
  const inFlight = useRef(false);

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      setSessionChecked(true);
    }
  }, [hydrated, isAuthenticated, setSessionChecked]);

  useEffect(() => {
    if (!hydrated || !isAuthenticated || inFlight.current) {
      return;
    }

    inFlight.current = true;
    let cancelled = false;

    const run = async () => {
      try {
        let token = accessToken ?? "";
        let meRes;

        try {
          meRes = await me(token);
        } catch {
          await refresh();
          token = "";
          meRes = await me(token);
        }

        const user = toAppUser(meRes.data.user);
        if (user.role !== "agent") {
          throw new Error("This portal is only for agent accounts.");
        }
        if (cancelled) {
          return;
        }
        login(user, token);
      } catch {
        if (!cancelled) {
          logout();
        }
      } finally {
        if (!cancelled) {
          setSessionChecked(true);
        }
        inFlight.current = false;
      }
    };

    void run();

    return () => {
      cancelled = true;
      inFlight.current = false;
    };
  }, [accessToken, hydrated, isAuthenticated, login, logout, setSessionChecked]);

  return null;
}
