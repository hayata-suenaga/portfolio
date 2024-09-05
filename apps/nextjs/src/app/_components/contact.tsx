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
    <div className="relative flex h-screen flex-col items-center justify-center">
      <p className="text-xs text-neutral-600 dark:text-neutral-200 sm:text-base">
        Let's chat!
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <button className="h-10 rounded-xl border border-black bg-white py-4 text-sm text-black">
          Book a meeting with me
        </button>
      </div>
      <BackgroundBeams />
    </div>
  );
}
