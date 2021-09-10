import React from "react";

interface IProps {
  children?: JSX.Element;
}

const Layout: React.FC<IProps> = ({ children }: IProps) => {
  return (
    <>
      <div className="font-mono bg-dark min-h-screen text-white">
        {children}
      </div>
    </>
  );
};

export default Layout;
