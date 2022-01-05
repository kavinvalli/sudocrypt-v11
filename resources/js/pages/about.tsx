import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react";
import IndexCard from "../components/Home/IndexCard";
import Layout from "../components/Layout";
import Prizes from "../components/Prizes";
import { IPageProps } from "../lib/types";

const About: React.FC = () => {
  const {
    props: { authenticated },
  } = usePage<IPageProps>();
  return (
    <Layout authenticated={authenticated}>
      <div className="w-full h-screen flex justify-center">
        <IndexCard
          title="About"
          authenticated={true}
          className="sm:h-[calc(100vh-180px)] my-6 mx-6 w-full sm:w-3/4 md:w-1/2 text-base"
        >
          <ul className="h-full overflow-y-auto p-6 text-[#CBCDCE]">
            <li>
              <b>Sudocrypt v11.0</b> is an online 48-hour multiplayer Cryptic
              Hunt x Capture the Flag (CTF) event organised by Exun Clan. The
              event will be held from 00:00:01 on Monday, 10th January 2022 to
              23:59:59 on Tuesday, 11th January 2022.
            </li>
            <Prizes />
            <li className="mt-2">
              Participants are required to join our{" "}
              <a
                href="https://sudocrypt.com/discord"
                target="_blank"
                rel="noreferrer"
                className="text-sudo font-bold"
              >
                official Discord server
              </a>{" "}
              for all event related updates, including hints. Click{" "}
              <Link href="/auth/register" className="text-sudo font-bold">
                here
              </Link>{" "}
              to register!
            </li>
            <li className="mt-3">
              To get yourself acquainted with cryptic hunts, visit our{" "}
              <a
                href="https://exun.co/resources/cryptic"
                className="text-sudo font-bold"
                target="_blank"
                rel="noreferrer"
              >
                resources
              </a>
              .
            </li>
            <h2 className="text-2xl font-bold text-gray-500 mt-4 underline">
              FAQ
            </h2>
            <div className="mt-3">
              <li className="font-bold">1. What is a cryptic hunt?</li>
              <li>
                Cryptic hunts are virtual scavenger hunts where the participants
                are required to "hunt" the internet for clues, crack ciphers,
                and reach the final answer for each level. Sudocrypt, in
                particular, contains hints and answers in the domain of
                technology and related fields.
              </li>
            </div>
            <div className="mt-3">
              <li className="font-bold">2. Who organizes Sudocrypt?</li>
              <li>
                Sudocrypt is organised by the Exun Clan, the computer science
                club of DPS RK Puram, which is amongst the premier high school
                IT clubs in the country. Sudocrypt is an international
                competition and is also the flagship event of Exun.
              </li>
            </div>
            <div className="mt-3">
              <li className="font-bold">3. How can I prepare for Sudocrypt?</li>
              <li>
                No previous knowledge is necessary to participate. However,
                knowing the "basics", such as different types of ciphers,
                steganography tools, common CTF (capture the flag) utilities,
                etc. always helps. To start learning and exploring, you can
                refer to Exun Clan’s learning resources on cryptic hunts at{" "}
                <a
                  href="https://exunclan.com/resources/cryptic"
                  className="text-sudo font-bold"
                  target="_blank"
                  rel="noreferrer"
                >
                  our Learning Resources
                </a>{" "}
                and view some of the past questions{" "}
                <a
                  href="https://docs.google.com/document/d/1JoBXkgSwaUxRGLoQ9zC-zR-KGU0XaCU53fBkLq6AoVo/edit?usp=sharing"
                  className="text-sudo font-bold"
                  target="_blank"
                  rel="noreferrer"
                >
                  here
                </a>
                .
              </li>
            </div>
            <div className="mt-3">
              <li className="font-bold">4. How does someone win Sudocrypt?</li>
              <li>
                Sudocrypt can be won in 2 ways: either by being the first person
                to solve all the levels or by being at the top of the
                leaderboard when the event ends. Rankings on the leaderboard
                depend on the points earned by solving levels. Time will be the
                deciding factor used to settle ties.
              </li>
            </div>
            <div className="mt-3">
              <li className="font-bold">
                5. I'm not in high school, can I participate?
              </li>
              <li>
                Yes. Sudocrypt is an open event. Everyone, irrespective of their
                age or affiliation with an institution, is welcome to
                participate. You can participate in Sudocrypt even if you are or
                aren’t participating in other Exun 2021-22 events.
              </li>
            </div>
            <div className="mt-3">
              <li className="font-bold">
                6. Are we allowed to participate in teams?
              </li>
              <li>
                Only individual participation is allowed in Sudocrypt. Teaming
                up is strictly forbidden. If anyone is found sharing
                answers/hints/leads or collaborating in any other way, it will
                directly lead to disqualification.{" "}
              </li>
            </div>
            <div className="mt-3">
              <li className="font-bold">7. Will we get hints?</li>
              <li>
                Hints will be posted in hints on the Sudocrypt Discord server.
                To know if you’re on the right track, you can DM one of the
                official Sudocrypt Leads accounts which will be joining this
                server shortly to confirm your leads. No lead confirmations will
                be taking place on the personal accounts of the admins. Lead
                confirmations will be done through Discord only. Admins will not
                respond on other platforms.
              </li>
            </div>
            <div className="mt-3">
              <li className="font-bold">8. How do I sign up?</li>
              <li>
                Registrations are open at{" "}
                <a
                  href="https://sudocrypt.com/register"
                  className="text-sudo font-bold"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://sudocrypt.com/register
                </a>
              </li>
            </div>
          </ul>
        </IndexCard>
      </div>
      {/* <div className="max-w-[650px] flex flex-col items-center"> */}
      {/*   <h2 className="text-3xl font-bold text-sudo text-center">About</h2> */}
      {/*   <ul className="mt-6 list-none max-w-[600px] about-list"> */}
      {/*     <li> */}
      {/*       The hunt shall commence on 9:00 AM 3rd June 2021 and will continue */}
      {/*       till 9:00 PM 4th June 2021. */}
      {/*     </li> */}
      {/*     <li> */}
      {/*       All participants are recommended to read the */}
      {/*       <a href="https://docs.google.com/document/d/1bpeRtE2YC09lHyKIuPUFJkxxp1gfuPPvRneCMJxPv7U/edit"> */}
      {/*         Cryptic Hunt resources */}
      {/*       </a> */}
      {/*     </li> */}
      {/*     <li> */}
      {/*       The event encompasses an Online Cryptic Treasure Hunt in which */}
      {/*       participants must make their way through a series of cryptic */}
      {/*       levels. */}
      {/*     </li> */}
      {/*     <li> */}
      {/*       The participant's aim is to crack the levels as quickly as they */}
      {/*       can so as to place themselves at the top of the */}
      {/*       <a href="/leaderboard">leaderboard</a>. */}
      {/*     </li> */}
      {/*     <li> */}
      {/*       At each level, the participants will encounter a number of clues */}
      {/*       which shall all, together, point to one answer. Each level has one */}
      {/*       correct answer. */}
      {/*     </li> */}
      {/*     <li> */}
      {/*       Official clues may be released on the{" "} */}
      {/*       <a */}
      {/*         href="https://discord.gg/Ukv9psgTna" */}
      {/*         className="text-sudo font-semibold" */}
      {/*       > */}
      {/*         Sudocrypt v11.0 Discord Server */}
      {/*       </a>{" "} */}
      {/*       if and when deemed necessary by the admins. */}
      {/*     </li> */}
      {/*     <li> */}
      {/*       Lead confirmations will be done via the DMs to the moderator */}
      {/*       accounts on the Sudocrypt v11.0 Discord Server itself. */}
      {/*     </li> */}
      {/*     <li> */}
      {/*       Answers will always be lower-case, alphanumeric and will contain */}
      {/*       no spaces. Special characters are allowed. For example, if the */}
      {/*       answer is Big Bang, you would type it in as “bigbang”. */}
      {/*     </li> */}
      {/*     <li> */}
      {/*       Every clue in the question is important. If it wasn't important, */}
      {/*       it wouldn't be there. */}
      {/*     </li> */}
      {/*     <li>Beware of the spelling you enter, we do not auto-correct.</li> */}
      {/*     <li> */}
      {/*       And if it was not obvious, team play, answer sharing, hint sharing */}
      {/*       and collaborating with other competitors, in general, is not */}
      {/*       allowed and any such evidence can lead to disqualification. */}
      {/*     </li> */}
      {/*     <li> */}
      {/*       You can come back to this page any time by clicking on the */}
      {/*       Sudocrypt logo in the top left corner of the page. */}
      {/*     </li> */}
      {/*     <li> */}
      {/*       Further instructions can be found on the Discord server itself. It */}
      {/*       is absolutely necessary to join the discord server if you want to */}
      {/*       compete in the hunt to the best of your ability. */}
      {/*     </li> */}
      {/*   </ul> */}
      {/*   {/1* <Prizes /> *1/} */}
      {/* </div> */}
    </Layout>
  );
};

export default About;
