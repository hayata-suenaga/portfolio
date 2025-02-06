"use client";

import useScrollspy from "@/lib/useScrollSpy";

export default function VerticalNav() {
  const currentSection = useScrollspy(navLinks.map((nav) => nav.url));

  return (
    <div className="hidden fixed left-10 bottom-1/3 lg:flex flex-col w-6 h-52 items-center justify-between">
      {navLinks.map((nav) => {
        return (
          <a
            title={nav.text}
            href={`#${nav.url}`}
            key={nav.url}
            className={`transition-all outline-primary hover:bg-primary ${
              currentSection === nav.url
                ? "bg-primary rotate-0"
                : "opacity-75 focus-visible:opacity-100 hover:opacity-80 rotate-45 hover:rotate-12"
            } w-3 h-3 border-2 border-primary`}
          ></a>
        );
      })}
    </div>
  );
}

const navLinks = [
  {
    url: "whoami",
    text: "Who am i?",
  },
  {
    url: "in-numbers",
    text: "In Numbers",
  },
  {
    url: "eisuke",
    text: "Eisuke",
  },
  {
    url: "experience",
    text: "Experience",
  },
  {
    url: "education",
    text: "Education",
  },
];
