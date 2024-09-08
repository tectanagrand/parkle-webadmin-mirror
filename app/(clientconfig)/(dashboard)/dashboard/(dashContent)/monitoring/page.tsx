"use client";
import CameraView from "./ui/CameraView";
import CanvasComponent from "@/app/common/CanvasComponent";
import ContentLayout from "@/app/common/ContentLayout";
import HeaderLayout from "@/app/common/HeaderLayout";
import StatusParking from "./ui/StatusParking";
import ThumbnailList from "./ui/ThumbnailList";

import { useRef } from "react";
export default function DashboardPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <div className="min-w-full h-full items-center justify-center">
      <HeaderLayout className="h-[20%]">
        <div>
          <h4 className="font-semibold my-0">Monitoring Parking</h4>
          <div className="flex gap-2 py-4">
            <div>
              <p className="text-slate-400 font-medium">Camera</p>
              <p className="pt-2">Camera 1</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Parking Place</p>
              <p className="pt-2">Group A</p>
            </div>
          </div>
        </div>
      </HeaderLayout>
      <ContentLayout className="h-[80%]">
        <div className="flex h-full">
          <div className="flex flex-col min-w-[50vw] h-full gap-1">
            <CameraView>
              <CanvasComponent canvasRef={canvasRef} />
            </CameraView>
            <StatusParking />
          </div>
          <ThumbnailList />
        </div>
      </ContentLayout>
    </div>
  );
}
