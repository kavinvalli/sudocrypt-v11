import { useForm } from "@inertiajs/inertia-react";
import React from "react";

interface iChooseLevelProps {
  level: { id: number };
}

const ChooseLevel: React.FC<iChooseLevelProps> = ({
  level,
}: iChooseLevelProps) => {
  const { post, processing, errors } = useForm({
    level_id: level.id.toString(),
  });

  return (
    <div>
      <p
        onClick={() => {
          if (processing) return;
          post("/choose-level");
        }}
        key={level.id}
        className={processing ? "" : "cursor-pointer"}
      >
        {level.id - 1}
      </p>
      <p className="text-xs">{errors.level_id}</p>
    </div>
  );
};

export default ChooseLevel;
