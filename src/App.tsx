import React from "react";
import { Search } from "./components/Search";
import { Table } from "./components/Table";

function App() {
  return (
    <div className="flex min-h-screen min-w-full bg-blue-0">
      <div className="container px-6">
        <p className="text-base font-bold text-anthracite-100">Characters</p>
        <Search />
        <Table />
      </div>
    </div>
  );
}

export default App;
