import { Link, useForm, usePage } from "@inertiajs/inertia-react";
import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { IPageProps } from "../lib/types";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  td {
    text-align: center;
  }

  th,
  td {
    padding: 15px 10px;
  }

  tbody th:nth-child(even) {
    background: #ffffff10;
  }

  thead th {
    background: white;
    color: #333;
  }
`;

interface IUserProps {
  user_profile: {
    id: number;
    name: string;
    username: string;
    circle: number;
    institution: string;
    discord_username?: string;
    discord_discriminator?: string;
    points: number;
    disqualified: boolean;
  };
  user_attempts: {
    level: number;
    attempt: string;
    circle: {
      name: string;
    };
    correct_answer: string;
  }[];
}

interface IFormProps {
  url: string;
  post: any;
  processing: boolean;
  buttonLabel: string;
}

const SingleButtonForm: React.FC<IFormProps> = ({
  url,
  post,
  processing,
  buttonLabel,
}: IFormProps) => {
  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();
        post(url);
      }}
    >
      <button
        className="mt-4 bg-dark rounded py-4 px-6 block text-center"
        type="submit"
        disabled={processing}
      >
        {buttonLabel}
      </button>
    </form>
  );
};

const User: React.FC<IUserProps> = ({
  user_profile: _user,
  user_attempts: attempts,
}: IUserProps) => {
  const {
    auth: { user },
  } = usePage<IPageProps>().props;
  const { post, processing } = useForm({});
  return (
    <>
      <Navbar authenticated={true} name={user.name} />
      <div
        className="w-full flex justify-center items-center"
        style={{ height: "calc(100vh - 98px)" }}
      >
        <div className="h-auto bg-gray-700 p-8 rounded">
          {/* {JSON.sthingify(user, null, 2)} */}
          <div>
            <p className="font-bold">Name:</p>
            <p>{_user.name}</p>
          </div>
          <div>
            <p className="font-bold">Username:</p>
            <p>{_user.username}</p>
          </div>
          <div>
            <p className="font-bold">Institution:</p>
            <p>{_user.institution}</p>
          </div>
          <div>
            <p className="font-bold">Points:</p>
            <p>{_user.points}</p>
          </div>
          {(_user.id === user.id || user.admin) && (
            <>
              <div>
                <p className="font-bold">Discord:</p>
                {_user.discord_username ? (
                  <p>
                    {_user.discord_username + "#" + _user.discord_discriminator}
                  </p>
                ) : _user.id === user.id ? (
                  <a
                    className="bg-dark rounded py-4 px-6 block text-center"
                    href="/connectdiscord"
                  >
                    Connect Discord
                  </a>
                ) : (
                  <p>Not Connected</p>
                )}
              </div>
            </>
          )}
          {_user.id === user.id && (
            <Link
              className="mt-4 bg-dark rounded py-4 px-6 block text-center"
              href="auth/logout"
            >
              Logout
            </Link>
          )}
          {user.admin && (
            <SingleButtonForm
              url={"/admin/users/" + _user.id + "/dq"}
              buttonLabel={_user.disqualified ? "Undisqualify" : "Disqualify"}
              post={post}
              processing={processing}
            />
          )}
        </div>
      </div>
      <div className="attempts">
        <Table>
          <thead>
            <tr>
              <th>Level</th>
              <th>Circle</th>
              <th>Attempted Answer</th>
              <th>Correct Answer</th>
            </tr>
            {attempts.map(({ level, circle, attempt, correct_answer }, i) => (
              <tr key={i}>
                <td>{level}</td>
                <td>{circle.name}</td>
                <td>{attempt}</td>
                <td>{correct_answer}</td>
              </tr>
            ))}
          </thead>
        </Table>
      </div>
    </>
  );
};

export default User;
