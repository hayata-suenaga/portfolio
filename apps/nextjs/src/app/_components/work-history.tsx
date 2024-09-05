import React from "react";
import { Minus } from "lucide-react";

import { ShootingStars } from "@acme/ui/shooting-stars";
import { StarsBackground } from "@acme/ui/star-background";
import { Timeline } from "@acme/ui/timeline";

const items_1 = [
  "Managed teams of 3-6 engineers",
  "Onboarded new engineers to Expensify's payment infrastructure",
  "Co-led a TypeScript migration of Expensify's codebase",
  "Authored TypeScript guidelines now used by the entire engineering team",
];

const items_2 = [
  "Reported directly to CEO",
  "Shipped more than 10 new features to production",
];

const items_3 = [
  "Graduated with a 3.9 GPA",
  "Awarded the Computer Science Department's highest honor",
];

export function WorkHistory() {
  const data = [
    {
      title: "Expensify",
      content: (
        <div>
          <p className="mb-8s mb-2 text-xl font-normal text-neutral-800 dark:text-neutral-200">
            Senior Full Stack Engineer
          </p>
          <p className="mb-4 text-sm dark:text-slate-50/75">
            Feb 2023 - August 2024
          </p>
          <ul className="space-y-2">
            {items_1.map((item) => (
              <li className="flex items-center gap-4">
                <Minus className="text-blue-500/75" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      title: "Dendron",
      content: (
        <div>
          <p className="mb-8s mb-2 text-xl font-normal text-neutral-800 dark:text-neutral-200">
            Summer Startup Resident
          </p>
          <p className="mb-4 text-sm dark:text-slate-50/75">
            June 2022 - September 2022
          </p>
          <ul className="space-y-2">
            {items_2.map((item) => (
              <li className="flex items-center gap-4">
                <Minus className="text-blue-500/75" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      title: "Centre College",
      content: (
        <div>
          <p className="mb-8s mb-2 text-xl font-normal text-neutral-800 dark:text-neutral-200">
            BS in Computer Science
          </p>
          <p className="mb-4 text-sm dark:text-slate-50/75">
            May 2019 - May 2022
          </p>
          <ul className="space-y-2">
            {items_3.map((item) => (
              <li className="flex items-center gap-4">
                <Minus className="text-blue-500/75" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full">
      <Timeline data={data} />
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
