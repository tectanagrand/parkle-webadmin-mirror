"use client";
import CameraView from "@/app/common/CameraView";
import ContentLayout from "@/app/common/Content Layout";
import HeaderLayout from "@/app/common/HeaderLayout";
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
        <div className="flex">
          <div>
            <CameraView />
          </div>
        </div>
      </ContentLayout>
    </div>
  );
}
