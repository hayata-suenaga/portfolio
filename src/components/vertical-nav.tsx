"use client";

import useScrollspy from "@/lib/useScrollSpy";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/nav-items";

export default function VerticalNav() {
  const activeSectionIds = useScrollspy(NAV_ITEMS.map((nav) => nav.href));

  return (
    <div className="hidden fixed left-1 bottom-1/3 lg:flex flex-col xl:left-16">
      {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
        return (
          <Link key={href} title={label} href={`#${href}`}>
            <div className="flex gap-2 items-stretch">
              <div
                className={`animate-linear-indicator w-[2px] bg-primary`}
                style={{
                  animationTimeline: `--${href}`,
                }}
              />
              {
                <Icon
                  className={cn(
                    `size-5 my-4 transition-all hover:text-primary`,
                    activeSectionIds.includes(href)
                      ? "text-primary"
                      : "opacity-40 focus-visible:opacity-100 hover:opacity-80"
                  )}
                />
              }
            </div>
          </Link>
        );
      })}
    </div>
  );
}
