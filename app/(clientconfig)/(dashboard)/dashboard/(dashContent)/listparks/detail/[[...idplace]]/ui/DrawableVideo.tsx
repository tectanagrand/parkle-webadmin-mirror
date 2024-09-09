"use client";
import { Stage, Layer, Image } from "react-konva";
import Konva from "konva";
import { useRef, useState, useEffect } from "react";
import BoundingBox from "./BoundingBox";
import Hls from "hls.js";
import { v4 } from "uuid";

interface Rectangle {
  points: number[];
  id_bbox: string;
  lastoffset: { x: number; y: number };
}

interface DrawableVideoProps {
  link: string;
}

const DrawableVideo = ({ link }: DrawableVideoProps) => {
  const canvasRef = useRef<Konva.Image>(null);
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [activeRect, setActiveRect] = useState();
  const videoElement = useRef<HTMLVideoElement>(null);
  const [size, setSize] = useState({
    width: 50,
    height: 50,
  });
  const aspectRatio = 0.5;

  useEffect(() => {
    const hls = new Hls();
    if (videoElement.current) {
      hls.loadSource(link);
      hls.attachMedia(videoElement.current);
      hls.on(Hls.Events.ERROR, (err) => {
        console.log(err);
      });
    }

    const onLoad = () => {
      if (videoElement.current) {
        setSize({
          width: videoElement.current.videoWidth,
          height: videoElement.current.videoHeight,
        });
      }
    };

    const playVideo = setTimeout(() => {
      if (videoElement.current !== null) {
        videoElement.current.play();
      }
    }, 1000);
    if (videoElement.current) {
      videoElement.current.addEventListener("loadedmetadata", onLoad);
    }

    return () => {
      if (videoElement.current) {
        videoElement.current.removeEventListener("loadedmetadata", onLoad);
      }
      clearTimeout(playVideo);
      hls.destroy();
    };
  }, [link, videoElement]);

  useEffect(() => {
    const layer = canvasRef.current?.getLayer();
    const anim = new Konva.Animation(() => {}, layer);
    anim.start();

    return () => {
      anim.stop();
    };
  }, [videoElement]);

  const handleCanvasClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (stage) {
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition) {
        const x = pointerPosition.x;
        const y = pointerPosition.y;
        const newuuid = v4();
        setRectangles([
          ...rectangles,
          {
            points: [x, y, x + 100, y, x + 100, y + 100, x, y + 100],
            id_bbox: newuuid,
            lastoffset: { x: 0, y: 0 },
          },
        ]);
      }
    }
  };

  const handleRectChange = (
    id_bbox: string,
    points: number[],
    lastoffset: { x: number; y: number }
  ) => {
    console.log("received points :" + points);
    const newRectangles = rectangles.map((item) => {
      if (item.id_bbox === id_bbox) {
        return {
          ...item,
          points: points,
          lastoffset: lastoffset,
        };
      } else {
        return item;
      }
    });
    setRectangles(newRectangles);
  };
  return (
    <div>
      <div style={{ width: "100%" }}>
        <video
          ref={videoElement}
          controls
          autoPlay
          muted
          width={size.width * aspectRatio}
          height={size.height * aspectRatio}
          style={{ display: "none" }}
        />
        <Stage
          width={size.width * aspectRatio}
          height={size.height * aspectRatio}
          onClick={handleCanvasClick}
        >
          <Layer>
            <Image
              ref={canvasRef}
              image={videoElement.current as CanvasImageSource}
              height={size.height * aspectRatio}
              width={size.width * aspectRatio}
            />
            {rectangles.map((rect, i) => (
              <BoundingBox
                key={`rect-${i}`}
                id_bbox={rect.id_bbox}
                points={rect.points}
                lastoffset={rect.lastoffset}
                OnChange={handleRectChange}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default DrawableVideo;
