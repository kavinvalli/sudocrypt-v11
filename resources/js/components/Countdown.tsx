import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { IPageProps } from "../lib/types";

function countdownTo(dt: string): ICountdown {
  const fmt = (n: number) => String(Math.floor(n)).padStart(2, "0");
  const diff = (Date.parse(dt) - Date.now()) / 1000;
  const days = fmt(diff / (60 * 60 * 24));
  const hours = fmt((diff / (60 * 60)) % 24);
  const minutes = fmt((diff / 60) % 60);
  const seconds = fmt(diff % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

interface ICountdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface ICountdownProps extends React.HTMLProps<HTMLDivElement> {
  onZero: () => void;
}

const Countdown: React.FC<ICountdownProps> = ({
  className,
  style,
  onZero,
}: ICountdownProps) => {
  const { dates, started, ended } = usePage<IPageProps>().props;
  if (ended) {
    return (
      <div style={style}>
        <div>Cryptocracy 2021 has ended</div>
      </div>
    );
  }

  const date = started ? dates.end : dates.start;
  const [countdown, setCountdown] = useState<ICountdown>(countdownTo(date));

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        countdownTo(date).days == "00" &&
        countdownTo(date).hours == "00" &&
        countdownTo(date).minutes == "00" &&
        countdownTo(date).seconds == "00"
      ) {
        onZero();
      }
      setCountdown(countdownTo(date));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={style}
      className="flex gap-x-4 border border-sudo border-opacity-30 p-3 rounded-lg"
    >
      <div className="flex flex-col items-center">
        <span className="font-mono text-5xl font-extrabold text-sudo">
          {countdown.days}
        </span>
        <span className="uppercase text-xs font-bold text-gray-400">
          DAY{countdown.days !== "01" && "S"}
        </span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-mono text-5xl font-extrabold text-sudo">
          {countdown.hours}
        </span>
        <span className="uppercase text-xs font-bold text-gray-400">HR</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-mono text-5xl font-extrabold text-sudo">
          {countdown.minutes}
        </span>
        <span className="uppercase text-xs font-bold text-gray-400">Min</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-mono text-5xl font-extrabold text-sudo">
          {countdown.seconds}
        </span>
        <span className="uppercase text-xs font-bold text-gray-400">Sec</span>
      </div>
    </div>
  );
};

export default Countdown;
