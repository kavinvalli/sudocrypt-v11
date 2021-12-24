import React from "react";
import Layout from "../components/Layout";
import Prizes from "../components/Prizes";

const About: React.FC = () => {
  return (
    <Layout footer={true} navbar={[{ href: "/", label: "Home" }]}>
      <div className="min-h-screen w-full flex flex-col justify-center items-center p-6">
        <div className="max-w-[650px] flex flex-col items-center">
          <h2 className="text-3xl font-bold text-sudo text-center">About</h2>
          <ul className="mt-6 list-none max-w-[600px] about-list">
            <li>
              The hunt shall commence on 9:00 AM 3rd June 2021 and will continue
              till 9:00 PM 4th June 2021.
            </li>
            <li>
              All participants are recommended to read the
              <a href="https://docs.google.com/document/d/1bpeRtE2YC09lHyKIuPUFJkxxp1gfuPPvRneCMJxPv7U/edit">
                Cryptic Hunt resources
              </a>
            </li>
            <li>
              The event encompasses an Online Cryptic Treasure Hunt in which
              participants must make their way through a series of cryptic
              levels.
            </li>
            <li>
              The participant's aim is to crack the levels as quickly as they
              can so as to place themselves at the top of the
              <a href="/leaderboard">leaderboard</a>.
            </li>
            <li>
              At each level, the participants will encounter a number of clues
              which shall all, together, point to one answer. Each level has one
              correct answer.
            </li>
            <li>
              Official clues may be released on the{" "}
              <a
                href="https://discord.gg/Ukv9psgTna"
                className="text-sudo font-semibold"
              >
                Sudocrypt v11.0 Discord Server
              </a>{" "}
              if and when deemed necessary by the admins.
            </li>
            <li>
              Lead confirmations will be done via the DMs to the moderator
              accounts on the Sudocrypt v11.0 Discord Server itself.
            </li>
            <li>
              Answers will always be lower-case, alphanumeric and will contain
              no spaces. Special characters are allowed. For example, if the
              answer is Big Bang, you would type it in as “bigbang”.
            </li>
            <li>
              Every clue in the question is important. If it wasn't important,
              it wouldn't be there.
            </li>
            <li>Beware of the spelling you enter, we do not auto-correct.</li>
            <li>
              And if it was not obvious, team play, answer sharing, hint sharing
              and collaborating with other competitors, in general, is not
              allowed and any such evidence can lead to disqualification.
            </li>
            <li>
              You can come back to this page any time by clicking on the
              Sudocrypt logo in the top left corner of the page.
            </li>
            <li>
              Further instructions can be found on the Discord server itself. It
              is absolutely necessary to join the discord server if you want to
              compete in the hunt to the best of your ability.
            </li>
          </ul>
          <Prizes />
        </div>
      </div>
    </Layout>
  );
};

export default About;
