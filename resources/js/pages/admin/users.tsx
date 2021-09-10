import React from "react";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  tr td {
    text-align: center;
  }

  th,
  td {
    padding: 15px 10px;
  }

  tbody tr:nth-child(even) {
    background: #ffffff10;
  }

  thead tr {
    background: white;
    color: #333;
  }
`;

export interface IUser {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  username: string;
  institution: string;
  discord_id: string;
  discord_username: string;
  discord_discriminator: string;
  discord_email: string;
  admin: boolean;
  disqualified: boolean;
  level: number;
  points: number;
}

interface IUsersProps {
  users: IUser[];
}

const Users: React.FC<IUsersProps> = ({ users }: IUsersProps) => {
  return (
    <>
      <div style={{ maxWidth: "1000px", paddingBottom: "100px" }}>
        <Table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Discord</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.discord_id
                    ? `@${user.discord_username}#${user.discord_discriminator}`
                    : "Not connected"}
                </td>
                <td>
                  <a href={`/admin/users/${user.id}`}>More</a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Users;
