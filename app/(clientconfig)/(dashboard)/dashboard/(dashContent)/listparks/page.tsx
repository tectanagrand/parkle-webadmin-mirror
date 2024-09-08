"use client";

import HeaderLayout from "@/app/common/HeaderLayout";
import SubContentLayout from "@/app/common/SubContentLayout";
import ContentLayout from "@/app/common/ContentLayout";
import TableListParkings from "./ui/TableListParkings";
import Link from "next/link";
import { Button, MenuItem, Select, TextField } from "@mui/material";
export default function ListParks() {
  return (
    <div className="min-w-full h-full items-center justify-center">
      <HeaderLayout className="h-[12%]">
        <div className="flex justify-between items-center h-full">
          <div>
            <h4 className="font-semibold my-0">List Of Parking Place</h4>
            <div className="flex">
              <div>
                <p className="text-slate-400 font-medium">
                  Type of the caption
                </p>
                {/* <p className="pt-2">Group A</p> */}
              </div>
            </div>
          </div>
          <div>
            <Link href="/dashboard/listparks/detail">
              <Button variant="contained" className="fill-primary">
                + Add Parking Place
              </Button>
            </Link>
          </div>
        </div>
      </HeaderLayout>
      <SubContentLayout className="h-[12%]">
        <div className="flex justify-between py-3 items-center">
          <Select value="1">
            <MenuItem value="1">Value 1</MenuItem>
            <MenuItem value="2">Value 2</MenuItem>
            <MenuItem value="3">Value 3</MenuItem>
          </Select>
          <TextField value="Test" />
        </div>
      </SubContentLayout>
      <ContentLayout className="h-[74%]">
        <TableListParkings sx={{ height: "100%" }} />
      </ContentLayout>
    </div>
  );
}
