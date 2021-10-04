import React from "react";

interface IProps {
  children?: JSX.Element;
}

const Layout: React.FC<IProps> = ({ children }: IProps) => {
  return (
    <div
      className="bg-dark min-h-screen text-white"
      style={{
        background:
          "repeating-radial-gradient(circle farthest-corner at 0% 100%, #e5543b, #e5543b 1px, #161a1d 1px, #161a1d 100px)",
        backgroundPositionX: "150%",
      }}
    >
      {children}
    </div>
  );
};

// backgroundImage: "url(/img/bg.png)",
// backgroundRepeat: "no-repeat",
// backgroundPositionX: "150%",

export default Layout;
