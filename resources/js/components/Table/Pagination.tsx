// @ts-nocheck
import React from "react";
import { TableInstance } from "react-table";

const Pagination = ({ tbl }: { tbl: TableInstance<unknown> }) => (
  <div className="w-full mx-auto flex items-center justify-between">
    <div className="flex gap-x-3">
      <button
        onClick={() => tbl.gotoPage(0)}
        disabled={!tbl.canPreviousPage}
        className="flex items-center justify-center w-10 h-10 text-xs font-extrabold text-white rounded-lg bg-sudo disabled:bg-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={() => tbl.previousPage()}
        disabled={!tbl.canPreviousPage}
        className="flex items-center justify-center w-10 h-10 text-xs font-extrabold text-white rounded-lg bg-sudo disabled:bg-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </button>
      <button
        onClick={() => tbl.nextPage()}
        disabled={!tbl.canNextPage}
        className="flex items-center justify-center w-10 h-10 text-xs font-extrabold text-white rounded-lg bg-sudo disabled:bg-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </button>
      <button
        onClick={() => tbl.gotoPage(tbl.pageCount - 1)}
        disabled={!tbl.canNextPage}
        className="flex items-center justify-center w-10 h-10 text-xs font-extrabold text-white rounded-lg bg-sudo disabled:bg-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>
    </div>
    <div className="flex items-center flex-1 px-10 gap-x-3">
      <span className="font-bold text-gray-600 uppercase">Goto</span>
      <input
        type="number"
        placeholder="Page"
        className="flex-1 bg-dark-lighter text-gray-200 block w-full border-0 rounded-lg !ring-sudo !border-sudo !outline-sudo focus:ring-2 transition py-4 px-4"
        onChange={(e) => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0;
          tbl.gotoPage(page);
        }}
      />
    </div>
    <select
      value={tbl.pageSize}
      defaultValue={200}
      onChange={(e) => {
        tbl.setPageSize(Number(e.target.value));
      }}
      className="w-1/4 bg-dark-lighter text-gray-200 block w-full border-0 rounded-lg !ring-sudo !border-sudo !outline-sudo focus:ring-2 transition py-4 px-4"
    >
      {[50, 100, 200, 500].map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          Show {pageSize}
        </option>
      ))}
    </select>
  </div>
);

export default Pagination;
