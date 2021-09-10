import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import ChooseLevel from "./ChooseLevel";

interface iIndexProps {
  availableLevels: { id: number }[];
  doneLevels: number[];
}

const LevelList: React.FC<iIndexProps> = ({
  availableLevels,
  doneLevels,
}: iIndexProps) => {
  return (
    <div>
      {availableLevels.map((level, index) =>
        doneLevels.includes(level.id) ? (
          <p key={index} className="text-gray-700 hover-disabled">
            {level.id - 1}
          </p>
        ) : (
          <>
            <ChooseLevel level={level} />
          </>
        )
      )}
    </div>
  );
};

export default LevelList;
