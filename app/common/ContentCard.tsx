import { ElementType } from "react";
import clsx from "clsx";

interface HeaderCardType {
  Content?: ElementType;
  Footer?: ElementType;
}

export default function ContentCard({ Content, Footer }: HeaderCardType) {
  return (
    <>
      <div
        className={clsx(
          "border-slate-200 border-solid py-2 px-4 flex justify-between border-[2px]",
          !Footer ? "rounded-b-lg h-[85%]" : "rounded-b-lg h-[75%]"
        )}
      >
        <div className="flex flex-col gap-1 min-w-[100%]">
          {Content ? <Content /> : <></>}
        </div>
      </div>
      {Footer && (
        <div
          className={clsx(
            "border-slate-200 border-solid p-1 flex justify-between border-[2px]",
            "rounded-b-lg h-[10%]"
          )}
        >
          <div className="flex flex-col gap-1 min-w-[100%]">
            {Content ? <Content /> : <></>}
          </div>
        </div>
      )}
    </>
  );
}
