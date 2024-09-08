import { ReactNode } from "react";

export default function HeaderLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`min-w-full border-[2px] border-slate-200 border-solid rounded-t-lg py-4 px-4 ${className}`}
    >
      {children}
    </div>
  );
}
