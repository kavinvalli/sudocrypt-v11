import { Link } from "@inertiajs/inertia-react";
import React from "react";

interface IProps {
  children?: JSX.Element;
  footer?: boolean;
  navbar?: { href: string; label: string }[];
  logo?: boolean;
  circles?: boolean;
}

const Layout: React.FC<IProps> = ({
  children,
  footer,
  navbar,
  logo,
  circles,
}: IProps) => {
  return (
    <div
      className="bg-dark w-full min-h-screen text-white flex flex-col"
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
      {logo && (
        <Link href="/">
          <img
            src="/img/logo-blue.png"
            className="h-12 w-12 hidden sm:block rounded-lg fixed top-5 right-5"
          />
        </Link>
      )}
      {navbar?.length !== 0 && (
        <>
          <div className="flex sm:hidden p-4 justify-center">
            {navbar?.map(({ href, label }, i) => (
              <Link
                href={href}
                key={i}
                className="uppercase text-sudo text-sm font-bold mx-3"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="sm:flex hidden fixed bottom-5 right-10 translate-x-full origin-left transform -rotate-90">
            {navbar?.map(({ href, label }, i) => (
              <Link
                href={href}
                key={i}
                className="uppercase text-sudo text-xl font-extrabold mx-3 opacity-70 hover:opacity-100 transition"
              >
                {label}
              </Link>
            ))}
          </div>
        </>
      )}
      <div className="flex-1 flex items-center">{children}</div>
      {footer && (
        <footer className="flex items-center justify-center py-4 text-gray-500 flex-col text-sm sm:text-xs text-center px-2">
          <div className="text-lg font-bold text-gray-500">
            &bull;&bull;&bull;
          </div>
          <div>
            &copy; 2021{" "}
            <a
              href="https://exunclan.com"
              className="font-semibold"
              target="_blank"
              rel="noreferrer"
            >
              Exun Clan
            </a>{" "}
            and{" "}
            <a
              href="https://dpsrkp.net"
              className="font-semibold"
              target="_blank"
              rel="noreferrer"
            >
              DPS RK Puram
            </a>
          </div>
        </footer>
      )}
    </div>
  );
};

// backgroundImage: "url(/img/bg.png)",
// backgroundRepeat: "no-repeat",
// backgroundPositionX: "150%",

export default Layout;
