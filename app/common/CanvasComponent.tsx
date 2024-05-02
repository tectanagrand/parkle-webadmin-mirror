import { useEffect, useRef } from "react";
import Hls from "hls.js";

function CanvasComponent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function drawVid() {
    if (canvasRef.current !== null && videoRef.current !== null) {
      const ctx = canvasRef.current.getContext("2d");
      const vid = videoRef.current;
      ctx?.drawImage(vid, 0, 0, 300, 600);
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
  });
  return (
    <div>
      <video
        ref={videoRef}
        controls
        height="300"
        width="600"
        autoPlay
        style={{ display: "none" }}
      />
      <canvas ref={canvasRef} />
    </div>
  );
}

export default CanvasComponent;
