import { Link } from "@inertiajs/inertia-react";
import React from "react";

const Index: React.FC = () => {
  return (
    <div className="container-flex-center">
      <div className="box" style={{ maxWidth: "700px" }}>
        <>
          <div>
            <Link href="/auth/login">Login</Link>
          </div>
          <div>
            <Link href="/auth/register">Register</Link>
          </div>
        </>
      </div>
    </div>
  );
};

export default Index;
