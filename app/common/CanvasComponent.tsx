import { MutableRefObject, useEffect, useRef } from "react";
import Hls from "hls.js";

interface CanvasComponentProps {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  height?: string;
  width?: string;
}

function CanvasComponent({ canvasRef, height, width }: CanvasComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  function drawVid() {
    if (canvasRef.current !== null && videoRef.current !== null) {
      const ctx = canvasRef.current.getContext("2d");
      const vid = videoRef.current;
      // Get the video's aspect ratio
      const videoAspectRatio = vid.videoWidth / vid.videoHeight;

      // Get the canvas's aspect ratio
      const canvasAspectRatio =
        canvasRef.current.width / canvasRef.current.height;

      let drawWidth = canvasRef.current.width;
      let drawHeight = canvasRef.current.height;

      if (canvasAspectRatio > videoAspectRatio) {
        // If canvas is wider than video, adjust the height
        drawHeight = canvasRef.current.width / videoAspectRatio;
      } else {
        // If canvas is taller than video, adjust the width
        drawWidth = canvasRef.current.height * videoAspectRatio;
      }

      const offsetX = (canvasRef.current.width - drawWidth) / 2;
      const offsetY = (canvasRef.current.height - drawHeight) / 2;

      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear previous frame
      ctx?.drawImage(vid, offsetX, offsetY, drawWidth, drawHeight); // Draw with correct scaling
      requestAnimationFrame(drawVid);
    }
  }

  useEffect(() => {
    const hls = new Hls();

    if (Hls.isSupported()) {
      if (videoRef.current !== null) {
        hls.loadSource(`https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8`);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.ERROR, (err) => {
          console.log(err);
        });
        drawVid();
      }
    }

    const playVideo = setTimeout(() => {
      if (videoRef.current !== null) {
        videoRef.current.play();
      }
    }, 1000);

    return () => {
      clearTimeout(playVideo);
      hls.destroy();
    };
  }, []);
  return (
    <div>
      <video
        ref={videoRef}
        controls
        height="200"
        width="400"
        autoPlay
        muted
        style={{ display: "none" }}
      />
      <canvas
        ref={canvasRef}
        height={height ?? "230"}
        width={width ?? "420"}
        className="rounded-lg border-2 border-slate-300 border-solid drop-shadow-component"
      ></canvas>
    </div>
  );
}

export default CanvasComponent;
