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
  referral_number: number;
  referred_by: string;
}

const IndexAuthenticated: React.FC<IIndexAuthenticatedProps> = ({
  error,
  notifications: _notifications,
  referral_number,
  referred_by,
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
    <Layout authenticated admin={Boolean(user.admin)}>
      <>
        <div className="home-container md:h-screen flex flex-col md:flex-row items-start md:px-6">
          <div className="w-full md:w-1/2 md:h-[90vh] px-6 flex items-center my-6 md:my-0">
            <UserCard
              referral_number={referral_number}
              referred_by={referred_by}
            />
          </div>
          <div className="md:w-1/2 md:h-[90vh] px-6 flex flex-col-reverse md:flex-col justify-between gap-y-6 mb-6 md:gap-y-0 md:my-0">
            <NotificationsCard notifications={notifications} />
            <PlayCard />
          </div>
        </div>
      </>
    </Layout>
  );
};

export default IndexAuthenticated;
