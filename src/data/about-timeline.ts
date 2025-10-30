export interface AboutTimelineEntry {
  year: string;
  title: string;
  summary: string;
}

export const aboutTimeline: AboutTimelineEntry[] = [
  {
    year: "Mid-1990s",
    title: "Dial-up beginnings",
    summary:
      "Connected to the web through a 28.8k modem, built a first framed website in Notepad, and learned by following magazine tutorials.",
  },
  {
    year: "Late 1990s",
    title: "Scripting everything",
    summary:
      "Taught myself JavaScript, Perl, PHP, and MySQL while writing IRC client scripts and exploring how systems exchange information.",
  },
  {
    year: "Early 2000s",
    title: "Operating systems & reliability",
    summary:
      "Bootstrapped Gentoo Linux on my main machine, dove into hardware during vocational training, and supported NATO IT operations in the German Air Force.",
  },
  {
    year: "Mid-2000s",
    title: "Business computer science",
    summary:
      "Studied how to translate between technical architecture and business value, blending analytical thinking with practical delivery.",
  },
  {
    year: "2008",
    title: "Mobile connectivity experiments",
    summary:
      "Hacked a Nokia E51 into a Bluetooth UMTS modem to stay online on the move — a glimpse at the future of always-on systems.",
  },
];
