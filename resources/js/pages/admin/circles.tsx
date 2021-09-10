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

export interface ICircle {
  id: number;
  name: string;
  onlyOneLevel: boolean;
}

interface ICircleProps {
  circles: ICircle[];
}

const Users: React.FC<ICircleProps> = ({ circles }: ICircleProps) => {
  return (
    <>
      <div style={{ maxWidth: "1000px", paddingBottom: "100px" }}>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Only One Level?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {circles.map((circle, i) => (
              <tr key={i}>
                <td>{circle.name}</td>
                <td>{circle.onlyOneLevel ? "Yes" : "No"}</td>
                <td>
                  <a href={`/admin/circles/${circle.id}`}>Edit</a>
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
