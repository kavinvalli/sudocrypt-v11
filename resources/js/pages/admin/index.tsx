import React from "react";
import useTitle from "../../lib/use-title";
import Layout from "../../components/Layout";
import PlayCard from "../../components/Home/PlayCard";
import NotificationsCard from "../../components/Home/NotificationsCard";
import UserCard from "../../components/Home/UserCard";
import { useToasts } from "react-toast-notifications";
import { INotification, IPageProps } from "../../lib/types";
import { Link, usePage } from "@inertiajs/inertia-react";

interface IAdminProps {
  error?: string;
  users: number;
  discord_accounts: number;
  attempts: number;
  levels_solved: number;
  notifications: number;
  shortlinks: number;
}

const Admin: React.FC<IAdminProps> = ({
  error,
  users,
  discord_accounts,
  attempts,
  levels_solved,
  notifications,
  shortlinks,
}: IAdminProps) => {
  useTitle("Admin");
  const { addToast } = useToasts();
  const {
    props: {
      flash: { error: flashError },
    },
  } = usePage<IPageProps>();

  React.useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error" });
    }
    if (flashError) {
      addToast(flashError, { appearance: "error" });
    }
  }, []);

  const links = [
    {
      label: "Users",
      sub: "List, Disqualify, Search, See attempts",
      href: "/admin/users",
    },
    {
      label: "Levels",
      sub: "See circles and levels, edit level content/answers",
      href: "/admin/levels",
    },
    {
      label: "Notifications",
      sub: "List, create, edit notifications",
      href: "/admin/notifications",
    },
    {
      label: "Shortlinks",
      sub: "List, create, edit shortlinks",
      href: "/admin/shortlinks",
    },
  ];

  return (
    <Layout
      logo={true}
      navbar={[
        { href: "/auth/logout", label: "Logout" },
        { href: "/", label: "Home" },
        { href: "/leaderboard", label: "Leaderboard" },
      ]}
    >
      <div className="home-container sm:h-screen sm:overflow-y-auto flex justify-center sm:py-16 py-6 sm:px-6">
        <div className="max-w-2xl w-full px-5">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-300">
              Sudocrypt v11.0 Admin Panel
            </div>
            <div className="text-xl font-bold text-gray-600">
              (Somesh worship chamber)
            </div>
          </div>

          <div className="my-10 grid grid-cols-2 gap-5">
            {[
              [users, "Users"],
              [discord_accounts, "Discord Accounts"],
              [attempts, "Attempts"],
              [levels_solved, "Levels Solved"],
              // [notifications, "Notifications"],
              // [shortlinks, "Shortlinks"],
            ].map(([value, label], i) => (
              <div
                className="bg-dark-lighter shadow-md py-6 px-5 flex flex-col justify-center items-center"
                key={i}
              >
                <div className="font-mono font-bold text-2xl sm:text-4xl text-gray-300">
                  {value}
                </div>
                <div className="font-bold text-sm sm:text-md uppercase text-gray-600 text-center">
                  {label}
                </div>
              </div>
            ))}
          </div>
          <div className="pb-10 flex flex-col items-stretch gap-y-4">
            {links.map(({ label, sub, href }, i) => (
              <Link
                className="bg-dark-lighter block shadow-md p-6 flex items-center justify-between cursor-pointer gap-x-3"
                href={href}
                key={i}
              >
                <div>
                  <div className="font-bold text-xl text-gray-300">{label}</div>
                  <div className="font-bold text-gray-600">{sub}</div>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
