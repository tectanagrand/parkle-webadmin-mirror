import { ReactNode } from "react";

export default function HeaderLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-full h-[4rem] border-[2px] border-slate-200 border-solid rounded-t-lg py-4 px-4">
      {children}
    </div>
  );
}
