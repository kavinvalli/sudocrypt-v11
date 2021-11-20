import React from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import IndexCard from "./IndexCard";
import { IPageProps } from "../../lib/types";
import { formatDistance } from "date-fns";

const UserCard: React.FC = () => {
  const {
    props: {
      auth: { user },
    },
  } = usePage<IPageProps>();
  console.log({ user });
  console.log(
    formatDistance(new Date(user.last_active), new Date(), {
      addSuffix: true,
      includeSeconds: true,
    })
  );

  const show = {
    Email: { value: user.email, html: false },
    Institution: {
      value: user.institution,
      html: false,
    },
    Discord: {
      value: user.discord_id ? (
        <div className="mb-8">
          <div>{`@${user.discord_username}#${user.discord_discriminator}`}</div>
          <div className="my-4">
            <Link
              href="/discord/disconnect"
              className="cursor-pointer bg-sudo text-center text-xs p-2 uppercase font-bold rounded-lg focus:outline-none focus:ring-4 focus:ring-[#3e48b4] bg-[#5865F2]"
            >
              Disconnect
            </Link>
          </div>
        </div>
      ) : (
        <div className="my-4">
          <Link
            href="/discord"
            className="cursor-pointer bg-sudo text-center text-sm p-3 px-4 text-sm uppercase font-bold rounded-lg focus:outline-none focus:ring-4 focus:ring-[#3e48b4] bg-[#5865F2]"
          >
            Connect
          </Link>
        </div>
      ),
      html: true,
    },
    "Last Active": {
      value: formatDistance(new Date(user.last_active), new Date(), {
        addSuffix: true,
        includeSeconds: true,
      }),
      html: false,
    },
    "Last Solve": {
      value: user.last_solved
        ? formatDistance(new Date(user.last_solved), new Date(), {
          addSuffix: true,
        })
        : "-",
      html: false,
    },
  };

  return (
    <IndexCard
      className="sm:h-[90vh] w-full"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      }
      title="User"
      contentClassName="flex items-start justify-stretch sm:h-[90vh] overflow-y-auto relative -top-5 p-5"
    >
      <div className="w-full">
        <div className="flex flex-col items-center my-8">
          <img
            src={user.discord_image ? user.discord_image : "/img/logo-blue.png"}
            className="h-44 w-44 rounded-lg"
          />
          <div className="font-bold text-center text-2xl text-sudo mt-5">
            {user.name} (@{user.username})
          </div>
        </div>

        <div>
          {Object.entries(show).map(([label, { value }], i) => (
            <div
              className="my-6 w-full text-gray-600 focus-within:text-gray-300"
              key={i}
            >
              <label className="uppercase text-sm font-bold mb-1 block transition">
                {label}
              </label>
              <div className="text-gray-200">{value}</div>
            </div>
          ))}
          <div className="mt-5 flex justify-end gap-x-3">
            <Link href="/me/edit" className="button">
              Edit Information
            </Link>
            <Link href="/me" className="button">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </IndexCard>
  );
};

export default UserCard;
