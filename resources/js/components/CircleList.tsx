import React from "react";

interface iCircleListProps {
  circles: { id: number; name: string }[];
  currentCircle: { id: number };
}

const CircleList: React.FC<iCircleListProps> = ({
  circles,
  currentCircle,
}: iCircleListProps) => {
  return (
    <div className="hidden sm:block circles">
      {/*
      {circles.map((_circle, index) => (
        <p
          key={index}
          className={
            _circle.id === currentCircle.id ? "text-sudo" : "text-white"
          }
        >
          {_circle.name}
        </p>
      ))}*/}
      {currentCircle.id === 1 ? (
        <img src="/img/earth.png" className="mr-6" alt="" />
      ) : (
        <img src="/img/Circle.png" alt="" />
      )}
    </div>
  );
};

export default CircleList;
