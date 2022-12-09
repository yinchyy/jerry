import React, { useState } from "react";
import cx from "classnames";
import { gql, useApolloClient } from "@apollo/client";
import { SpeciesResult } from "../../types";

type SelectProps = {
  nameFilter: string;
} & React.InputHTMLAttributes<HTMLSelectElement>;

const GET_SPECIES = gql`
  query getSpecies($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        next
      }
      results {
        name
        species
      }
    }
  }
`;
export const Select = ({ nameFilter, ...props }: SelectProps) => {
  const [selected, setSelected] = useState(() => false);
  const client = useApolloClient();
  const [data, setData] = useState<string[]>(() => []);
  const [loading, setLoading] = useState(true);
  const [previousValue, setPreviousValue] = useState<string>(() => "");
  const fetchAll = async () => {
    let nextPage: number | null = 1;
    setData(() => []);
    setLoading(() => true);
    while (nextPage) {
      const { data }: { data: SpeciesResult } =
        await client.query<SpeciesResult>({
          query: GET_SPECIES,
          variables: { page: nextPage, filter: { name: nameFilter } },
        });
      setPreviousValue(() => nameFilter);
      nextPage = data.characters.info.next;
      setData((prevState) =>
        Array.from(
          new Set([
            ...prevState,
            ...data.characters.results.map(
              (value: { species: string }) => value.species
            ),
          ])
        )
      );
    }
    setLoading(false);
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
        "w-full",
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
          if (
            (data.length === 0 && !selected) ||
            nameFilter !== previousValue
          ) {
            fetchAll();
          }
        }}
        defaultValue={-1}
        {...props}
      >
        <option disabled value={-1} hidden>
          Select
        </option>
        {loading ? <option disabled>Loading...</option> : null}
        {data!.map((value, index) => (
          <option value={value} key={index}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};
