import { Link } from "@inertiajs/inertia-react";
import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { INotification } from "../lib/types";

interface IProps {
  children?: JSX.Element;
  footer?: boolean;
  logo?: boolean;
  circles?: boolean;
  authenticated?: boolean;
  notifications?: INotification[];
  admin?: boolean;
}

const authenticatedLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/play",
    label: "Play",
  },
  {
    href: "/leaderboard",
    label: "Leaderboard",
  },
  // {
  //   href: "/about",
  //   label: "About",
  // },
  {
    href: "/auth/logout",
    label: "Logout",
  },
];

const unauthenticatedLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/auth/register",
    label: "Register",
  },
  {
    href: "/auth/login",
    label: "Login",
  },
  // {
  //   href: "/about",
  //   label: "About",
  // },
];

const Layout: React.FC<IProps> = ({
  children,
  footer,
  circles,
  authenticated,
  notifications,
  admin,
}: IProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotification, setUnreadNotification] = useState(false);

  useEffect(() => {
    const latestNotificationRead = window.localStorage.getItem(
      "SUDOCRYPT_LAST_SEEN_NOTIFICATION"
    )
      ? parseInt(
        window.localStorage.getItem("SUDOCRYPT_LAST_SEEN_NOTIFICATION") ?? ""
      )
      : 0;
    if (
      notifications &&
      notifications.length > 0 &&
      notifications.map(({ id }) => id).sort((a, b) => b - a)[0] >
        latestNotificationRead
    ) {
      setUnreadNotification(true);
    }
  }, [notifications]);

  const showNotificationPanel = () => {
    setShowNotifications(!showNotifications);
    window.localStorage.setItem(
      "SUDOCRYPT_LAST_SEEN_NOTIFICATION",
      notifications
        ? notifications.map(({ id }) => id).sort((a, b) => b - a)[0] + ""
        : ""
    );
    setUnreadNotification(false);
  };

  const currentRoute = window.location.pathname;
  let links: { href: string; label: string }[] = unauthenticatedLinks;
  if (authenticated) {
    links = authenticatedLinks;
  }

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
        <Link href="/">
          <img
            src="/img/logo-red.png"
            className="h-12 w-12 hidden sm:block fixed top-5 right-5"
          />
        </Link>
        {notifications && notifications.length > 0 && (
          <div
            className="hidden sm:flex fixed top-6 right-20 h-10 w-10 border-4 border-gray-600 rounded-lg items-center justify-center cursor-pointer"
            onClick={showNotificationPanel}
          >
            {unreadNotification && (
              <div className="absolute -top-2 -right-2 w-[12px] h-[12px] rounded-full bg-red-500" />
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
        )}
        {showNotifications && (
          <>
            <div className="absolute top-20 right-20 sm:w-1/2 md:w-1/4 h-[300px] overflow-y-auto bg-dark-lighter z-[1010] p-5 rounded">
              {notifications &&
                notifications.map(({ created_at, content }, i) => (
                  <div key={i}>
                    <div className="my-5">
                      <div dangerouslySetInnerHTML={{ __html: content }} />
                      <div className="text-right font-bold text-gray-600 text-sm uppercase mt-2">
                        {formatDistanceToNow(new Date(created_at), {
                          addSuffix: true,
                          includeSeconds: true,
                        })}
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-x-4 my-8">
                      <div className="w-[30%] h-[2px] bg-sudo opacity-30"></div>
                      <div className="w-[10px] h-[10px] border-2 border-sudo border-opacity-30 rounded-full"></div>
                      <div className="w-[30%] h-[2px] bg-sudo opacity-30"></div>
                    </div>
                  </div>
                ))}
            </div>
            <div
              className="w-screen h-screen fixed top-0 left-0 z-[1000]"
              onClick={() => setShowNotifications(false)}
            ></div>
          </>
        )}
        <div className={`flex ${authenticated ? "px-10 pt-10 pb-4" : "p-10"}`}>
          {links.map(({ href, label }, i) => (
            <Link
              href={href}
              key={i}
              className={
                "uppercase text-sudo text-md font-bold mx-5" +
                (currentRoute === href ? " cursor-default text-white" : "")
              }
            >
              {label}
            </Link>
          ))}
          {authenticated && admin && (
            <Link
              href="/admin"
              className={
                "uppercase text-sudo text-md font-bold mx-5" +
                (currentRoute === "/admin" ? " cursor-default text-white" : "")
              }
            >
              Admin
            </Link>
          )}
        </div>
        <div className="h-full flex items-center">{children}</div>
        {footer && (
          <footer className="flex items-center justify-center py-8 text-gray-500 flex-col text-sm sm:text-xs text-center px-2">
            <h4 className="text-lg text-gray-500">
              More details will be released soon
            </h4>
            <h4 className="text-lg text-gray-500">
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
