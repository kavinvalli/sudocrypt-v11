export interface IPrizeEntry {
  tier: string;
  color: string;
  highlight?: string;
  content: string[];
}

const prizes: IPrizeEntry[] = [
  {
    tier: "1st",
    color: "#ffd700",
    highlight: "&#8377;15,000 or &#36;200 cash",
    content: [
      "Free <img src=\"https://cryptichunt.com/img/xyz-logo-white.png\" style=\"height: 1.3rem;\" alt=\".xyz\" /> domain to flaunt your website",
      "<img src=\"https://cryptichunt.com/img/taskade-logo.png\" alt=\"Taskade\" style=\"filter: invert(1); height: 1.5rem; margin-right: -2px;\" /> lifetime membership",
      "<img src=\"https://cryptichunt.com/img/interviewcake.svg\" alt=\"Interview Cake\" style=\"height: 1.5rem; margin-right: -3px;\" /> membership for 30 days",
    ],
  },
  {
    tier: "2nd",
    color: "#c0c0c0",
    highlight: "&#8377;10,000 or &#36;140 cash",
    content: [
      "Free <img src=\"https://cryptichunt.com/img/xyz-logo-white.png\" style=\"height: 1.3rem;\" alt=\".xyz\" /> domain to flaunt your website",
      "<img src=\"https://cryptichunt.com/img/taskade-logo.png\" alt=\"Taskade\" style=\"filter: invert(1); height: 1.5rem; margin-right: -2px;\" /> lifetime membership",
      "<img src=\"https://cryptichunt.com/img/interviewcake.svg\" alt=\"Interview Cake\" style=\"height: 1.5rem; margin-right: -3px;\" /> membership for 30 days",
    ],
  },
  {
    tier: "3rd",
    color: "#cd7f32",
    highlight: "&#8377;5,000 or &#36;70 cash",
    content: [
      "Free <img src=\"https://cryptichunt.com/img/xyz-logo-white.png\" style=\"height: 1.3rem;\" alt=\".xyz\" /> domain to flaunt your website",
      "<img src=\"https://cryptichunt.com/img/taskade-logo.png\" alt=\"Taskade\" style=\"filter: invert(1); height: 1.5rem; margin-right: -2px;\" /> lifetime membership",
      "<img src=\"https://cryptichunt.com/img/interviewcake.svg\" alt=\"Interview Cake\" style=\"height: 1.5rem; margin-right: -3px;\" /> membership for 30 days",
    ],
  },
  {
    tier: "4th to 8th",
    color: "#bbbbbb",
    highlight: "&#8377;2,000 or &#36;25 cash",
    content: [
      "Free <img src=\"https://cryptichunt.com/img/xyz-logo-white.png\" style=\"height: 1.3rem;\" alt=\".xyz\" /> domain to flaunt your website",
      "<img src=\"https://cryptichunt.com/img/taskade-logo.png\" alt=\"Taskade\" style=\"filter: invert(1); height: 1.5rem; margin-right: -2px;\" /> lifetime membership",
      "<img src=\"https://cryptichunt.com/img/interviewcake.svg\" alt=\"Interview Cake\" style=\"height: 1.5rem; margin-right: -3px;\" /> membership for 30 days",
    ],
  },
  {
    tier: "9th to 18th",
    color: "#bbbbbb",
    highlight: "&#8377;1,000 or &#36;15 cash",
    content: [
      "Free <img src=\"https://cryptichunt.com/img/xyz-logo-white.png\" style=\"height: 1.3rem;\" alt=\".xyz\" /> domain to flaunt your website",
      "<img src=\"https://cryptichunt.com/img/taskade-logo.png\" alt=\"Taskade\" style=\"filter: invert(1); height: 1.5rem; margin-right: -2px;\" /> lifetime membership",
      "<img src=\"https://cryptichunt.com/img/interviewcake.svg\" alt=\"Interview Cake\" style=\"height: 1.5rem; margin-right: -3px;\" /> membership for 30 days",
    ],
  },
  {
    tier: "Top 25",
    color: "#bbbbbb",
    content: [
      "Expert Sudo Certificates",
      "Free <img src=\"https://cryptichunt.com/img/xyz-logo-white.png\" style=\"height: 1.3rem;\" alt=\".xyz\" /> domain to flaunt your website",
      "<img src=\"https://cryptichunt.com/img/taskade-logo.png\" alt=\"Taskade\" style=\"filter: invert(1); height: 1.5rem; margin-right: -2px;\" /> lifetime membership",
      "<img src=\"https://cryptichunt.com/img/interviewcake.svg\" alt=\"Interview Cake\" style=\"height: 1.5rem; margin-right: -3px;\" /> membership for 30 days",
    ],
  },
  {
    tier: "All Participants",
    color: "#888888",
    content: [
      "Certificate of Participation with rank and username",
      "<img src=\"https://cryptichunt.com/img/taskade-logo.png\" alt=\"Taskade\" style=\"filter: invert(1); height: 1.5rem; margin-right: -2px;\" /> 2-years membership",
      "<img src=\"https://cryptichunt.com/img/interviewcake.svg\" alt=\"Interview Cake\" style=\"height: 1.5rem; margin-right: -3px;\" /> membership for 30 days",
    ],
  },
];

export default prizes;
