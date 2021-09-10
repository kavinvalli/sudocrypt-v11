// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { usePage } from "@inertiajs/inertia-react";
// import { IPageProps } from "../lib/types";

// interface ICountdownContainerProps extends React.HTMLProps<HTMLDivElement> {
//   started: boolean;
// }

// const CountdownContainer = styled.div`
//   display: flex;
//   /* justify-content: flex-start; */
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   width: 100%;
//   padding: 0 20px;
//   user-select: none;
//   & > div {
//     margin: 0 2px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     > span:first-child {
//       background: ${({ started }: ICountdownContainerProps) =>
//         started ? "#ff000060" : "#ffffff30"};
//       padding: 5px;
//       font-size: 1.1rem;
//       border: none;
//       border-radius: 3px;
//       font-family: monospace;
//       margin-bottom: 2px;
//       font-weight: bold;
//     }
//     > span:last-child {
//       font-size: 0.6rem;
//       font-weight: 400;
//       text-transform: uppercase;
//     }
//     &:first-child {
//       margin-left: 0;
//     }
//     &:last-child {
//       margin-right: 0;
//     }
//   }
// `;

// const CountdownContainerLg = styled(CountdownContainer)`
//   justify-content: flex-start;
//   padding: 0;
//   & > div {
//     margin: 0 5px;
//     > span:first-child {
//       padding: 10px;
//       font-size: 2rem;
//       border-radius: 5px;
//       margin-bottom: 5px;
//       background: ${({ started }: ICountdownContainerProps) =>
//         started ? "#6f0000" : "#292929"};
//     }
//     > span:last-child {
//       font-size: 0.9rem;
//       font-weight: 400;
//       text-transform: uppercase;
//     }
//     &:first-child {
//       margin-left: 0;
//     }
//     &:last-child {
//       margin-right: 0;
//     }
//   }
// `;

// function countdownTo(dt: string): ICountdown {
//   const fmt = (n: number) => String(Math.floor(n)).padStart(2, "0");
//   const diff = (Date.parse(dt) - Date.now()) / 1000;
//   const days = fmt(diff / (60 * 60 * 24));
//   const hours = fmt((diff / (60 * 60)) % 24);
//   const minutes = fmt((diff / 60) % 60);
//   const seconds = fmt(diff % 60);

//   return {
//     days,
//     hours,
//     minutes,
//     seconds,
//   };
// }

// interface ICountdown {
//   days: string;
//   hours: string;
//   minutes: string;
//   seconds: string;
// }

// interface ICountdownProps extends React.HTMLProps<HTMLDivElement> {
//   large?: boolean;
// }

// const Countdown: React.FC<ICountdownProps> = ({
//   large,
//   style,
// }: ICountdownProps) => {
//   const { dates, started, ended } = usePage<IPageProps>().props;
//   if (ended) {
//     return (
//       <CountdownContainer started={false} style={style}>
//         <div>Cryptocracy 2021 has ended</div>
//       </CountdownContainer>
//     );
//   }

//   let date = started ? dates.end : dates.start;

//   const [countdown, setCountdown] = useState<ICountdown>(countdownTo(date));

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCountdown(countdownTo(date));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const Container: React.FC<ICountdownContainerProps> = large
//     ? CountdownContainerLg
//     : CountdownContainer;

//   return (
//     <Container started={started} style={style}>
//       <div>
//         <span>{countdown.days}</span>
//         <span>DAY{countdown.days !== "01" && "S"}</span>
//       </div>
//       <div>
//         <span>{countdown.hours}</span>
//         <span>HR</span>
//       </div>
//       <div>
//         <span>{countdown.minutes}</span>
//         <span>Min</span>
//       </div>
//       <div>
//         <span>{countdown.seconds}</span>
//         <span>Sec</span>
//       </div>
//     </Container>
//   );
// };

// export default Countdown;
import React, { useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { IPageProps } from "../lib/types";
import { compareAsc } from "date-fns";

interface ICountdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface iCountdownProps {
  large?: boolean;
}

function countdownTo(dt: string): ICountdown {
  const fmt = (n: number) => String(Math.abs(Math.floor(n))).padStart(2, "0");
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

const Timer: React.FC<iCountdownProps> = ({ large }: iCountdownProps) => {
  const {
    props: {
      dates: { start, end },
    },
  } = usePage<IPageProps>();
  const [started, setStarted] = React.useState<boolean>(
    compareAsc(new Date(), new Date(start)) == 1
  );
  const [ended, setEnded] = React.useState<boolean>(
    compareAsc(new Date(), new Date(end)) == 1
  );
  const [countdown, setCountdown] = React.useState<ICountdown>(
    countdownTo(started ? end : start)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setStarted(compareAsc(new Date(), new Date(start)) == 1);
      setEnded(compareAsc(new Date(), new Date(end)) == 1);
      setCountdown(countdownTo(started ? end : start));

      if (ended) clearInterval(interval);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center">
        {!ended ? (
          Object.entries(countdown).map(([label, n], i) => (
            <div key={i}>
              <div
                className={
                  (large ? "text-4xl " : "text-3xl") +
                  "font-mono py-1 px-2 m-1 mb-1 rounded-lg bg-sudo flex justify-center items-center font-bold"
                }
              >
                {n}
              </div>
              <div
                className="uppercase font-light text-center"
                style={{ fontSize: "0.6rem" }}
              >
                {label}
              </div>
            </div>
          ))
        ) : (
          // <div className="text-sm font-bold">Sudocrypt v11.0 has ended</div>
          <></>
        )}
      </div>
    </div>
  );
};

export default Timer;
