import React from "react";
import { Minus } from "lucide-react";

import { ShootingStars } from "@acme/ui/shooting-stars";
import { StarsBackground } from "@acme/ui/star-background";
import { Timeline } from "@acme/ui/timeline";

export function WorkHistory() {
  return (
    <div className="relative w-full">
      <Timeline data={DATA} />
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}

const ITEMS = [
  {
    place: "Expensify",
    title: "Senior Full Stack Engineer",
    period: "Feb 2023 - Aug 2024",
    items: [
      "Managed teams of 3-6 engineers",
      "Onboarded new engineers to Expensify's payment infrastructure",
      "Co-led a TypeScript migration of Expensify's codebase",
      "Authored TypeScript guidelines now used by the entire engineering team",
    ],
  },
  {
    place: "Dendron",
    title: "Summer Startup Resident",
    period: "Jun 2022 - Sep 2022",
    items: [
      "Reported directly to CEO",
      "Shipped more than 10 new features to production",
    ],
  },
  {
    place: "Centre College",
    title: "BS in Computer Science",
    period: "Aug 2019 - May 2022",
    items: ["On the Dean's List for four consecutive terms at Centre College"],
  },
];

const DATA = ITEMS.map((item) => ({
  title: item.place,
  content: (
    <Content title={item.title} subTitle={item.period} list={item.items} />
  ),
}));

function Content({
  title,
  subTitle,
  list,
}: {
  title: string;
  subTitle: string;
  list: string[];
}) {
  return (
    <div>
      <p className="mb-8s mb-2 text-xl font-normal text-neutral-800 dark:text-neutral-200">
        {title}
      </p>
      <p className="mb-4 text-sm dark:text-slate-50/75">{subTitle}</p>
      <ul className="space-y-2">
        {list.map((item, index) => (
          <li key={index} className="flex items-center gap-4">
            <div>
              <Minus className="text-blue-500/75" size={18} />
            </div>

            <span className="text-sm md:text-base">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
