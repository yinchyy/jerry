import React from "react";
import cx from "classnames";
import { ReactComponent as SearchIcon } from "./search.svg";

export const Search = () => {
  return (
    <div
      className={cx(
        "border",
        "rounded-default",
        "border-blue-40",
        "overflow-hidden",
        "bg-white",
        "flex",
        "justify-between",
        "items-center",
        "md:max-w-[150px]",
        "px-2",
        "py-2"
      )}
    >
      <input
        className={cx("bg-white", "w-full", "focus:outline-none")}
        placeholder="Search"
      />
      <SearchIcon />
    </div>
  );
};
