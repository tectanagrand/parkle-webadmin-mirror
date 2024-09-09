"use client";

import { useEffect, useState, useMemo } from "react";
import TablePagination from "@/app/common/TablePaginationTemplate";
import { createColumnHelper } from "@tanstack/react-table";
import useSWR from "swr";
import ActionsMenu from "@/app/common/ActionsMenu";

interface ListParkings {
  parking_id: string;
  parking_name: string;
  coordinate: number;
  total_spot: number;
  create_time: string;
}

const columnHelper = createColumnHelper<ListParkings>();

const TableListParkings = ({ sx }: any) => {
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
    columnHelper.accessor("parking_id", {
      header: "Parking ID",
      cell: (info) => info.getValue(),
      size: 100,
    }),
    columnHelper.accessor("parking_name", {
      header: "Parking Name",
      cell: (info) => info.getValue(),
      size: 300,
    }),
    columnHelper.accessor("coordinate", {
      header: "Coordinate",
      cell: (info) => info.getValue(),
      size: 200,
    }),
    columnHelper.accessor("total_spot", {
      header: "Total Spot",
      cell: (info) => info.getValue(),
      size: 100,
    }),
    columnHelper.accessor("create_time", {
      header: "Create Time",
      cell: (info) => info.getValue(),
      size: 200,
    }),
    columnHelper.display({
      id: "actions",
      cell: ({ row }) => {
        const ActionsItemList = [
          {
            icon: "Edit",
            menutext: "Edit",
            onClickAction: (id: string) => {
              console.log(id);
            },
          },
          {
            icon: "Delete",
            menutext: "Delete",
            onClickAction: (id: string) => {
              console.log(id);
            },
          },
        ];

        return (
          <ActionsMenu
            key={row.id}
            menuitems={ActionsItemList}
            id={row.original.parking_id}
          />
        );
      },
      size: 50,
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

export default TableListParkings;
