import { useForm, usePage } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CircleList from "../components/CircleList";
import Countdown from "../components/Countdown";
import LevelList from "../components/LevelList";
import Navbar from "../components/Navbar";
import TextInput from "../components/TextInput";
import { IPageProps } from "../lib/types";
import useTitle from "../lib/use-title";
import { useToasts } from "react-toast-notifications";
import echo from "../lib/echo";

type INotification = {
  id: number;
  content: string;
  created_at: string;
};

interface IPlayProps {
  discord_authenticated: boolean;
  circles: {
    id: number;
    name: string;
    onlyOneLevel: boolean;
  }[];
  available_levels: { id: number }[];
  done_levels: number[];
  currentLevel: {
    id: number;
    question: string;
    source_hint?: string;
  }[];
  notifications: INotification[];
  error?: string;
}

const NumberCard = styled.div`
  width: 100%;
  background: #292929;
  margin: 10px 0;
  padding: 20px;
  font-weight: bold;
  color: #888;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  & > span {
    font-size: 2rem;
    font-family: monospace;
    color: white;
  }
  @media screen and (max-width: 900px) {
    display: none;
    &:first-child {
      margin-top: 60px;
    }
  }
`;

const Play: React.FC<IPlayProps> = ({
  discord_authenticated,
  circles,
  available_levels,
  done_levels,
  currentLevel,
  error,
  notifications: _notifications,
}: IPlayProps) => {
  useTitle("Home");
  const { addToast } = useToasts();
  const [notifications, setNotifications] =
    useState<INotification[]>(_notifications);
  const [attempt, setAttempt] = useState("");

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

  const {
    started,
    ended,
    authenticated,
    circle,
    auth: { user },
  } = usePage<IPageProps>().props;

  const { setData, post, processing, errors } = useForm({
    attempt: "",
    level_id: currentLevel.length > 0 ? currentLevel[0].id : "",
    circle_id: circle !== null ? circle.id : null,
    user_id: user.id,
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const sanitizedValue = e.target.value.replace(" ", "").toLowerCase();
    setData(e.target.name as "attempt", sanitizedValue);
    setAttempt(sanitizedValue);
  };

  console.log("ADMIN");
  console.log(user.admin);
  console.log("ADMIN");

  return (
    <div>
      <Navbar
        authenticated={authenticated}
        name={user.name}
        admin={user.admin === 0 ? false : true}
      />
      {/*
      {!discord_authenticated && <a href="/connectdiscord">Discord</a>}
      <div className="notifications">
        {notifications.map(({ id, content, created_at }) => (
          <div
            key={id}
            className="notification p-6 border border-sudo flex justify-between items-center"
          >
            <p dangerouslySetInnerHTML={{ __html: content }}></p>
            <p>{created_at}</p>
          </div>
        ))}
      </div>
        */}
      {started ? (
        !ended ? (
          !circle ? (
            <>You&apos;ve finished everything... gg</>
          ) : (
            <>
              {/*
                <Countdown large={true} />
                <Navbar
                  authenticated={authenticated}
                  name={user.name}
                  admin={user.admin}
                />
                {!discord_authenticated && <a href="/connectdiscord">Discord</a>}
                <div className="notifications">
                  {notifications.map(({ id, content, created_at }) => (
                    <div
                      key={id}
                      className="notification p-6 border border-sudo flex justify-between items-center"
                    >
                      <p dangerouslySetInnerHTML={{ __html: content }}></p>
                      <p>{created_at}</p>
                    </div>
                  ))}
                </div>
              */}
              <div className="w-100 h-screen flex justify-center items-center">
                <div className="absolute bottom-5 left-10 p-6 transform -rotate-90 origin-left font-bold text-sudo text-2xl uppercase">
                  {circle.name}
                </div>
                <CircleList circles={circles} currentCircle={circle} />
                <div>
                  <h1 className="text-sudo text-6xl font-bold uppercase mb-3">
                    Play
                  </h1>
                  {user.level === null ? (
                    <LevelList
                      availableLevels={available_levels}
                      doneLevels={done_levels}
                    />
                  ) : (
                    <div className="bg-gray-800 p-6 rounded-3xl shadow-2xl max-w-lg">
                      <form
                        onSubmit={(e: React.SyntheticEvent) => {
                          e.preventDefault();
                          post("/play");
                        }}
                      >
                        <h3 className="text-3xl text-sudo font-bold">
                          Level {currentLevel[0].id - 1}
                        </h3>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: currentLevel[0].question,
                          }}
                        ></p>
                        <div className="flex">
                          <TextInput
                            name="attempt"
                            placeholder="Answer"
                            type="text"
                            disabled={processing}
                            error={errors.attempt}
                            value={attempt}
                            onChange={handleChange}
                          />
                          <button className="button my-3 px-6" type="submit">
                            Submit
                          </button>
                        </div>
                        <p className="text-xs">
                          {currentLevel[0].source_hint &&
                            currentLevel[0].source_hint}
                        </p>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </>
          )
        ) : (
          <div
            className="flex flex-col justify-center items-center"
            style={{ height: "calc(100vh - 98px)" }}
          >
            <h2 className="text-5xl font-bold">Sudocrypt v11.0 has ended</h2>
            <p className="mt-3">Thank you for attending!</p>
          </div>
        )
      ) : (
        <div
          className="flex flex-col justify-center items-center"
          style={{ height: "calc(100vh - 98px)" }}
        >
          <h2 className="text-4xl mb-3 font-bold text-center">
            Sudocrypt v11.0 will start in
          </h2>

          <Countdown large={true} />
          {!discord_authenticated && (
            <div className="mt-6">
              <p className="mb-2">
                Meanwhile, connect your discord and join our server!
              </p>
              <div className="flex justify-center">
                <a href="/connectdiscord" className="flex justify-center mr-2">
                  <button className="button">Connect Discord</button>
                </a>
                <a href="" className="flex justify-center ml-2">
                  <button className="button-outline">Join Server</button>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Play;
