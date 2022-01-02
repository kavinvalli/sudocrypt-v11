import { Inertia } from "@inertiajs/inertia";
import { Link, useForm, usePage } from "@inertiajs/inertia-react";
import { formatDistance } from "date-fns";
import React, { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import Layout from "../../components/Layout";
import TextInput from "../../components/TextInput";
import { IPageProps, IUser } from "../../lib/types";
import useTitle from "../../lib/use-title";

interface IUserProps {
  user: IUser;
  circles: { id: number; name: string; levels: number[] }[];
  completed_levels: number[];
  error?: string;
  message?: string;
}

const User: React.FC<IUserProps> = ({
  user,
  circles,
  completed_levels,
}: IUserProps) => {
  useTitle(user.name);
  const { addToast } = useToasts();
  const {
    props: {
      flash: { message, error },
    },
  } = usePage<IPageProps>();
  const { post, data, setData, processing, errors } = useForm({ password: "" });

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error" });
    }

    if (message) {
      addToast(message, { appearance: "info" });
    }
  }, []);

  const show = {
    Name: { value: user.name, html: false },
    Username: { value: user.username, html: false },
    Email: { value: user.email, html: false },
    Institution: {
      value: user.institution,
      html: false,
    },
    Discord: {
      value: user.discord_id
        ? `@${user.discord_username}#${user.discord_discriminator}`
        : "None",
      html: false,
    },
    "Last Active": {
      value:
        formatDistance(new Date(user.last_active), new Date(), {
          addSuffix: true,
          includeSeconds: true,
        }) + ` (${new Date(user.last_active).toLocaleString()})`,
      html: false,
    },
    "Last Solve": {
      value: user.last_solved
        ? formatDistance(new Date(user.last_solved), new Date(), {
          addSuffix: true,
          includeSeconds: true,
        })
        : "-",
      html: false,
    },
  };

  return (
    <Layout logo={true} circles={false}>
      <div className="home-container sm:min-h-screen flex items-center justify-center p-20 gap-x-20">
        <div className="bg-dark-lighter p-6 shadow-md max-w-sm w-full rounded-lg">
          {circles.map(({ id, name, levels }, i) => (
            <div
              className={`border-gray-600 ${
                i === circles.length - 1 ? "" : "border-b"
              } py-3 flex items-center justify-between`}
              key={i}
            >
              <div
                className={`uppercase ${
                  id === user.circle?.id ? "text-sudo" : "text-gray-600"
                } font-bold`}
              >
                {name}
              </div>
              <div className="flex justify-center items-center gap-x-2">
                {levels.map((lvl, i) =>
                  completed_levels.includes(lvl) || user.level?.id === lvl ? (
                    <Link
                      key={i}
                      className={`${
                        completed_levels.includes(lvl)
                          ? "bg-sudo border-sudo"
                          : user.level?.id === lvl
                            ? "bg-yellow-400 border-yellow-400"
                            : "bg-dark border-gray-600 text-gray-600"
                      } bg-opacity-30 border-2 rounded-lg font-bold text-sm h-8 w-8 flex justify-center items-center`}
                      href={`/admin/users/${user.id}/lvl/${lvl}`}
                    >
                      {lvl}
                    </Link>
                  ) : (
                    <div
                      key={i}
                      className={
                        "bg-dark border-gray-600 text-gray-600 bg-opacity-30 border-2 rounded-lg font-bold text-sm h-8 w-8 flex justify-center items-center"
                      }
                    >
                      {lvl}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="h-full max-w-xl w-full bg-dark-lighter p-6 shadow-md rounded-lg">
          <div className="flex gap-x-10 items-stretch">
            <div className="h-full flex flex-col justify-between">
              <div>
                <img
                  src={user.discord_image || "/img/logo-blue.png"}
                  className="h-48 w-48 rounded-lg"
                />
                <div className="flex mt-3 gap-x-2">
                  {user.admin ? (
                    <div className="text-white text-xs font-bold uppercase bg-green-600 py-2 px-3 rounded-full">
                      Admin
                    </div>
                  ) : null}
                  {user.disqualified ? (
                    <div className="text-white text-xs font-bold uppercase bg-red-600 py-2 px-3 rounded-full">
                      disqualified
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mt-5 flex flex-col items-stretch justify-center gap-y-3">
                <button
                  className="button !bg-red-700"
                  onClick={() => Inertia.post(`/admin/users/${user.id}/dq`, {})}
                >
                  {user.disqualified ? "Requalify" : "Disqualify"}
                </button>
                <button
                  className="button !bg-green-600"
                  onClick={() =>
                    Inertia.post(`/admin/users/${user.id}/admin`, {})
                  }
                >
                  {user.admin ? "Demote to user" : "Promote to Admin"}
                </button>
              </div>
            </div>
            <div className="flex-1 h-full w-full flex flex-col gap-y-5">
              {Object.entries(show).map(([label, { value }], i) => (
                <div
                  className="w-full text-gray-600 focus-within:text-gray-300"
                  key={i}
                >
                  <label className="uppercase text-sm font-bold mb-1 block transition">
                    {label}
                  </label>
                  <div className="text-gray-200">{value}</div>
                </div>
              ))}
            </div>
          </div>
          <form
            className="mt-10 flex gap-x-5 items-center justify-between"
            onSubmit={(e) => {
              e.preventDefault();
              post(`/admin/users/${user.id}/changepwd`, {
                preserveScroll: true,
                onSuccess: () => setData("password", ""),
              });
            }}
          >
            <TextInput
              type="text"
              placeholder="New Password"
              containerClassName="my-0"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              error={errors.password}
              disabled={processing}
            />
            <button className="button !p-4" type="submit" disabled={processing}>
              Change
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default User;
