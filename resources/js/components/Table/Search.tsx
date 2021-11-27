// @ts-nocheck
import React from "react";
import { TableInstance } from "react-table";
import TextInput from "../TextInput";

const Search = ({ tbl }: { tbl: TableInstance<unknown> }) => (
  <div className="w-full mx-auto">
    <TextInput
      type="text"
      placeholder="Search"
      value={tbl.state.globalFilter || ""}
      onChange={(e) => tbl.setGlobalFilter(e.target.value)}
      className="bg-dark-lighter"
    />
  </div>
);

export default Search;
