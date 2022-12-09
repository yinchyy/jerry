import React from "react";
import cx from "classnames";
import { Table } from "@tanstack/react-table";
import { ArrowLeft, ArrowRight } from "./icons";

type PaginationProps = {
  current?: number;
  total?: number;
  itemsAcrossActive?: number;
  table: Table<any>;
};

export const Pagination = ({
  current,
  total,
  itemsAcrossActive = 1,
  table,
}: PaginationProps) => {
  const buttonStyles = [
    "flex",
    "min-h-[40px]",
    "min-w-[40px]",
    "items-center",
    "justify-center",
    "rounded-default",
    "border",
    "border-blue-40",
    "bg-white",
    "p-1 shadow-md",
  ];
  return (
    <div className="flex flex-row gap-2">
      <button
        className={cx(buttonStyles)}
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ArrowLeft />
      </button>
      <button
        className={cx(buttonStyles, {
          "bg-blue-10": table.getState().pagination.pageIndex === 0,
        })}
        onClick={() => table.setPageIndex(0)}
      >
        1
      </button>
      <button
        className={cx(buttonStyles, {
          "bg-blue-10":
            table.getState().pagination.pageIndex === table.getPageCount() - 1,
        })}
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
      >
        {table.getPageCount()}
      </button>
      <button
        className={cx(buttonStyles)}
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ArrowRight />
      </button>
    </div>
  );
};
