import { Link } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../components/Layout";

const Index: React.FC = () => {
  return (
    <Layout footer={true}>
      <div className="flex justify-center items-center h-full sm:h-[calc(100vh-104px-120px)] w-full px-4 py-8">
        <div className="w-full max-w-2xl h-auto flex flex-col justify-center items-center p-0 sm:p-8">
          <img
            src="/img/logo-red.png"
            alt="Sudocrypt 2021"
            className="h-32 w-32 sm:h-44 sm:w-44 mb-6"
          />
          <h1 className="w-full text-red-500 text-4xl sm:text-6xl font-bold mb-6 text-center">
            Sudocrypt 2021
          </h1>
<<<<<<< HEAD
          <p className="w-full text-white text-lg sm:text-xl font-bold text-center mb-3">
            00:00:01 on Monday, 10th January 2022 to 23:59:59 on Tuesday, 11th
            January 2022.
=======
          <p className="w-full text-gray-300 text-xl sm:text-2xl text-center mb-6">
            10th January 2022 - 11th January 2022
>>>>>>> b812766 (chore: ui changes according to design dept)
          </p>
          <div className="flex flex-col md:flex-row">
            <a
              href="https://exun.co/sudocrypt"
              className="bg-sudo/[.45] border-sudo border-4 rounded w-[150px] h-[60px] sm:w-[222px] sm:h-[65px] flex justify-center items-center uppercase text-lg text-red-100 font-bold mb-3 md:mr-6 md:mb-0"
            >
              Discord
            </a>
            <Link
              href="/auth/register"
              className="bg-sudo border-sudo border-4 rounded w-[150px] h-[60px] sm:w-[222px] sm:h-[65px] flex justify-center items-center uppercase text-lg text-red-100 font-bold mb-3 md:mr-6 md:mb-0"
            >
              Register
            </Link>
            <a
              href="https://exun.co/resources/cryptic"
              className="bg-sudo/[.45] border-sudo border-4 rounded w-[150px] h-[60px] sm:w-[222px] sm:h-[65px] flex justify-center items-center uppercase text-lg text-red-100 font-bold"
            >
              Resources
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
