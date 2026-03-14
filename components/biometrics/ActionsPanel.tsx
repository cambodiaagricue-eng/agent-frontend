import { Button } from "@/components/ui/button";

type LivenessStatus = "idle" | "running" | "passed";

type ActionsPanelProps = {
  mode: "enroll" | "login";
  livenessStatus: LivenessStatus;
  canStart: boolean;
  canSubmit: boolean;
  busy: boolean;
  onStartScan: () => void;
  onReset: () => void;
  onSubmit: () => void;
};

export function ActionsPanel({
  mode,
  livenessStatus,
  canStart,
  canSubmit,
  busy,
  onStartScan,
  onReset,
  onSubmit,
}: ActionsPanelProps) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900">Actions</h3>
      <div className="mt-3 flex flex-col gap-2">
        {mode === "enroll" && livenessStatus === "idle" ? (
          <Button type="button" onClick={onStartScan} disabled={!canStart}>
            Start Face Scan
          </Button>
        ) : null}

        {(mode === "login" || livenessStatus === "passed") ? (
          <Button type="button" onClick={onSubmit} isLoading={busy} disabled={!canSubmit}>
            {mode === "enroll" ? "Enroll Face" : "Login with Face"}
          </Button>
        ) : null}

        {mode === "enroll" ? (
          <Button type="button" variant="outline" onClick={onReset} disabled={busy}>
            Reset
          </Button>
        ) : null}
      </div>
    </div>
  );
}
