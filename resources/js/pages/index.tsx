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
        // { href: "/about", label: "About" },
        { href: "/leaderboard", label: "Leaderboard" },
      ]}
    >
      <div className="flex justify-center items-center h-full w-full px-4 py-8">
        <div className="w-full max-w-2xl h-auto flex flex-col justify-center items-center p-0 sm:p-8">
          <img
            src="/img/logo-blue.png"
            alt="Sudocrypt 2021"
            className="h-32 w-32 sm:h-44 sm:w-44 rounded-lg mb-5"
          />
          <h1 className="w-full text-red-500 text-3xl sm:text-6xl font-bold mb-3 text-center">
            Sudocrypt 2021
          </h1>
          <p className="w-full text-white text-lg sm:text-xl font-bold text-center mb-3">
            00:00:01 on Monday, 10th January 2022 to 23:59:59 on Tuesday, 11th
            January 2022.
          </p>
          <div className="flex mb-3">
            <a href="https://exun.co/sudocrypt" className="button mr-2">
              Discord
            </a>
            <a href="/auth/register" className="button mr-2">
              Register
            </a>
            <a href="https://exun.co/resources/cryptic" className="button">
              Resources
            </a>
          </div>
          <p className="text-base">More details will be released soon</p>
          <p className="text-base">
            View the trailer{" "}
            <a
              href="https://exun.co/sudotrailer"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
