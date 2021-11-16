import React, { ChangeEvent, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { usePage } from "@inertiajs/inertia-react";
import { IPageProps } from "../lib/types";

const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  tr {
    width: 100%;
    overflow: hidden;
  }
  tbody tr.first {
    color: #ffd700;
    font-weight: bold;
  }
  tbody tr.second {
    color: #c0c0c0;
    font-weight: bold;
  }
  tbody tr.third {
    color: #cd7f32;
    font-weight: bold;
  }
  tbody tr.top15 {
    font-weight: bold;
  }
  tbody tr.dq {
    font-weight: bold;
    color: #555;
  }
  th,
  td {
    padding: 15px 30px;
    font-size: 1.1rem;
    text-align: center;
  }
  th {
    font-size: 1.3rem;
    font-family: "Bruta Pro", "Lufga";
  }
`;

const SearchInput = styled.input`
  display: block;
  margin-bottom: 20px;
  width: 100%;
  background: none;
  color: inherit;
  font-size: 1.2rem;
  padding: 20px;
  border: none;
  border-bottom: 5px solid #282828;
  transition: border 0.3s ease, background 0.3s ease;
  &:focus {
    border-bottom-color: #fff;
    background: #282828;
    outline: none;
  }
`;

interface ILeaderboardUser {
  rank: number;
  username: string;
  institution: string;
  points: number;
}

interface IDQUser {
  username: string;
  points: number;
}

interface ILeaderboardProps {
  users: ILeaderboardUser[];
  dq: IDQUser[];
}

const Leaderboard: React.FC<ILeaderboardProps> = ({
  users,
  dq,
}: ILeaderboardProps) => {
  const [displayUsers, setDisplayUsers] = useState<ILeaderboardUser[]>(users);
  const [displayDQUsers, setDisplayDQUsers] = useState<IDQUser[]>(dq);
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
    setDisplayDQUsers(
      dq.filter(({ username }) =>
        username.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const rowClassname = (rank: number) =>
    rank === 1
      ? "first"
      : rank === 2
        ? "second"
        : rank === 3
          ? "third"
          : rank <= 15
            ? "top15"
            : "";

  return (
    <>
      <Navbar authenticated={true} name={user.name} />
      <div>
        <SearchInput
          placeholder="Search"
          ref={searchRef}
          onChange={handleSearch}
        />

        <LeaderboardTable>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {displayUsers.map(({ rank, username, points }) => (
              <tr key={rank} className={rowClassname(rank)}>
                <td>{rank}</td>
                <td>{username}</td>
                <td>{points}</td>
              </tr>
            ))}
            {displayDQUsers.map(({ username, points }, index) => (
              <tr key={index} className="dq">
                <td>DQ</td>
                <td>{username}</td>
                <td>-{points}</td>
              </tr>
            ))}
          </tbody>
        </LeaderboardTable>
      </div>
    </>
  );
};

export default Leaderboard;
