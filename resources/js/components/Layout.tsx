import React from "react";
import { INotification } from "../lib/types";
import Navbar from "./Navbar";

interface IProps {
  children?: JSX.Element;
  footer?: boolean;
  logo?: boolean;
  circles?: boolean;
  authenticated?: boolean;
  notifications?: INotification[];
  admin?: boolean;
}

const Layout: React.FC<IProps> = ({
  children,
  footer,
  circles,
  authenticated,
  notifications,
  admin,
}: IProps) => {
  return (
    <div
      className="bg-dark w-full min-h-screen text-white"
      style={
        circles === false
          ? {}
          : {
            background:
                "repeating-radial-gradient(circle farthest-corner at 0% 100%, #7b2b23, #7b2b23 1px, #161a1d 1px, #161a1d 100px)",
            backgroundPositionX: "150%",
          }
      }
    >
      <div className="w-full h-full bg-gradient-to-bl from-dark via-dark-opacity flex flex-col">
        <Navbar
          authenticated={authenticated}
          admin={admin}
          notifications={notifications ?? []}
        />
        <div className="h-full flex items-center">{children}</div>
        {footer && (
          <footer className="flex items-center justify-center py-8 text-gray-500 flex-col text-md sm:text-lg text-center px-2">
            <h4 className="text-gray-500">
              More details will be released soon
            </h4>
            <h4 className="text-gray-500">
              View the trailer{" "}
              <a
                href="https://exun.co/sudotrailer"
                target="_blank"
                rel="noreferrer"
                className="text-sudo"
              >
                here
              </a>
            </h4>
          </footer>
        )}
      </div>
    </div>
  );
};

// backgroundImage: "url(/img/bg.png)",
// backgroundRepeat: "no-repeat",
// backgroundPositionX: "150%",

export default Layout;
