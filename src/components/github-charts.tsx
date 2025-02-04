"use client";

import { api } from "@/trpc/react";
import Link from "next/link";
import GitHubContributionCalendar from "./github-contribution-calendar";
import { GitHubPRChart } from "./github-pr-chart";
import { addDays, format, startOfWeek } from "date-fns";
import { eachDayOfInterval } from "date-fns";
import { eachWeekOfInterval } from "date-fns";
import { endOfYear } from "date-fns";
import { startOfYear } from "date-fns";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export function GitHubCharts({ username }: { username: string }) {
  const { data, error } = api.github.getUserContributions.useQuery({
    username,
    fromDate: new Date("2024-01-01"),
    toDate: new Date("2024-12-31"),
  });

  const contributionCalendarPlaceholderData = useMemo(
    generatePlaceholderData,
    []
  );
  const prPlaceholderData = useMemo(generateChartPlaceholderData, []);

  if (error) {
    return (
      <div className="text-sm text-red-500">
        Failed to load contribution data: {error.message}
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold tracking-tight">
          GitHub Activity
        </h3>
        <Link
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline"
        >
          View Profile →
        </Link>
      </div>
      <div className="space-y-8">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          <div
            className={cn(
              "min-w-[700px]",
              data ? "" : "animate-pulse opacity-70"
            )}
          >
            <GitHubContributionCalendar
              contributionCalendarData={
                data?.contributionCalendar ??
                contributionCalendarPlaceholderData
              }
            />
          </div>
        </div>
        <div className="pt-4 border-t overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          <div
            className={cn(
              "min-w-[700px]",
              data ? "" : "animate-pulse opacity-70"
            )}
          >
            <GitHubPRChart
              chartData={data?.pullRequestContributions ?? prPlaceholderData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function generatePlaceholderData() {
  const currentYear = new Date().getFullYear();
  const yearStart = startOfYear(new Date(currentYear, 0, 1));
  const yearEnd = endOfYear(new Date(currentYear, 0, 1));

  // Get all weeks in the year
  const weeksInYear = eachWeekOfInterval(
    { start: yearStart, end: yearEnd },
    { weekStartsOn: 0 } // Week starts on Sunday
  );

  const weeks = weeksInYear.map((weekStart) => {
    // Get all days in the week
    const daysInWeek = eachDayOfInterval({
      start: weekStart,
      end: addDays(weekStart, 6),
    });

    const contributionDays = daysInWeek.map((date) => ({
      date: date,
      contributionCount: 0,
      contributionLevel: "NONE" as const,
      weekday: date.getDay(),
    }));

    return {
      contributionDays,
      firstDay: startOfWeek(weekStart, { weekStartsOn: 0 }),
    };
  });

  return {
    totalContributions: 0,
    weeks,
  };
}

export function generateChartPlaceholderData() {
  const currentYear = new Date().getFullYear();
  const yearStart = startOfYear(new Date(currentYear, 0, 1));
  const yearEnd = endOfYear(new Date(currentYear, 0, 1));

  // Get all weeks in the year
  const weeks = eachWeekOfInterval(
    { start: yearStart, end: yearEnd },
    { weekStartsOn: 0 } // Week starts on Sunday
  );

  return weeks.map((weekStart) => ({
    weekStart: format(weekStart, "yyyy-MM-dd"),
    prs: [],
    count: 0,
  }));
}
