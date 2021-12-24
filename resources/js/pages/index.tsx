import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../components/Layout";
import { IPageProps } from "../lib/types";

const Index: React.FC = () => {
  const { authenticated, started, ended } = usePage<IPageProps>().props;

  return (
    <Layout
      footer={true}
      navbar={[
        { href: "/auth/login", label: "Login" },
        { href: "/auth/register", label: "Register" },
        { href: "/about", label: "About" },
        { href: "/leaderboard", label: "Leaderboard" },
      ]}
    >
      <div className="flex justify-center items-center h-full w-full px-4 py-8">
        <div className="w-full max-w-lg h-auto flex w-100 flex-col justify-center items-center p-0 sm:p-8">
          <img
            src="/img/logo-blue.png"
            alt="Sudocrypt 2021"
            className="h-32 w-32 sm:h-44 sm:w-44 rounded-lg mb-5"
          />
          <h1 className="w-full text-red-500 text-3xl sm:text-6xl font-bold mb-3 text-center">
            Sudocrypt 2021
          </h1>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
