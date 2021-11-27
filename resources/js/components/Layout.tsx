import { Link } from "@inertiajs/inertia-react";
import React from "react";

interface IProps {
  children?: JSX.Element;
  footer?: boolean;
  navbar?: { href: string; label: string }[];
  logo?: boolean;
}

const Layout: React.FC<IProps> = ({
  children,
  footer,
  navbar,
  logo,
}: IProps) => {
  return (
    <div
      className="bg-dark w-full min-h-screen text-white flex flex-col"
      style={{
        background:
          "repeating-radial-gradient(circle farthest-corner at 0% 100%, #7b2b23, #7b2b23 1px, #161a1d 1px, #161a1d 100px)",
        backgroundPositionX: "150%",
      }}
    >
      {logo && (
        <img
          src="/img/logo-blue.png"
          className="h-12 w-12 hidden sm:block rounded-lg fixed top-5 right-5"
        />
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
