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
  function getPages(active: number, count: number): string[] {
    const arr: string[] = [];
    if (count < 6) {
      for (let i = 0; i < count; i++) {
        arr.push(i.toString());
      }
      return arr;
    }
    for (let i = 0; i < 3; i++) {
      arr.push(i.toString());
    }
    if (active >= 4) {
      arr.push("...");
    }
    if (active >= 3 && active <= count - 4) {
      arr.push(active.toString());
    }
    if (active <= count - 5) {
      arr.push("...");
    }
    for (let i = count - 3; i < count; i++) {
      arr.push(i.toString());
    }
    return arr;
  }
  return (
    <div className="flex flex-row gap-2">
      <button
        className={cx(buttonStyles)}
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ArrowLeft />
      </button>
      {getPages(
        table.getState().pagination.pageIndex,
        table.getPageCount()
      ).map((value) => {
        if (value === "...") {
          return "...";
        }
        return (
          <button
            className={cx(buttonStyles, {
              "bg-blue-10":
                table.getState().pagination.pageIndex === parseInt(value),
            })}
            onClick={() => table.setPageIndex(parseInt(value))}
          >
            {parseInt(value) + 1}
          </button>
        );
      })}
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
