import { useForm } from "@inertiajs/inertia-react";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import Layout from "../../components/Layout";
import { INotification } from "../../lib/types";

interface IAdminNotificationProps {
  notification: INotification;
}

const Notification: React.FC<IAdminNotificationProps> = ({
  notification,
}: IAdminNotificationProps) => {
  const { data, put, setData, processing, reset, errors } = useForm({
    content: notification.content,
  });

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => setData(e.target.name as never, e.target.value as never);

  return (
    <Layout
      logo={true}
      navbar={[
        { href: "/auth/logout", label: "Logout" },
        { href: "/leaderboard", label: "Leaderboard" },
        { href: "/admin", label: "Admin" },
      ]}
    >
      <div className="home-container pb-32">
        <div className="mx-auto max-w-[1000px] w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              put(`/admin/notifications/${notification.id}`, {});
            }}
            className="my-10 flex flex-col items-center max-w-sm w-full mx-auto gap-y-5"
          >
            <div className="w-full text-gray-600 focus-within:text-gray-300">
              <div className="text-center text-2xl font-bold text-gray-300">
                Edit Notification
              </div>
            </div>
            <div className="w-full text-gray-600 focus-within:text-gray-300">
              <label
                htmlFor="content"
                className="uppercase text-sm font-bold mb-1 block transition"
              >
                Content
              </label>
              <textarea
                className="bg-dark-lighter text-gray-200 block w-full border-0 rounded-lg !ring-sudo !border-sudo !outline-sudo focus:ring-2 transition py-4 px-4"
                placeholder="Content"
                name="content"
                value={data.content}
                onChange={handleChange}
              />
              {errors.content && (
                <div className="text-sm text-red-500 pt-2">
                  {errors.content}
                </div>
              )}
            </div>

            <div className="">
              <button type="submit" disabled={processing} className="button">
                Edit
              </button>
            </div>
          </form>

          <div className="my-10 max-w-xl mx-auto bg-dark-lighter shadow-lg p-10">
            <div className="text-gray-600 text-sm uppercase font-bold">
              Preview
            </div>

            <div>
              <div className="my-5">
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
                <div className="text-right font-bold text-gray-600 text-sm uppercase mt-2">
                  {formatDistanceToNow(new Date(notification.created_at), {
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notification;
