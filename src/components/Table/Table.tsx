/* eslint-disable react-hooks/exhaustive-deps */
import React, { SetStateAction, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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
  totalPages,
  setCurrent,
}: {
  data: Character[] | undefined;
  loading: boolean;
  totalPages: number;
  setCurrent: React.Dispatch<SetStateAction<number>>;
}) => {
  const table = useReactTable({
    data: data ? data : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });
  useEffect(() => {
    table.setPageSize(5);
  }, []);
  useEffect(() => {
    setCurrent(() => table.getState().pagination.pageIndex + 1);
  }, [table.getState().pagination.pageIndex]);
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
      <div className="flex items-center gap-2">
        <button
          className="rounded border p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="rounded w-16 border p-1"
          />
        </span>
      </div>
    </div>
  );
};
