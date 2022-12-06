import React from "react";
import { Search } from "./components/Search";
import { Table } from "./components/Table";
import { useQuery, gql } from "@apollo/client";
import { CharacterResult } from "./types";

const GET_CHARACTERS = gql`
  query getCharacters {
    characters {
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
  const { data, loading } = useQuery<CharacterResult>(GET_CHARACTERS);
  return (
    <div className="flex min-h-screen min-w-full bg-blue-0">
      <div className="container px-6">
        <p className="text-base font-bold text-anthracite-100">Characters</p>
        <Search />
        <Table data={data?.characters.results} loading={loading} />
      </div>
    </div>
  );
}

export default App;
