"use client";

import { useState } from "react";
import { CheckCircle2, FileBadge2, Upload, UserPlus } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { GlassCard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/lib/store";
import { agentOnboardFarmer } from "@/lib/auth-api";

export default function AgentDashboardPage() {
  const accessToken = useAuthStore((state) => state.accessToken);

  const [form, setForm] = useState({
    username: "",
    phone: "",
    password: "",
    fullName: "",
    address: "",
    gender: "male",
    age: "18",
  });
  const [selfie, setSelfie] = useState<File | null>(null);
  const [govId, setGovId] = useState<File | null>(null);
  const [landDocuments, setLandDocuments] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit =
    Boolean(form.username.trim()) &&
    Boolean(form.phone.trim()) &&
    Boolean(form.password.trim()) &&
    Boolean(form.fullName.trim()) &&
    Boolean(form.address.trim()) &&
    Boolean(selfie) &&
    Boolean(govId) &&
    landDocuments.length > 0;

  const submit = async () => {
    if (!accessToken || !selfie || !govId || landDocuments.length === 0) {
      return;
    }

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await agentOnboardFarmer(accessToken, {
        ...form,
        selfie,
        govId,
        landDocuments,
      });

      setSuccess(
        `Farmer ${response.data.farmer.username} was onboarded successfully and is now pending admin approval.`,
      );
      setForm({
        username: "",
        phone: "",
        password: "",
        fullName: "",
        address: "",
        gender: "male",
        age: "18",
      });
      setSelfie(null);
      setGovId(null);
      setLandDocuments([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit farmer onboarding.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout
      title="Agent Dashboard"
      subtitle="Create and submit a complete farmer onboarding packet"
    >
      <div className="space-y-6">
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}
        {success ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        ) : null}

        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: UserPlus,
              title: "Farmer account",
              copy: "Create farmer credentials and link the new account to your agent ID.",
            },
            {
              icon: FileBadge2,
              title: "Complete KYC packet",
              copy: "Upload selfie, government ID, and land documents in the same submission.",
            },
            {
              icon: CheckCircle2,
              title: "Admin approval",
              copy: "Submitted farmers stay inactive until an admin reviews and approves them.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <GlassCard key={item.title}>
                <CardContent className="p-5">
                  <div className="inline-flex rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-lg font-semibold text-slate-950">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.copy}</p>
                </CardContent>
              </GlassCard>
            );
          })}
        </section>

        <GlassCard>
          <CardHeader>
            <CardTitle>New Farmer Onboarding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Username</label>
                <Input
                  value={form.username}
                  onChange={(event) => setForm((current) => ({ ...current, username: event.target.value.toLowerCase() }))}
                  placeholder="farmer username"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Phone</label>
                <Input
                  value={form.phone}
                  onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  placeholder="+855..."
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Temporary password</label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  placeholder="Set farmer password"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Full name</label>
                <Input
                  value={form.fullName}
                  onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
                  placeholder="Farmer full name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Gender</label>
                <Select
                  value={form.gender}
                  onChange={(event) => setForm((current) => ({ ...current, gender: event.target.value }))}
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_180px]">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Address</label>
                <Textarea
                  value={form.address}
                  onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
                  placeholder="Farmer address"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Age</label>
                <Input
                  type="number"
                  min="18"
                  max="120"
                  value={form.age}
                  onChange={(event) => setForm((current) => ({ ...current, age: event.target.value.replace(/[^\d]/g, "") }))}
                />
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <UploadCard
                title="Selfie"
                help={selfie ? selfie.name : "Upload a clear selfie image"}
                inputProps={{
                  accept: "image/*",
                  onChange: (event) => setSelfie(event.target.files?.[0] ?? null),
                }}
              />
              <UploadCard
                title="Government ID"
                help={govId ? govId.name : "Upload image or PDF government ID"}
                inputProps={{
                  accept: "image/*,application/pdf",
                  onChange: (event) => setGovId(event.target.files?.[0] ?? null),
                }}
              />
              <UploadCard
                title="Land documents"
                help={
                  landDocuments.length > 0
                    ? landDocuments.map((file) => file.name).join(", ")
                    : "Upload one or more land documents"
                }
                inputProps={{
                  multiple: true,
                  accept: "image/*,application/pdf",
                  onChange: (event) => setLandDocuments(Array.from(event.target.files ?? [])),
                }}
              />
            </div>

            <div className="flex flex-col gap-3 rounded-3xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950">Submission outcome</p>
                <p className="mt-1 text-sm text-slate-600">
                  The farmer account will remain inactive until an admin approves it.
                </p>
              </div>
              <Button size="lg" onClick={() => void submit()} isLoading={isSubmitting} disabled={!canSubmit}>
                Submit farmer onboarding
              </Button>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </AppLayout>
  );
}

function UploadCard({
  title,
  help,
  inputProps,
}: {
  title: string;
  help: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-white p-4">
      <div className="inline-flex rounded-2xl bg-slate-100 p-3 text-slate-700">
        <Upload className="h-5 w-5" />
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-950">{title}</p>
      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{help}</p>
      <input
        type="file"
        className="mt-3 block w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-emerald-100 file:px-4 file:py-2 file:font-medium file:text-emerald-800 hover:file:bg-emerald-200"
        {...inputProps}
      />
    </div>
  );
}
