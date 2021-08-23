import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react";
import { IPageProps } from "../lib/types";
import useTitle from "../lib/use-title";

const Index: React.FC = () => {
  const { props: { authenticated, user } } = usePage<IPageProps>();
  authenticated ? useTitle(user.name) : useTitle('Home');

  return (
    <div className="container-flex-center">
      <div className="box" style={{ maxWidth: "700px" }}>
        {!authenticated
          ? <>
            <div>
              <Link href="/auth/login">Login</Link>
            </div>
            <div>
              <Link href="/auth/register">Register</Link>
            </div>
          </>
          : <div>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <div style={{ marginTop: "30px" }}>
              <Link className="button--primary" href="/auth/logout">Logout</Link>
            </div>
          </div>}
      </div>
    </div>
  );
};

export default Index;
