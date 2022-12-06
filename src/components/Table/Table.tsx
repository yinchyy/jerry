import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery, gql } from "@apollo/client";

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
interface Character {
  name: string;
  image: string;
  species: string;
  origin: string;
  gender: string;
  status: string;
}
interface CharacterResult {
  characters: {
    results: Character[];
  };
}

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
    cell: (info) => info.getValue().name,
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
];
export const Table = () => {
  const { data, loading } = useQuery<CharacterResult>(GET_CHARACTERS, {});

  const table = useReactTable({
    data: data ? data.characters.results : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  console.log(data);
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
    </div>
  );
};
