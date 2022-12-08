import React, { useState } from "react";
import { Search } from "./components/Search";
import { Table } from "./components/Table";
import { useQuery, gql } from "@apollo/client";
import { CharacterResult } from "./types";
import { Select } from "./components/Select";

const GET_CHARACTERS = gql`
  query getCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
      }
      results {
        name
        image
        species
        origin {
          name
        }
        gender
        status
      }
    }
  }
`;
function App() {
  const [filterValue, setFilterValue] = useState<string>(() => "");
  const [currentPage, setCurrentPage] = useState<number>(() => 1);
  const { data, loading } = useQuery<CharacterResult>(GET_CHARACTERS, {
    variables: {
      page: Math.ceil(currentPage / 4),
      filter: { species: filterValue },
    },
    notifyOnNetworkStatusChange: true,
  });
  let startIndex = (5 * (currentPage - 1)) % 20;
  const [search, setSearch] = useState<string>(() => "");
  return (
    <div className="flex min-h-screen min-w-full bg-blue-0">
      <div className="container px-6">
        <p className="text-base font-bold text-anthracite-100">Characters</p>
        <Search
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <Select onChange={(e) => setFilterValue(e.currentTarget.value)} />
        <Table
          data={data?.characters.results.slice(startIndex, startIndex + 5)}
          loading={loading}
          totalPages={
            data?.characters.info.count
              ? Math.ceil(data.characters.info.count / 5)
              : 0
          }
          setCurrent={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default App;
