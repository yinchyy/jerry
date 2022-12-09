/* eslint-disable react-hooks/exhaustive-deps */
import React, { SetStateAction, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import cx from "classnames";
import { Character } from "../../types";
import { Dead, Alive, Unknown } from "./icons";
import { Pagination } from "./Pagination";

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor("name", {
    header: () => (
      <input
        type="checkbox"
        className="appearance-none rounded-[2px] border border-blue-40 p-2 checked:bg-anthracite-70"
      />
    ),
    cell: (info) => (
      <>
        <input
          type="checkbox"
          className="appearance-none rounded-[2px] border border-blue-40 p-2 checked:bg-anthracite-70"
        />
      </>
    ),
  }),
  columnHelper.accessor("combined", {
    header: () => "Name",
    cell: (info) => (
      <>
        <p>{info.getValue().name}</p>
        <p className="text-anthracite-80">{info.getValue().species}</p>
      </>
    ),
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
    cell: (info) => (
      <p
        className={cx({
          "text-anthracite-25": info.getValue().name === "unknown",
        })}
      >
        {info.getValue().name}
      </p>
    ),
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      if (info.getValue() === "Dead") {
        return (
          <div className="flex flex-row content-center items-center text-anthracite-100">
            <Dead className="mr-1" />
            Dead
          </div>
        );
      }
      if (info.getValue() === "Alive") {
        return (
          <div className="flex flex-row content-center items-center text-anthracite-100">
            <Alive className="mr-1" />
            Alive
          </div>
        );
      }
      if (info.getValue() === "unknown") {
        return (
          <div className="flex flex-row content-center items-center text-anthracite-70">
            <Unknown className="mr-1" />
            unknown
          </div>
        );
      }
    },
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
    data: data
      ? data.map((value) => {
          return {
            ...value,
            combined: { name: value.name, species: value.species },
          };
        })
      : [],
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
    if (
      table.getState().pagination.pageIndex >= table.getPageCount() &&
      !loading
    ) {
      table.setPageIndex(0);
    }
  }, [data]);
  useEffect(() => {
    setCurrent(() => table.getState().pagination.pageIndex + 1);
  }, [table.getState().pagination.pageIndex]);
  if (loading) {
    return <div>data loading...</div>;
  }
  return (
    <>
      <table className="min-w-full divide-y divide-blue-30 rounded-default bg-white drop-shadow-md">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-anthracite-80">
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  className={cx({
                    "py-2 text-start": index !== 0,
                    "flex flex-row items-center justify-center py-3":
                      index === 0,
                  })}
                >
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
        <tbody className="divide-y divide-blue-15">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={cx({
                "bg-blue-5": row.getValue("status") === "Dead",
                "text-anthracite-70": row.getValue("status") === "Dead",
              })}
            >
              {row.getVisibleCells().map((cell, index) => (
                <td
                  key={cell.id}
                  className={cx("py-3", {
                    "flex flex-row justify-center pt-4": index === 0,
                  })}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination table={table} />
    </>
  );
};
