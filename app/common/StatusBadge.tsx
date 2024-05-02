import clsx from "clsx";

interface StatusBadgeType {
  label: string;
  mode: string;
}

export default function StatusBadge({ label, mode }: StatusBadgeType) {
  let styleMode = "";
  let textStyle = "";
  switch (mode) {
    case "success":
      styleMode = "bg-success border-success";
      textStyle = "text-success-contrasttext";
      break;
    case "warning":
      styleMode = "bg-warning border-warning";
      textStyle = "text-warning-contrasttext";
      break;
    case "error":
      styleMode = "bg-error border-error";
      textStyle = "text-error-contrasttext";
      break;
    case "idle":
      styleMode = "bg-idle border-idle";
      textStyle = "text-idle-contrasttext";
      break;
    case "primary":
      styleMode = "bg-primary ";
      textStyle = "text-primary-contrasttext";
      break;
  }
  return (
    <div
      className={clsx(
        "rounded-full h-5 bg-opacity-10 border-[1px] border-solid flex shrink items-center justify-center max-w-fit p-3",
        styleMode
      )}
    >
      <p className={clsx(textStyle)}>{label}</p>
    </div>
  );
}
7