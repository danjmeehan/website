export type Project = {
  title: string;
  summary: string;
  stack: string;
  href?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    title: "Turnova",
    summary:
      "I made a retro-styled chat and training calendar based personal running coach versed in the context of Norwegian Threshold Training, my running history, Strava and Garmin data, Runsignup race calendar, running gear, nutritional supplements, and long-term goals.",
    stack: "Strava, Garmin, Gemini, Fly.io. Built with Cursor.",
    href: "https://turnova.fly.dev/help",
    image: "/images/turnova.png",
  },
  {
    title: "Counterpoint",
    summary: "I fancy writing a book someday. Counterpoint is a distraction-free, markdown-based writing workspace with optional agentic writing feedback. A three-column dashboard pairs a TipTap manuscript canvas with timeline-aware story navigation and prompted AI critique that flags prose style that conflicts with the story’s goals and themes.",
    stack: "TipTap, Claude, Vercel AI SDK. Built with Cursor.",
    image: "/images/writer.png",
  },
];
