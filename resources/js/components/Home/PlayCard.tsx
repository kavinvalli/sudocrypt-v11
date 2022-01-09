import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import IndexCard from "./IndexCard";
import { IPageProps } from "../../lib/types";
import Countdown from "../Countdown";

const PlayCard: React.FC = () => {
  const {
    props: {
      started: _started,
      ended,
      auth: { user },
    },
  } = usePage<IPageProps>();
  const [started, setStarted] = useState(_started);

  return (
    <IndexCard
      authenticated
      className="sm:h-[35vh] w-full"
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
      {ended ? (
        <div className="h-full flex flex-col justify-center items-center">
          <div className="text-2xl font-bold text-gray-600">
            Sudocrypt v11.0 has ended
          </div>
        </div>
      ) : started ? (
        <div className="h-full flex flex-col">
          <div className="flex-1 sm:grid grid-rows-2 grid-cols-2 sm:gap-10 sm:p-10 flex flex-col gap-y-3">
            {[
              [user.level?.id, "Level"],
              [user.circle?.name, "Circle"],
              [user.points, "Points"],
              // ["153", "Position"],
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
            <div className="flex items-center justify-center p-2 flex-1">
              <Link
                href="/play"
                className="text-xl bg-sudo rounded-xl py-4 px-6 uppercase font-bold focus:outline-none focus:shadow-none ring-sudo-dark focus:ring-4"
              >
                Play
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col justify-center items-center">
          <Countdown
            onZero={() => {
              setStarted(true);
            }}
          />
        </div>
      )}
    </IndexCard>
  );
};

export default PlayCard;
