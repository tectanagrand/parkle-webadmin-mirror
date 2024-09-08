import { ReactNode } from "react";

export default function ContentLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`min-w-full rounded-b-lg border-b-[2px] border-l-[2px] border-r-[2px] border-t-0 border-slate-200 border-solid ${className}`}
    >
      {children}
    </div>
  );
}
