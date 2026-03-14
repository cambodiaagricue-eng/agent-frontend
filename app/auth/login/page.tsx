"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard, CardContent } from "@/components/ui/card";
import { getBrowserLocationLabel } from "@/lib/browser-location";
import { login, toAppUser } from "@/lib/auth-api";
import { useAuthStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const hydrated = useAuthStore((state) => state.hydrated);
  const sessionChecked = useAuthStore((state) => state.sessionChecked);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setLogin = useAuthStore((state) => state.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!hydrated || !sessionChecked || !isAuthenticated) {
      return;
    }
    router.replace("/dashboard");
  }, [hydrated, sessionChecked, isAuthenticated, router]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const location = await getBrowserLocationLabel();
      const response = await login({
        username: username.trim(),
        password,
        location,
      });

      const nextUser = toAppUser(response.data.user);
      if (nextUser.role !== "agent") {
        throw new Error("This portal is only for agent accounts.");
      }

      setLogin(nextUser, response.data.accessToken);
      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f5fbf3_0%,#edf7ef_100%)] px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center">
        <div className="grid w-full gap-6 lg:grid-cols-[1fr_420px]">
          <div className="hidden rounded-[36px] bg-[linear-gradient(145deg,#173b27_0%,#22573b_55%,#2f7d32_100%)] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Mayura Agent Portal</p>
              <h1 className="mt-6 max-w-lg text-5xl font-semibold leading-tight">
                Onboard farmers in the field and send them for admin approval.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/75">
                Agents can create a farmer account, upload selfie and land documents, and submit the full packet in one guided workflow.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/8 p-5 ring-1 ring-white/10">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Field-ready</p>
                <p className="mt-3 text-lg font-semibold">Single farmer onboarding form</p>
              </div>
              <div className="rounded-3xl bg-white/8 p-5 ring-1 ring-white/10">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Admin review</p>
                <p className="mt-3 text-lg font-semibold">Submitted users stay pending until approval</p>
              </div>
            </div>
          </div>

          <GlassCard className="border-0 bg-white/90 shadow-2xl shadow-emerald-900/10">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-slate-950">Agent Sign In</h2>
                  <p className="text-sm text-slate-500">Use your assigned agent credentials.</p>
                </div>
              </div>

              <form onSubmit={onSubmit} className="mt-8 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Username</label>
                  <Input value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                ) : null}
                <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                  Sign in to agent portal
                </Button>
              </form>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}
