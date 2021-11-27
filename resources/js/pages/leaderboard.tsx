import React, { ChangeEvent, useRef, useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { IPageProps } from "../lib/types";
import Layout from "../components/Layout";
import useTitle from "../lib/use-title";

interface ILeaderboardUser {
  rank?: number | string;
  username: string;
  institution: string;
  points?: number;
}

interface ILeaderboardProps {
  users: ILeaderboardUser[];
}

const Leaderboard: React.FC<ILeaderboardProps> = ({
  users,
}: ILeaderboardProps) => {
  useTitle("Leaderboard");
  const [displayUsers, setDisplayUsers] = useState<ILeaderboardUser[]>(users);
  const searchRef = useRef<HTMLInputElement>(null);

  const {
    auth: { user },
  } = usePage<IPageProps>().props;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDisplayUsers(
      users.filter(({ username }) =>
        username.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <Layout footer={false} logo={true} navbar={[{ href: "/", label: "Home" }]}>
      <div className="home-container h-screen flex flex-col justify-start p-10">
        <div className="px-10 max-w-[1000px] w-full mx-auto">
          <input
            type="text"
            placeholder="Search"
            ref={searchRef}
            onChange={handleSearch}
            className="w-full bg-gray-600 opacity-70 focus:opacity-90 p-6 text-lg text-white border-t-0 border-r-0 border-l-0 border-b-4 border-gray-400 focus:border-sudo transition"
            style={{ boxShadow: "none" }}
          />
        </div>
        <div className="flex-1 overflow-y-auto p-10 max-w-[1000px] w-full mx-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="font-extrabold text-xl uppercase text-sudo">
                <th className="p-5">Rank</th>
                <th className="p-5">Username</th>
                <th className="p-5">Points</th>
              </tr>
            </thead>
            <tbody>
              {displayUsers.map(({ rank, username, points }, i) => (
                <tr
                  key={i}
                  className={
                    rank === "DQ"
                      ? "text-sudo-dark font-extrabold"
                      : "font-bold"
                  }
                >
                  <td
                    className="text-lg text-center p-5 bg-none"
                    style={{ color: "inerit" }}
                  >
                    {rank}
                  </td>
                  <td
                    className="text-lg text-center p-5 bg-none"
                    style={{ color: "inerit" }}
                  >
                    {username}
                  </td>
                  <td
                    className="text-lg text-center p-5 bg-none"
                    style={{ color: "inerit" }}
                  >
                    {points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
