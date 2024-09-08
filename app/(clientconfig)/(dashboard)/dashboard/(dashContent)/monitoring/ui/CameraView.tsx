import { useRef, useEffect, ReactElement } from "react";

export default function CameraView({ children }: { children: ReactElement }) {
  const divRef = useRef<HTMLDivElement>(null);

  const resizeView = () => {
    const divElement = divRef.current;
    if (divElement && children.props.canvasRef?.current) {
      const canvas = children.props.canvasRef?.current;
      const { width, height } = canvas.getBoundingClientRect();
      divElement.style.width = width + "px";
      divElement.style.height = height + "px";
    }
  };

  useEffect(() => {
    resizeView(); // Initially set the size when the component mounts

    // Handle resizing when the canvas size changes
    const resizeObserver = new ResizeObserver(resizeView);
    if (children.props.canvasRef?.current) {
      resizeObserver?.observe(children.props.canvasRef?.current);
    }

    return () => {
      resizeObserver.disconnect(); // Cleanup the ResizeObserver
    };
  }, []); // Dependency array empty to only run on mount

  return (
    <div
      ref={divRef}
      className=" bg-slate-50 object-cover"
      style={{ display: "inline-block" }}
    >
      {children}
    </div>
  );
}
