import React, { useState } from "react";
import cx from "classnames";
import { gql, useApolloClient } from "@apollo/client";
import { SpeciesResult } from "../../types";

type SelectProps = {
  options: string[];
} & React.InputHTMLAttributes<HTMLSelectElement>;

const GET_SPECIES = gql`
  query getSpecies($page: Int) {
    characters(page: $page) {
      info {
        next
      }
      results {
        species
      }
    }
  }
`;
export const Select = ({ options, ...props }: SelectProps) => {
  const [selected, setSelected] = useState(() => false);
  const client = useApolloClient();
  const [data, setData] = useState<string[]>(() => []);
  const [loading, setLoading] = useState(true);
  const fetchAll = async () => {
    const allResults: string[] = [];
    for (let i = 1; i < 6; i++) {
      const { data } = await client.query<SpeciesResult>({
        query: GET_SPECIES,
        variables: { page: i },
      });
      allResults.push(...data.characters.results.map((value) => value.species));
    }
    setLoading(false);
    setData(Array.from(new Set(allResults)));
  };
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
      <select
        className={cx("bg-white", "w-full", "focus:outline-none", {
          "text-anthracite-80": !selected,
          "text-anthracite-100": selected,
        })}
        placeholder="Search"
        onChange={() => setSelected(true)}
        onFocus={async () => {
          if (data.length === 0 && !selected && !loading) {
            fetchAll();
          }
        }}
        {...props}
      >
        <option disabled selected hidden>
          Select
        </option>
        {loading ? <option>Loading...</option> : null}
        {data!.map((value, index) => (
          <option key={index}>{value}</option>
        ))}
      </select>
    </div>
  );
};
