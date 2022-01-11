import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "@inertiajs/inertia-react";
import { INotification } from "../lib/types";

interface INotificationProps {
  notifications: INotification[];
  authenticated?: boolean;
  admin?: boolean;
}

const authenticatedLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "About",
  },
  // {
  //   href: "/rlleaderboard",
  //   label: "Referral Leaderboard",
  // },
  {
    href: "/leaderboard",
    label: "Leaderboard",
  },
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
    href: "/about",
    label: "About",
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

const Navbar: React.FC<INotificationProps> = ({
  authenticated,
  admin,
  notifications,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotification, setUnreadNotification] = useState(false);
  const [showResponsiveNavbar, setShowResponsiveNavbar] = useState(false);

  useEffect(() => {
    const latestNotificationRead = window.localStorage.getItem(
      "SUDOCRYPT_LAST_SEEN_NOTIFICATION"
    )
      ? parseInt(
        window.localStorage.getItem("SUDOCRYPT_LAST_SEEN_NOTIFICATION") ?? ""
      )
      : 0;
    if (!showNotifications) {
      if (
        notifications &&
        notifications.length > 0 &&
        notifications.map(({ id }) => id).sort((a, b) => b - a)[0] >
          latestNotificationRead
      ) {
        setUnreadNotification(true);
      }
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
    <>
      <div className="fixed top-5 left-5 flex sm:hidden z-[1020]">
        <a href="//exunclan.com" target="_blank" rel="noreferrer">
          <img src="/img/exun-logo.png" className="w-auto h-12 mr-2" />
        </a>
        <Link href="/">
          <img
            src="/img/logo-red.png"
            alt="Exun 2021-22"
            className="w-12 h-12"
          />
        </Link>
      </div>
      <div className="fixed top-5 right-5 hidden sm:flex z-[1020]">
        <a href="//exunclan.com" target="_blank" rel="noreferrer">
          <img src="/img/exun-logo.png" className="w-auto h-12 mr-2" />
        </a>
        <Link href="/">
          <img
            src="/img/logo-red.png"
            alt="Exun 2021-22"
            className="h-12 h-12"
          />
        </Link>
      </div>
      {notifications && notifications.length > 0 && (
        <div
          className="fixed items-center justify-center hidden w-10 h-10 border-4 border-gray-600 rounded-lg cursor-pointer sm:flex top-6 right-52"
          onClick={showNotificationPanel}
        >
          {unreadNotification && (
            <div className="absolute -top-2 -right-2 w-[12px] h-[12px] rounded-full bg-red-500" />
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-600"
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
          <div className="absolute top-20 right-52 sm:w-1/2 md:w-1/4 h-[300px] overflow-y-auto bg-dark-lighter z-[1010] p-5 rounded">
            {notifications &&
              notifications.map(({ created_at, content }, i) => (
                <div key={i}>
                  <div className="my-5">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                    <div className="mt-2 text-sm font-bold text-right text-gray-600 uppercase">
                      {formatDistanceToNow(new Date(created_at), {
                        addSuffix: true,
                        includeSeconds: true,
                      })}
                    </div>
                  </div>
                  <div className="flex items-center justify-center my-8 gap-x-4">
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
      <div
        className={`flex w-screen flex-wrap sm:w-auto justify-center sm:justify-start ${
          authenticated ? "px-10 pt-10 pb-4" : "p-10"
        }`}
      >
        <div
          className={`${
            showResponsiveNavbar ? "bg-dark-lighter" : ""
          } block sm:hidden fixed top-0 left-0 w-full h-[56px] z-[1010]`}
        >
          <svg
            className="block sm:hidden w-[24px] h-[24px] fixed top-8 right-5 text-sudo cursor-pointer"
            viewBox="0 0 24 24"
            onClick={() => setShowResponsiveNavbar(!showResponsiveNavbar)}
          >
            <path
              fill="currentColor"
              d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
            />
          </svg>
        </div>
        {links.map(({ href, label }, i) => (
          <Link
            href={href}
            key={i}
            className={`hidden sm:block uppercase text-sudo text-md font-bold mx-5 ${
              currentRoute === href && " cursor-default text-white"
            }`}
          >
            {label}
          </Link>
        ))}
        {authenticated && admin && (
          <Link
            href="/admin"
            className={`hidden sm:block uppercase text-sudo text-md font-bold mx-5 ${
              currentRoute === "/admin" && " cursor-default text-white"
            }`}
          >
            Admin
          </Link>
        )}
        {showResponsiveNavbar && (
          <div className="block sm:hidden flex fixed top-14 w-full flex-col bg-dark-lighter z-[1010]">
            {links.map(({ href, label }, i) => (
              <Link
                href={href}
                key={i}
                className={`uppercase text-sudo text-md font-bold p-5 w-full ${
                  currentRoute === href && " cursor-default text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
