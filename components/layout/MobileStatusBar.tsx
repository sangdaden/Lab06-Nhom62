import { Signal, Wifi, Battery } from "lucide-react";

export function MobileStatusBar() {
  return (
    <div className="hidden md:flex h-11 px-5 items-center justify-between bg-vinmec-primary text-white text-xs font-medium">
      <span>20:45</span>
      <div className="flex items-center gap-1.5">
        <Signal size={14} />
        <Wifi size={14} />
        <Battery size={14} />
      </div>
    </div>
  );
}
