"use client";

import { useEffect, useState, useMemo } from "react";
import TablePagination from "@/app/common/TablePaginationTemplate";
import { createColumnHelper } from "@tanstack/react-table";
import useSWR from "swr";
import ActionsMenu from "@/app/common/ActionsMenu";

interface ListParkings {
  customer: string;
  license_plate: string;
  parking_loc: string;
  parking_spot: string;
  parking_dur: string;
  parking_price: string;
}

const columnHelper = createColumnHelper<ListParkings>();

const TableHistoryParkings = ({ sx }: any) => {
  const [pageProps, setPageProps] = useState({
    pageIndex: 1,
    pageSize: 5,
    pageCount: 0,
  });
  const { data, isLoading, error } = useSWR(
    `/list_parkings?_page=${pageProps.pageIndex}&_limit=${pageProps.pageSize}`
  );
  const { data: allData, error: allDataerr } = useSWR(`/list_parkings?`);

  useEffect(() => {
    setPageProps((prev) => ({ ...prev, pageCount: allData?.length ?? 0 }));
  }, [allData]);
  const columns = [
    columnHelper.display({
      header: "Number",
      cell: ({ row }) => row.index,
      size: 100,
    }),
    columnHelper.accessor("customer", {
      header: "Customer",
      cell: (info) => info.getValue(),
      size: 300,
    }),
    columnHelper.accessor("parking_loc", {
      header: "Location",
      cell: (info) => info.getValue(),
      size: 200,
    }),
    columnHelper.accessor("parking_spot", {
      header: "Parking Spot",
      cell: (info) => info.getValue(),
      size: 100,
    }),
    columnHelper.accessor("parking_dur", {
      header: "Parking Duration",
      cell: (info) => info.getValue(),
      size: 200,
    }),
    columnHelper.accessor("parking_price", {
      header: "Parking Price",
      cell: (info) => info.getValue(),
      size: 200,
    }),
  ];
  return (
    <TablePagination
      rows={!error ? data : []}
      columns={columns}
      pageIndex={pageProps.pageIndex}
      pageSize={pageProps.pageSize}
      pageCount={pageProps.pageCount}
      setPageProps={setPageProps}
      isLoading={isLoading}
      sx={sx}
    />
  );
};

export default TableHistoryParkings;
