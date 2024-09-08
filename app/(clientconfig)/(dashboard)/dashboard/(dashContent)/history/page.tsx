"use client";

import ContentLayout from "@/app/common/ContentLayout";
import HeaderLayout from "@/app/common/HeaderLayout";
import SubContentLayout from "@/app/common/SubContentLayout";
import ToggleButtonComp from "@/app/common/ToggleButtonComp";
import SummaryCard from "./ui/SummaryCard";
import { Select, MenuItem, TextField } from "@mui/material";

import { useCallback, useMemo, useState } from "react";
import TableHistoryParkings from "./ui/TableHistoryParkings";

const History = () => {
  const [value, _setValue] = useState("day");
  const setValue = useCallback((value: string) => {
    _setValue(value);
  }, []);
  const toggleButtons = useMemo(
    () => [
      {
        text: "Day",
        value: "day",
      },
      {
        text: "Week",
        value: "week",
      },
      {
        text: "Month",
        value: "month",
      },
      {
        text: "All",
        value: "all",
      },
    ],
    []
  );
  return (
    <div className="w-full h-full ">
      <HeaderLayout className="h-fit">
        <div className="flex justify-between w-full ">
          <div className="flex flex-col">
            <h4>Parking History</h4>
            <div className="flex gap-2 items-center">
              <div className="flex gap-1 items-center">
                <p>Parking Date :</p>
                <p>{`Parking Date`}</p>
              </div>
              <div className="flex gap-1 items-center">
                <p>Parking Place :</p>
                <Select value="1">
                  <MenuItem value="1">Value 1</MenuItem>
                  <MenuItem value="2">Value 2</MenuItem>
                  <MenuItem value="3">Value 3</MenuItem>
                </Select>
              </div>
            </div>
          </div>
          <ToggleButtonComp
            toggleButton={toggleButtons}
            value={value}
            setValue={setValue}
          />
        </div>
      </HeaderLayout>
      <SubContentLayout className="min-h-fit">
        <div className="flex items-center gap-3 py-3">
          <SummaryCard />
          <SummaryCard />
        </div>
      </SubContentLayout>
      <SubContentLayout className="min-h-fit ">
        <div className="flex justify-between py-3">
          <Select value="1">
            <MenuItem value="1">Value 1</MenuItem>
            <MenuItem value="2">Value 2</MenuItem>
            <MenuItem value="3">Value 3</MenuItem>
          </Select>
          <TextField value="Test" />
        </div>
      </SubContentLayout>
      <ContentLayout className="h-[50%]">
        <TableHistoryParkings sx={{ height: "100%" }} />
      </ContentLayout>
    </div>
  );
};

export default History;
