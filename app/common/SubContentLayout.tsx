import { ReactNode } from "react";

export default function SubContentLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`min-w-full border-b-[2px] border-l-[2px] border-r-[2px] border-t-0 border-slate-200 border-solid px-4 ${className}`}
    >
      {children}
    </div>
  );
}
