import { Button } from "@/components/ui/button";

type DeviceSheetProps = {
  modelsReady: boolean;
  modelsLoading: boolean;
  cameraReady: boolean;
  selectedDeviceId: string;
  videoDevices: MediaDeviceInfo[];
  onSelectDevice: (deviceId: string) => void;
  onRetry: () => void;
  hideDiagnostics: boolean;
};

export function DeviceSheet({
  modelsReady,
  modelsLoading,
  cameraReady,
  selectedDeviceId,
  videoDevices,
  onSelectDevice,
  onRetry,
  hideDiagnostics,
}: DeviceSheetProps) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
      {!hideDiagnostics ? (
        <div className="mb-3 flex flex-wrap gap-2 text-xs">
          <span className={`rounded-full px-2.5 py-1 ${modelsReady ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
            Models: {modelsLoading ? "Loading" : modelsReady ? "Ready" : "Not Ready"}
          </span>
          <span className={`rounded-full px-2.5 py-1 ${cameraReady ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
            Camera: {cameraReady ? "Ready" : "Not Ready"}
          </span>
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-slate-600">Camera Device</label>
        <select
          className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm"
          value={selectedDeviceId}
          onChange={(event) => onSelectDevice(event.target.value)}
        >
          {videoDevices.length === 0 ? <option value="">Default camera</option> : null}
          {videoDevices.map((device, index) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${index + 1}`}
            </option>
          ))}
        </select>
      </div>

      <Button type="button" variant="outline" className="mt-3 w-full" onClick={onRetry}>
        Retry Camera & Models
      </Button>
    </div>
  );
}
