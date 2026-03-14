import { CheckCircle2 } from "lucide-react";

type LivenessStatus = "idle" | "running" | "passed";
type LivenessStep = "center" | "left" | "right";

const STEP_LABELS: Record<LivenessStep, string> = {
  center: "Look Straight Ahead",
  left: "Slowly Turn Left",
  right: "Slowly Turn Right",
};

type FaceScanHeroProps = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  livenessStatus: LivenessStatus;
  activeStep: LivenessStep;
  livenessProgress: number;
  faceAligned: boolean;
  faceHint: string;
  yawDeg: number;
  error: string;
};

export function FaceScanHero({
  videoRef,
  livenessStatus,
  activeStep,
  livenessProgress,
  faceAligned,
  faceHint,
  yawDeg,
  error,
}: FaceScanHeroProps) {
  const hintText =
    livenessStatus === "running" && livenessProgress > 0
      ? `${faceHint} (${livenessProgress}/3)`
      : faceHint;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="aspect-[3/4] w-full object-cover -scale-x-100"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/45" />

      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-[999px] transition-all duration-300 ${
          faceAligned
            ? "bg-emerald-200/16 shadow-[inset_0_0_80px_rgba(167,243,208,0.35)]"
            : "bg-white/5"
        }`}
      />

      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-[999px] border-2 transition-all duration-300 ${
          faceAligned
            ? "face-scan-aligned-ring border-emerald-300 shadow-[0_0_40px_rgba(16,185,129,0.55)]"
            : "border-emerald-200/70"
        }`}
      >
        <div className={`face-scan-ticks ${faceAligned ? "face-scan-aligned" : ""}`} />
        <div className="face-scan-crosshair" />
        {livenessStatus === "running" ? <div className="face-scan-sweep" /> : null}
      </div>

      {livenessStatus === "running" ? (
        <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-white/35 bg-black/50 px-4 py-2 text-center text-xs text-white">
          <p className="font-semibold">{STEP_LABELS[activeStep]}</p>
          <div className="mt-1 flex items-center justify-center gap-1">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className={`h-1.5 w-1.5 rounded-full ${
                  dot < livenessProgress ? "bg-emerald-300" : "bg-white/35"
                }`}
              />
            ))}
          </div>
        </div>
      ) : null}

      <div
        className={`pointer-events-none absolute bottom-4 left-4 rounded-full px-3 py-1.5 text-xs font-medium ${
          faceAligned ? "bg-emerald-500/90 text-white" : "bg-amber-500/90 text-black"
        }`}
      >
        {hintText}
      </div>

      <div className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1.5 text-xs text-white">
        Yaw: {yawDeg.toFixed(1)}°
      </div>

      {livenessStatus === "passed" ? (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/55 text-white">
          <CheckCircle2 className="h-12 w-12 text-emerald-300" />
          <p className="text-lg font-semibold">Verification Complete</p>
        </div>
      ) : null}

      {error ? (
        <div className="absolute inset-x-3 top-3 rounded-xl border border-red-300 bg-red-50/95 px-3 py-2 text-xs text-red-700">
          {error}
        </div>
      ) : null}
    </div>
  );
}
