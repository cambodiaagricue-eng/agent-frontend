import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type LivenessStatus = "idle" | "running" | "passed";

type LivenessStep = "center" | "left" | "right";

const STEPS: { key: LivenessStep; label: string }[] = [
  { key: "center", label: "Straight" },
  { key: "left", label: "Left" },
  { key: "right", label: "Right" },
];

type LivenessPanelProps = {
  livenessStatus: LivenessStatus;
  currentStepIndex: number;
  livenessProgress: number;
};

export function LivenessPanel({
  livenessStatus,
  currentStepIndex,
  livenessProgress,
}: LivenessPanelProps) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900">Liveness Steps</h3>
      <div className="mt-3 flex flex-col gap-2">
        {STEPS.map((step, index) => {
          const isDone = livenessStatus === "passed" || index < currentStepIndex;
          const isCurrent = livenessStatus === "running" && index === currentStepIndex;
          return (
            <div
              key={step.key}
              className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm ${
                isDone
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : isCurrent
                    ? "border-emerald-300 bg-emerald-100/70 text-emerald-800"
                    : "border-slate-200 bg-slate-50 text-slate-500"
              }`}
            >
              <span>{step.label}</span>
              {isDone ? <Check className="h-4 w-4" /> : <span>{index + 1}</span>}
            </div>
          );
        })}
      </div>
      {livenessStatus === "running" ? (
        <div className="mt-3">
          <p className="mb-1 text-xs text-slate-600">Hold progress</p>
          <Progress value={livenessProgress} max={3} size="sm" />
        </div>
      ) : null}
    </div>
  );
}
