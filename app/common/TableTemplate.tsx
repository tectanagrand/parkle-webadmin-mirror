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
} from "@mui/material";
import { JSXElementConstructor } from "react";
interface TableDef<T> {
  rows: Array<T>;
  columns: ColumnDef<T, any>[];
  options?: TableOptions<T>;
  CustomFooter?: any;
}

export default function TableTemplate<T>({
  rows,
  columns,
  options,
  CustomFooter,
}: TableDef<T>) {
  const table = useReactTable({
    ...options,
    data: rows,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroups) => {
            return (
              <TableRow key={headerGroups.id}>
                {headerGroups.headers.map((header) => {
                  return (
                    <TableCell key={header.id} colSpan={header.colSpan}>
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
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>
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
        {CustomFooter ? <CustomFooter /> : <></>}
      </Table>
    </TableContainer>
  );
}
