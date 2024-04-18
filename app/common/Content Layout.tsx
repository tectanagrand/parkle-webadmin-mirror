import { ReactNode } from "react";

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-full min-h-[80vh] rounded-b-lg border-b-[2px] border-l-[2px] border-r-[2px] border-t-0 border-slate-200 border-solid pt-3 px-4">
      {children}
    </div>
  );
}
