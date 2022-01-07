import { usePage } from "@inertiajs/inertia-react";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { INotification, IPageProps } from "../lib/types";
import useTitle from "../lib/use-title";
import { useToasts } from "react-toast-notifications";
import AttemptLevel from "../components/Play/AttemptLevel";
import ChooseLevel from "../components/Play/ChooseLevel";
import echo from "../lib/echo";

interface IPlayProps {
  circles: { id: number; name: string; levels: number[] }[];
  completed_levels: number[];
  error?: string;
  notifications: INotification[];
  hint: string;
}

const Play: React.FC<IPlayProps> = ({
  circles,
  completed_levels,
  error,
  notifications: _notifications,
  hint,
}: IPlayProps) => {
  useTitle("Play");
  const { addToast } = useToasts();
  const [notifications, setNotifications] =
    React.useState<INotification[]>(_notifications);
  const {
    props: {
      auth: { user },
    },
  } = usePage<IPageProps>();

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error" });
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
    <Layout authenticated notifications={notifications}>
      <div className="home-container h-full min-h-[calc(100vh-104px-120px)] relative flex flex-col-reverse md:flex-row justify-center items-center sm:gap-x-14 gap-y-10 sm:gap-y-0 p-5 sm:p-0 my-6">
        <div className="fixed bottom-40 left-5 text-sudo uppercase font-extrabold text-4xl transform origin-bottom -rotate-90 hidden sm:block">
          {user.circle?.name}
        </div>
        <div className="bg-dark-lighter p-6 shadow-md max-w-sm w-full rounded">
          {circles.map(({ id, name, levels }, i) => (
            <div
              className={`border-gray-600 ${
                i === circles.length - 1 ? "" : "border-b"
              } py-3 flex items-center justify-between`}
              key={i}
            >
              <div
                className={`uppercase ${
                  id === user.circle?.id ? "text-sudo" : "text-gray-600"
                } font-bold`}
              >
                {name}
              </div>
              <div className="flex justify-center items-center gap-x-2">
                {levels.map((lvl, i) => (
                  <div
                    key={i}
                    className={`${
                      completed_levels.includes(lvl)
                        ? "bg-sudo border-sudo bg-opacity-30 "
                        : user.level?.id === lvl
                        ? "bg-sudo border-sudo"
                        : "bg-dark border-gray-600 text-gray-600 bg-opacity-30"
                    } border-2 rounded font-bold text-sm h-8 w-8 flex justify-center items-center`}
                  >
                    {lvl}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {user.circle_id && user.level_id ? (
          <AttemptLevel />
        ) : user.circle_id && !user.level_id ? (
          <ChooseLevel
            completed_levels={completed_levels}
            levels={
              circles.find(({ id }) => id === user.circle_id)?.levels || []
            }
          />
        ) : (
          <div>
            <div className="bg-dark-lighter p-6 shadow-md max-w-sm w-full rounded-lg my-10">
              Sab khatam.... ab bahar ghoomle zara
            </div>
          </div>
        )}
      </div>
      <p dangerouslySetInnerHTML={{ __html: `<!-- ${hint} -->` }}></p>
    </Layout>
  );
};

export default Play;
