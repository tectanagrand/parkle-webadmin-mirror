import TableTemplate from "./TableTemplate";
import { ParkingStatus } from "@/mock/ParkingStatus";
import { createColumnHelper } from "@tanstack/react-table";
import StatusBadge from "./StatusBadge";

interface StatusParking {
  parking_id: string;
  customers: string;
  time: string;
  status: string;
}

function determineStatus(label: string): string {
  let status = "";
  switch (label) {
    case "Parking Filled":
      status = "success";
      break;
    case "Empty":
      status = "idle";
      break;
    case "Booking":
      status = "primary";
      break;
  }

  return status;
}

const columnHelper = createColumnHelper<StatusParking>();
export default function TableStatusParking() {
  const column = [
    columnHelper.accessor("parking_id", {
      header: "PARKING ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("customers", {
      header: "CUSTOMER",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("time", {
      header: "TIME",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "STATUS",
      cell: (info) => {
        const status = determineStatus(info.getValue());
        return <StatusBadge label={info.getValue()} mode={status} />;
      },
      meta: {
        align: "left",
      },
    }),
  ];
  const rows = ParkingStatus;

  return (
    <TableTemplate rows={rows} columns={column} sx={{ height: "13rem" }} />
  );
}
