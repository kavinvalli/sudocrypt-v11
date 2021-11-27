import { Inertia } from "@inertiajs/inertia";
import { Link, useForm } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../../components/Layout";
import { INotification } from "../../lib/types";

interface INotificationProps {
  notifications: INotification[];
}

const Notifications: React.FC<INotificationProps> = ({
  notifications,
}: INotificationProps) => {
  const { data, setData, post, processing, reset, errors } = useForm({
    content: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => setData(e.target.name as never, e.target.value as never);

  return (
    <Layout
      logo={true}
      circles={false}
      navbar={[
        { href: "/auth/logout", label: "Logout" },
        { href: "/leaderboard", label: "Leaderboard" },
        { href: "/admin", label: "Admin" },
      ]}
    >
      <div className="home-container pb-32">
        <div className="mx-auto max-w-[1000px] w-full">
          <div className="w-full flex justify-between">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                post("/admin/notifications", {
                  preserveState: true,
                  preserveScroll: true,
                  onSuccess: () => {
                    reset();
                  },
                });
              }}
              className="my-10 flex flex-col items-center mx-auto gap-y-5 w-[48%]"
            >
              <div className="w-full text-gray-600 focus-within:text-gray-300">
                <div className="text-center text-2xl font-bold text-gray-300">
                  New Notification
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
                  Create
                </button>
              </div>
            </form>

            <div className="my-10 bg-dark-lighter shadow-lg p-10 w-[48%]">
              <div className="text-gray-600 text-sm uppercase font-bold">
                Preview
              </div>

              <div>
                <div className="my-5">
                  <div dangerouslySetInnerHTML={{ __html: data.content }} />
                  <div className="text-right font-bold text-gray-600 text-sm uppercase mt-2">
                    a few seconds ago
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

          <table className="max-w-[1000px] w-full mx-auto divide-sudo divide-y bg-dark-lighter shadow-md">
            <thead>
              <tr className="bg-sudo text-white font-extrabold uppercase">
                <th className="p-3">Content</th>
                <th className="p-3">Created At</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sudo">
              {notifications.map(({ id, content, created_at }) => (
                <tr key={id}>
                  <td className="p-3 text-center">{content}</td>
                  <td className="p-3 text-center">{created_at}</td>
                  <td className="p-3 flex flex-col gap-y-2 items-stretch justify-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        Inertia.delete(`/admin/notifications/${id}`, {
                          preserveScroll: true,
                        });
                      }}
                      className="!bg-red-600 !p-2 !text-xs button"
                    >
                      delete
                    </button>
                    <Link
                      href={`/admin/notifications/${id}/edit`}
                      className="!p-2 !text-xs button"
                    >
                      edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
