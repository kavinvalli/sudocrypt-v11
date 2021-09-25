import React from "react";
import ChooseLevel from "./ChooseLevel";

interface iLevelListProps {
  availableLevels: { id: number }[];
  doneLevels: number[];
}

const LevelList: React.FC<iLevelListProps> = ({
  availableLevels,
  doneLevels,
}: iLevelListProps) => {
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
