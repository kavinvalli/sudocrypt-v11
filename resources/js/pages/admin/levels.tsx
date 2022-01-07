import { Link, usePage } from "@inertiajs/inertia-react";
import React, { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import Layout from "../../components/Layout";
import { IPageProps } from "../../lib/types";

interface IAdminLevelsProps {
  circles: { id: number; name: string; levels: number[] }[];
  error?: string;
}

const Levels: React.FC<IAdminLevelsProps> = ({
  circles,
  error,
}: IAdminLevelsProps) => {
  const { addToast } = useToasts();
  const {
    props: {
      auth: { user },
    },
  } = usePage<IPageProps>();

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error" });
    }
  }, []);

  return (
    <Layout authenticated admin>
      <div className="home-container sm:h-screen relative flex justify-center items-center gap-x-14">
        <div className="bg-dark-lighter p-6 shadow-md max-w-sm w-full rounded-lg">
          {circles.map(({ name, levels }, i) => (
            <div
              className={`border-gray-600 ${
                i === circles.length - 1 ? "" : "border-b"
              } py-3 flex items-center justify-between`}
              key={i}
            >
              <div className="uppercase text-gray-600 font-bold">{name}</div>
              <div className="flex justify-center items-center gap-x-2">
                {levels.map((id, i) => (
                  <Link
                    key={i}
                    href={`/admin/levels/${id}`}
                    className={`${"bg-dark border-gray-600 text-gray-600"} bg-opacity-30 border-2 rounded-lg font-bold text-sm h-8 w-8 flex justify-center items-center cursor-pointer`}
                  >
                    {id}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Levels;
