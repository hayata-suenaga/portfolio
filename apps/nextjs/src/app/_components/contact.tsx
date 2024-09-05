"use client";

import { BackgroundBeams } from "@acme/ui/background-beams";
import { TypewriterEffectSmooth } from "@acme/ui/typewriter-effect";

export function Contact() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "something",
    },
    {
      text: "people",
    },
    {
      text: "want",
    },
    {
      text: "with",
    },
    {
      text: "Hayata",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="relative flex flex-col items-center justify-center py-56">
      <p className="text-base text-slate-600 dark:text-slate-200 sm:text-lg">
        Let's chat!
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="mt-8">
        <button
          className="z-10 cursor-pointer rounded-md bg-white p-4 font-bold text-slate-950 transition-all hover:opacity-90"
          onClick={() => console.log("clicked")}
        >
          Book a meeting with me
        </button>
      </div>
      <BackgroundBeams />
    </div>
  );
}
