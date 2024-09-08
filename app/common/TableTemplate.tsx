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
  SxProps,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
interface TableDef<T> {
  rows: Array<T>;
  columns: ColumnDef<T, any>[];
  options?: TableOptions<T>;
  sx?: SxProps;
  stickyHeader?: boolean;
}

export default function TableTemplate<T>({
  rows,
  columns,
  options,
  sx,
  stickyHeader,
}: TableDef<T>) {
  const theme = useTheme();
  const table = useReactTable({
    ...options,
    data: rows,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer sx={sx}>
      <Table stickyHeader={stickyHeader}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroups) => {
            return (
              <TableRow key={headerGroups.id}>
                {headerGroups.headers.map((header) => {
                  return (
                    <TableCell
                      key={header.id}
                      colSpan={header.colSpan}
                      sx={{
                        width: `${header.getSize()}%`,
                      }}
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
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow
                key={row.id}
                sx={{
                  borderTopWidth: "1px",
                  borderTopStyle: "solid",
                  borderColor: theme.palette.grey[200],
                }}
              >
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
      </Table>
    </TableContainer>
  );
}
