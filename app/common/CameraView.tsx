import { ReactElement } from "react";

export default function CameraView({ children }: { children: ReactElement }) {
  return (
    <div className="min-h-[18rem] min-w-[36rem] max-w-[38rem] rounded-lg border-2 border-slate-300 border-solid drop-shadow-component bg-slate-50">
      {children}
    </div>
  );
}
