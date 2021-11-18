import React from "react";
import useTitle from "../lib/use-title";
import Layout from "../components/Layout";
import { Link } from "@inertiajs/inertia-react";
import { INotification } from "../lib/types";

interface IIndexAuthenticatedProps {
  error?: string;
  notifications: { content: string; created_at: string }[];
}

interface IIndexCardProps {
  icon: JSX.Element;
  children?: JSX.Element;
  title: string;
  className?: string;
}

const IndexCard: React.FC<IIndexCardProps> = ({
  icon,
  children,
  title,
  className,
}: IIndexCardProps) => {
  return (
    <div
      className={`bg-dark-lighter shadow-2xl p-5 flex flex-col sm:flex-row gap-x-4 ${className}`}
    >
      <div className="h-full w-14 hidden sm:flex flex-col-reverse justify-start items-center relative opacity-50">
        <div className="h-12 w-12 border-4 border-gray-600 rounded-lg flex items-center justify-center transform -rotate-90">
          {icon}
        </div>
        <div className="text-gray-600 uppercase font-extrabold uppercase text-3xl sm:w-[300px] sm:transform sm:-rotate-90 sm:relative bottom-36">
          {title}
        </div>
      </div>
      <div className="sm:hidden text-md uppercase font-bold text-gray-600 opacity-600 mb-3">
        {title}
      </div>
      <div className="flex-1 h-full">{children}</div>
    </div>
  );
};

const IndexAuthenticated: React.FC<IIndexAuthenticatedProps> = ({
  notifications,
}: IIndexAuthenticatedProps) => {
  useTitle("Home");

  // TODO: realtime notifications, notifications page

  return (
    <Layout
      logo={true}
      navbar={[
        { href: "/auth/logout", label: "Logout" },
        { href: "/leaderboard", label: "Leaderboard" },
      ]}
    >
      <>
        <div className="home-container sm:min-h-screen flex flex-col sm:grid grid-rows-2 grid-cols-2 gap-y-5 sm:gap-10 p-5 sm:p-10">
          <IndexCard
            className="row-span-2"
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
          >
            <div>hello</div>
          </IndexCard>
          <IndexCard
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            }
            title="Notifications"
          >
            <div className="h-full w-full flex flex-col justify-end">
              {/* @ts-ignore */}
              {notifications.map(({ created_at, content }, i) => (
                <div className="my-5" key={i}>
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                  <div className="text-right font-bold text-gray-600 text-sm uppercase mt-2">
                    {created_at}
                  </div>
                </div>
              ))}
              <div className="text-right">
                <Link
                  href="/notifications"
                  className="uppercase text-sm font-bold text-sudo flex items-center justify-end"
                >
                  See all
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </IndexCard>
          <IndexCard
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
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                />
              </svg>
            }
            title="Play"
          >
            <div className="h-full flex flex-col">
              <div className="flex-1 sm:grid grid-rows-2 grid-cols-2 sm:gap-10 sm:p-10 flex flex-col gap-y-3">
                {[
                  ["5", "Level"],
                  ["Earth", "Circle"],
                  ["1000", "Points"],
                  ["153", "Position"],
                ].map(([value, label], i) => (
                  <div
                    className="flex sm:flex-col-reverse sm:items-center sm:justify-center my-3 sm:m-0 flex-row-reverse justify-between"
                    key={i}
                  >
                    <div className="uppercase font-bold text-gray-600 text-lg">
                      {label}
                    </div>
                    <div className="uppercase font-bold text-gray-200 text-3xl">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center p-2 my-4 sm:my-8">
                <Link
                  href="/play"
                  className="text-xl bg-sudo rounded-xl py-4 px-6 uppercase font-bold"
                >
                  Play
                </Link>
              </div>
            </div>
          </IndexCard>
        </div>
      </>
    </Layout>
  );
};

export default IndexAuthenticated;
