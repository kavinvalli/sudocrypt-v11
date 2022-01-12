import React from "react";

interface IIndexCardProps {
  icon?: JSX.Element;
  children?: JSX.Element;
  title: string;
  className?: string;
  sidebarClassName?: string;
  contentClassName?: string;
  authenticated?: boolean;
}

const IndexCard: React.FC<IIndexCardProps> = ({
  icon,
  children,
  title,
  className,
  sidebarClassName,
  contentClassName,
  authenticated,
}: IIndexCardProps) => {
  return (
    <div
      className={`bg-dark-lighter shadow-2xl p-5 flex flex-col sm:flex-row gap-x-4 rounded-lg ${className}`}
    >
      <div
        className={`h-full w-12 hidden sm:flex flex-col-reverse justify-start items-center relative opacity-50 ${sidebarClassName}`}
      >
        {icon && (
          <div className="h-10 w-10 border-4 border-gray-600 rounded-lg flex items-center justify-center transform -rotate-90">
            {icon}
          </div>
        )}
        <div
          className={`text-gray-600 uppercase font-extrabold uppercase ${
            authenticated ? "text-3xl" : "text-5xl"
          } sm:w-[300px] sm:transform sm:-rotate-90 sm:relative bottom-36`}
        >
          {title}
        </div>
      </div>
      <div className="sm:hidden text-md uppercase font-bold text-gray-600 opacity-600 mb-3">
        {title}
      </div>
      <div className={`flex-1 h-full ${contentClassName}`}>{children}</div>
    </div>
  );
};

export default IndexCard;
