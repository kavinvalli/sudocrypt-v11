import React from "react";
import { usePage } from "@inertiajs/inertia-react";
import Layout from "../components/Layout";
import { IPageProps } from "../lib/types";

const NotFound = () => {
  const {
    props: {
      authenticated,
      auth: { user },
    },
  } = usePage<IPageProps>();
  return (
    <Layout authenticated={authenticated} admin={Boolean(user.admin)}>
      <div className="flex flex-col justify-center items-center h-full sm:h-[calc(100vh-104px-120px)] w-full px-4 py-8">
        <h1 className="text-sudo text-4xl font-bold">Page Not Found</h1>
        <p className="mt-3 text-gray-500 text-lg">Please check your route</p>
      </div>
    </Layout>
  );
};

export default NotFound;
