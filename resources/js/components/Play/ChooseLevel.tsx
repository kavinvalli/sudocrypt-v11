import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React, { useEffect, useRef } from "react";
import { IPageProps } from "../../lib/types";

interface IChooseLevelProps {
  completed_levels: number[];
  levels: number[];
}

const ChooseLevel: React.FC<IChooseLevelProps> = ({
  completed_levels,
  levels,
}: IChooseLevelProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    props: {
      auth: { user },
    },
  } = usePage<IPageProps>();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <div className="text-sudo text-6xl font-extrabold">Choose Level</div>
      <div className="bg-dark-lighter p-6 shadow-md max-w-sm w-full rounded my-10">
        <div className="text-sudo-light text-md uppercase font-bold">
          {user.circle?.name}
        </div>
        <div className="flex flex-wrap justify-start items-center gap-x-3 my-5">
          {levels.map((lvl, i) => (
            <div
              key={i}
              className={`${
                completed_levels.includes(lvl)
                  ? "bg-sudo border-sudo"
                  : user.level?.id === lvl
                    ? "bg-yellow-400 border-yellow-400"
                    : "bg-dark border-gray-600 text-gray-600 cursor-pointer"
              } bg-opacity-30 border-2 rounded font-bold text-lg h-12 w-12 flex justify-center items-center`}
              onClick={() => {
                if (!completed_levels.includes(lvl)) {
                  Inertia.post(
                    "/play/choose-level",
                    { level_id: lvl },
                    { preserveScroll: true }
                  );
                }
              }}
            >
              {lvl}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseLevel;
