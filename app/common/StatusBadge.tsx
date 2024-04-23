import clsx from "clsx";

interface StatusBadgeType {
  label: string;
  mode: string;
}

export default function StatusBadge({ label, mode }: StatusBadgeType) {
  let styleMode = "";
  let textStyle = "";
  console.log(styleMode);
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
        "rounded-full p-1 h-5 bg-opacity-10 border-[1px] border-solid flex items-center justify-center",
        styleMode
      )}
    >
      <p className={clsx("text-center", textStyle)}>{label}</p>
    </div>
  );
}
