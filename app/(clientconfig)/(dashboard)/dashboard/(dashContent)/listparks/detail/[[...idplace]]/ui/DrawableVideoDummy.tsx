"use client";

interface Rectangle {
  points: number[];
  id_bbox: string;
  lastoffset: { x: number; y: number };
}

interface DrawableVideoProps {
  link: string;
  label: string;
}

const DrawableVideo = ({ link, label }: DrawableVideoProps) => {
  return (
    <div className="w-[460px] h-[250px] bg-slate-400 rounded-lg">
      <div className="z-[2000] flex justify-end ">
        <div className="max-w-fit p-2 h-8 bg-secondary rounded-tr-lg rounded-bl-lg">
          <p className="text-secondary-contrasttext">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default DrawableVideo;
