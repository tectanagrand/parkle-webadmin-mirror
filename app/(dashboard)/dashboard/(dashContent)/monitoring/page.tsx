"use client";
<<<<<<< HEAD
import CameraView from "@/app/common/CameraView";
import CanvasComponent from "@/app/common/CanvasComponent";
=======
import CameraView from "./ui/CameraView";
>>>>>>> 85e1bd3c84bb0bdfc2cf6c15b586bf65a0f80d61
import ContentLayout from "@/app/common/Content Layout";
import HeaderLayout from "@/app/common/HeaderLayout";
import StatusParking from "./ui/StatusParking";
import ThumbnailCard from "@/app/common/ThumbnailCard";
import ThumbnailList from "./ui/ThumbnailList";
export default function DashboardPage() {
  return (
    <div className="min-w-full min-h-full items-center justify-center">
      <HeaderLayout>
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
      <ContentLayout>
<<<<<<< HEAD
        <div className="flex">
          <div className="flex flex-col">
            <CameraView>
              <CanvasComponent />
            </CameraView>
            <TableStatusParking />
=======
        <div className="flex justify-between">
          <div className="flex flex-col min-w-[50vw]">
            <CameraView />
            <StatusParking/>
>>>>>>> 85e1bd3c84bb0bdfc2cf6c15b586bf65a0f80d61
          </div>
          <ThumbnailList/>
        </div>
      </ContentLayout>
    </div>
  );
}
