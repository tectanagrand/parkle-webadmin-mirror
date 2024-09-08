import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  TableOptions,
} from "@tanstack/react-table";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  Pagination,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { JSXElementConstructor } from "react";
interface TableDef<T> {
  rows: Array<T>;
  columns: ColumnDef<T, any>[];
  options?: TableOptions<T>;
  sx?: Object;
  pageSize: number;
  pageIndex: number;
  pageCount: number;
  setPageProps: any;
  isLoading: boolean;
}

import { useTheme } from "@mui/material/styles";

export default function TablePagination<T>({
  rows,
  columns,
  options,
  sx,
  pageSize,
  pageIndex,
  pageCount,
  setPageProps,
  isLoading,
}: TableDef<T>) {
  const table = useReactTable({
    ...options,
    data: rows,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const theme = useTheme();

  return (
    <Box sx={sx}>
      <TableContainer sx={{ height: "85%", width: "100%" }}>
        <Table stickyHeader>
          <TableHead>
            {table.getHeaderGroups().map((headerGroups) => {
              return (
                <TableRow key={headerGroups.id}>
                  {headerGroups.headers.map((header) => {
                    return (
                      <TableCell
                        key={header.id}
                        colSpan={header.colSpan}
                        sx={{ py: "0.6rem", width: `${header.getSize()}px` }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHead>
          <TableBody>
            {!isLoading &&
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id} sx={{ py: "0.6rem" }}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer sx={{ height: "15%", width: "100%" }}>
        <Table sx={{ height: "100%" }}>
          <TableFooter>
            <TableRow>
              <TableCell
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "100%",
                  padding: "0 2rem 0 2rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <p>Showing</p>
                  <FormControl size="small">
                    <Select
                      value={pageSize}
                      onChange={(e) => {
                        setPageProps((prev: any) => ({
                          ...prev,
                          pageSize: e.target.value,
                        }));
                      }}
                      sx={{ fontSize: "10pt", height: "2rem" }}
                    >
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                    </Select>
                  </FormControl>
                  <p>Of</p>
                  <p>{pageCount}</p>
                </Box>
                <Pagination
                  count={Math.round(pageCount / pageSize)}
                  shape="rounded"
                  page={pageIndex}
                  onChange={(e, value) => {
                    setPageProps((prev: any) => ({
                      ...prev,
                      pageIndex: value,
                    }));
                  }}
                  size="small"
                  color="primary"
                  sx={{ fontSize: "8pt" }}
                ></Pagination>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}
