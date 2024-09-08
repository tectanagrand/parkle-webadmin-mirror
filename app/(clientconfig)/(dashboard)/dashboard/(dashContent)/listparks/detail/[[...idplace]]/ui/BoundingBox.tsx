"use client";
import { Line, Circle } from "react-konva";
import Konva from "konva";
import { useRef, useState, useCallback, useEffect } from "react";

interface BBoxPoints {
  points: Array<number>;
  id_bbox: string;
  lastoffset: { x: number; y: number };
  OnChange: (
    id_bbox: string,
    points: Array<number>,
    lastoffset: { x: number; y: number }
  ) => void;
}

const BoundingBox = ({ points, id_bbox, lastoffset, OnChange }: BBoxPoints) => {
  const [boxPoints, setBoxPoints] = useState<number[]>([]);
  const offsetStore = useRef(lastoffset);
  const [isPointDrag, setPointDrag] = useState(false);
  const initialPointsRef = useRef(points);
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    console.log("new :" + points);
    console.log("points change : " + points);
    initialPointsRef.current = points;
    offsetStore.current = lastoffset;
    setBoxPoints(points);
  }, [points]);

  const handlePointDragMove = (
    index: number,
    e: Konva.KonvaEventObject<DragEvent>
  ) => {
    console.log("point dragged");
    console.log("point :", e.target.x(), e.target.y());
    setPointDrag(true);
    const newPoints = [...boxPoints];
    newPoints[index] = e.target.x();
    newPoints[index + 1] = e.target.y();
    setBoxPoints(newPoints);
  };
  const handleDragRect = (e: Konva.KonvaEventObject<DragEvent>) => {
    console.log("rect dragged");
    const position = e.target;
    setPointDrag(false);
    if (position) {
      const offsetX = position.x() - positionRef.current.x;
      const offsetY = position.y() - positionRef.current.y;
      offsetStore.current = { x: offsetX, y: offsetY };
      console.log("offsetX :", offsetX);
      console.log("offsetY :", offsetY);

      const newPoints = initialPointsRef.current.map((point, index) =>
        index % 2 === 0 ? point + offsetX : point + offsetY
      );
      setBoxPoints(newPoints);
    }
  };

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const position = e.target;
    positionRef.current = { x: position.x(), y: position.y() };
    console.log("send : " + boxPoints);
    OnChange(id_bbox, boxPoints, lastoffset);
  };

  const handlePointEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    console.log("send : " + boxPoints);
    OnChange(id_bbox, boxPoints, lastoffset);
  };

  // console.log("is Point Drag ? " + isPointDrag);
  return (
    <>
      <Line
        points={boxPoints.map((point, index) =>
          index % 2 === 0
            ? point - offsetStore.current.x
            : point - offsetStore.current.y
        )}
        stroke="red"
        fill="red"
        opacity={0.5}
        strokeWidth={2}
        closed
        draggable
        onDragMove={handleDragRect}
        onDragEnd={handleDragEnd}
      />
      {boxPoints.map((point, index) =>
        index % 2 === 0 ? (
          <Circle
            key={index}
            x={point}
            y={boxPoints[index + 1]}
            radius={4}
            fill={"black"}
            draggable
            onDragMove={(e) => handlePointDragMove(index, e)}
            onDragEnd={handlePointEnd}
          />
        ) : null
      )}
    </>
  );
};

export default BoundingBox;
