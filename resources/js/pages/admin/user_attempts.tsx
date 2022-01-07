// @ts-nocheck
import React, { useMemo } from "react";
import { Link } from "@inertiajs/inertia-react";
import {
  TableInstance,
  useFilters,
  useGlobalFilter,
  usePagination,
  useTable,
} from "react-table";
import { Pagination, Search } from "../../components/Table";
import Layout from "../../components/Layout";
import { ILevel, IUser, IUserAttempt } from "../../lib/types";
import useTitle from "../../lib/use-title";

interface IUserAttemptsProps {
  user_attempts: IUserAttempt[];
  user: IUser;
  level: ILevel;
  error?: string;
}

const Table = ({ tbl }: { tbl: TableInstance<IUserAttempt> }) => (
  <table
    {...tbl.getTableProps()}
    className="w-full mx-auto my-20 bg-gray-800 shadow-md divide-sudo divide-y"
  >
    <thead>
      {tbl.headerGroups.map((headerGroup, i) => (
        <tr
          {...headerGroup.getHeaderGroupProps()}
          key={i}
          className="font-extrabold text-white uppercase bg-sudo"
        >
          {headerGroup.headers.map((column, j) => (
            <th {...column.getHeaderProps()} key={j} className="p-3">
              {column.render("Header")}
            </th>
          ))}
          <th className="p-3"></th>
        </tr>
      ))}
    </thead>
    <tbody {...tbl.getTableBodyProps()} className="divide-y divide-sudo">
      {tbl.page.map((row, i) => {
        tbl.prepareRow(row);
        return (
          <tr {...row.getRowProps()} key={i}>
            {row.cells.map((cell, j) => {
              return (
                <td
                  {...cell.getCellProps()}
                  key={j}
                  className="p-3 text-center"
                >
                  {cell.render("Cell")}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  </table>
);

const UserAttempts: React.FC<IUserAttemptsProps> = ({
  user_attempts,
  user,
  level,
}: IUserAttemptsProps) => {
  useTitle(`Level ${level.id} | @${user.username}`);
  const data = useMemo(() => user_attempts || [], []);
  const columns = useMemo(
    () => [
      { accessor: "id", Header: "ID" },
      { accessor: "attempt", Header: "Attempt" },
      { accessor: "ip", Header: "IP" },
      {
        id: "correct",
        // eslint-disable-next-line react/display-name
        accessor: (x) =>
          x.correct ? (
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          ),
        Header: "Correct",
      },
      { accessor: "created_at", Header: "At" },
    ],
    []
  );
  const tbl = useTable(
    { data, columns: columns as never },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  return (
    <Layout authenticated admin>
      <div className="px-5 py-20 home-container">
        <div className="max-w-[1000px] w-full sm:min-h-screen mx-auto">
          <div className="my-10 flex justify-between">
            <Link
              className="text-md uppercase font-bold text-sudo flex items-center gap-x-2"
              href={`/admin/users/${user.id}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
              <span>Back</span>
            </Link>
            <div className="text-md uppercase font-bold text-sudo">
              Level {level.id}
            </div>
            <div className="text-md uppercase font-bold text-sudo">
              {user.circle?.name}
            </div>
          </div>
          <Pagination tbl={tbl} />
          <Search tbl={tbl} />
          <Table tbl={tbl} />
        </div>
      </div>
    </Layout>
  );
};

export default UserAttempts;
