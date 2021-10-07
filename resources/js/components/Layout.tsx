import React from "react";

interface IProps {
  children?: JSX.Element;
  footer?: boolean;
}

const Layout: React.FC<IProps> = ({ children, footer }: IProps) => {
  return (
    <div
      className="bg-dark w-full min-h-screen text-white flex flex-col"
      style={{
        background:
          "repeating-radial-gradient(circle farthest-corner at 0% 100%, #7b2b23, #7b2b23 1px, #161a1d 1px, #161a1d 100px)",
        backgroundPositionX: "150%",
      }}
    >
      <div className="flex-1 flex items-center">
        {children}
      </div>
      {footer && (
        <div className="flex flex-col justify-center items-center py-5">
          <div className="w-full flex justify-center items-center mb-3 gap-x-2">
            <div className="w-2 h-2 rounded-full bg-[#535353]"></div>
            <div className="w-2 h-2 rounded-full bg-[#535353]"></div>
            <div className="w-2 h-2 rounded-full bg-[#535353]"></div>
          </div>
          <div className="text-gray-400 font-bold text-sm">
            &copy; Exun Clan 2021
          </div>
        </div>
      )}
    </div>
  );
};

// backgroundImage: "url(/img/bg.png)",
// backgroundRepeat: "no-repeat",
// backgroundPositionX: "150%",

export default Layout;
