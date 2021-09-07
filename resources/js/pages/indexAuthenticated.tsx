import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react";
import { IPageProps } from "../lib/types";
import useTitle from "../lib/use-title";

interface IIndexProps {
  discord_authenticated: boolean;
}

const IndexAuthenticated: React.FC<IIndexProps> = ({
  discord_authenticated,
}: IIndexProps) => {
  useTitle("Home");
  const {
    started,
    ended,
    authenticated,
    auth: { user },
  } = usePage<IPageProps>().props;
  return (
    <div>
      {!discord_authenticated && <Link href="/connectdiscord">Discord</Link>}
      <h1>{user.name}</h1>
      <div>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
        >
          {JSON.stringify(user, null, 2)}
        </pre>
        <div style={{ marginTop: "30px" }}>
          <Link className="button--primary" href="/auth/logout">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IndexAuthenticated;
