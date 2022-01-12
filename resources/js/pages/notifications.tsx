import React from "react";
import Layout from "../components/Layout";

interface INotificationsProps {
  notifications: { content: string; created_at: string }[];
}

const Notifications: React.FC<INotificationsProps> = ({
  notifications,
}: INotificationsProps) => {
  return (
    <Layout>
      <div className="home-container">
        <div className="bg-dark-lighter shadow-xl max-w-lg w-full mx-auto h-[95vh] overflow-y-auto relative">
          <div className="text-xl uppercase font-bold text-sudo-light sm:fixed h-24 max-w-lg w-full bg-dark-lighter flex items-center px-5 z-50">
            Notifications
          </div>
          <div className="hidden sm:block h-24"></div>
          {notifications.map(({ created_at, content }, i) => (
            <>
              <div className="px-5" key={i}>
                <div dangerouslySetInnerHTML={{ __html: content }} />
                <div className="text-right font-bold text-gray-600 text-sm uppercase mt-2">
                  {created_at}
                </div>
              </div>
              <div className="flex items-center justify-center gap-x-4 my-5">
                <div className="w-[30%] h-[2px] bg-sudo opacity-30"></div>
                <div className="w-[10px] h-[10px] border-2 border-sudo border-opacity-30 rounded-full"></div>
                <div className="w-[30%] h-[2px] bg-sudo opacity-30"></div>
              </div>
            </>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
