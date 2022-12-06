import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Character } from "../../types";

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor("name", {
    header: () => "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("image", {
    header: () => "Avatar",
    cell: (info) => (
      <img
        className="max-h-[50px] max-w-[50px] rounded-[15px]"
        src={info.getValue()}
        alt="Avatar"
      />
    ),
  }),
  columnHelper.accessor("origin", {
    header: () => "Origin",
    cell: (info) =>
      info.getValue().name ? info.getValue().name : info.getValue(),
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
];
export const Table = ({
  data,
  loading,
}: {
  data: Character[] | undefined;
  loading: boolean;
}) => {
  const table = useReactTable({
    data: data ? data : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  if (loading) {
    return <div>data loading...</div>;
  }
  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-anthracite-80">
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};
