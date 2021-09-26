import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react";
import { IPageProps } from "../lib/types";

const Index: React.FC = () => {
  const { authenticated } = usePage<IPageProps>().props;

  return (
    <div className="container-flex-center">
      <div className="box" style={{ maxWidth: "700px" }}>
        Some info here which will come all the time
        {!authenticated ? (
          <>
            <div>
              <Link href="/auth/login">Login</Link>
            </div>
            <div>
              <Link href="/auth/register">Register</Link>
            </div>
          </>
        ) : (
          <>
            <p>Authenticated</p>
            <Link href="/play">Play</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
