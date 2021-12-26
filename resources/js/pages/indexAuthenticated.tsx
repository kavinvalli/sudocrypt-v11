import React from "react";
import useTitle from "../lib/use-title";
import Layout from "../components/Layout";
import PlayCard from "../components/Home/PlayCard";
import NotificationsCard from "../components/Home/NotificationsCard";
import UserCard from "../components/Home/UserCard";
import { useToasts } from "react-toast-notifications";
import { INotification, IPageProps } from "../lib/types";
import echo from "../lib/echo";
import { usePage } from "@inertiajs/inertia-react";

interface IIndexAuthenticatedProps {
  error?: string;
  notifications: INotification[];
}

const IndexAuthenticated: React.FC<IIndexAuthenticatedProps> = ({
  error,
  notifications: _notifications,
}: IIndexAuthenticatedProps) => {
  useTitle("Home");
  const { addToast } = useToasts();
  const [notifications, setNotifications] =
    React.useState<INotification[]>(_notifications);
  const {
    props: {
      flash: { error: flashError },
      auth: { user },
    },
  } = usePage<IPageProps>();

  React.useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error" });
    }
    if (flashError) {
      addToast(flashError, { appearance: "error" });
    }

    echo
      .channel("notifications")
      .listen(
        "NotificationCreated",
        (e: { notifications: INotification[] }) => {
          setNotifications(e.notifications);
        }
      );
  }, []);

  return (
    <Layout
      logo={true}
      navbar={[
        { href: "/auth/logout", label: "Logout" },
        // { href: "/about", label: "About" },
        { href: "/leaderboard", label: "Leaderboard" },
        ...(user.admin ? [{ href: "/admin", label: "Admin" }] : []),
      ]}
    >
      <>
        <div className="home-container sm:h-screen flex flex-col sm:flex-row items-center sm:px-6">
          <div className="w-full sm:w-1/2 sm:h-[90vh] px-6 flex items-center my-6 sm:my-0">
            <UserCard />
          </div>
          <div className="sm:w-1/2 sm:h-[90vh] px-6 flex flex-col-reverse sm:flex-col justify-between gap-y-6 mb-6 sm:gap-y-0 sm:my-0">
            <NotificationsCard notifications={notifications} />
            <PlayCard />
          </div>
        </div>
      </>
    </Layout>
  );
};

export default IndexAuthenticated;
