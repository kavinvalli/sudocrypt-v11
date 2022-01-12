import React, { useEffect } from "react";
import { Link } from "@inertiajs/inertia-react";
import IndexCard from "./IndexCard";
import { INotification } from "../../lib/types";
import { formatDistanceToNow } from "date-fns";

const NotificationsCard: React.FC<{
  notifications: INotification[];
}> = ({ notifications }: { notifications: INotification[] }) => {
  useEffect(() => {
    window.localStorage.setItem(
      "SUDOCRYPT_LAST_SEEN_NOTIFICATION",
      notifications.map(({ id }) => id).sort((a, b) => b - a)[0] + ""
    );
  }, [notifications]);
  return (
    <IndexCard
      authenticated
      className="sm:h-[50vh] w-full"
      icon={
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
      }
      title="Notifications"
      contentClassName="!h-[40vh] w-full overflow-y-auto p-5 pt-0 relative"
    >
      <>
        {/* @ts-ignore */}
        {notifications.map(({ created_at, content }, i) => (
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
      </>
    </IndexCard>
  );
};

export default NotificationsCard;
