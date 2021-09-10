import React from "react";

interface iIndexProps {
  circles: { id: number; name: string }[];
  currentCircle: { id: number };
}

const CircleList: React.FC<iIndexProps> = ({
  circles,
  currentCircle,
}: iIndexProps) => {
  return (
    <div className="circles">
      {" "}
      {circles.map((_circle, index) => (
        <p
          key={index}
          className={
            _circle.id === currentCircle.id
              ? "text-red-500 cursor-pointer"
              : "text-white"
          }
        >
          {_circle.name}
        </p>
      ))}
    </div>
  );
};

export default CircleList;
