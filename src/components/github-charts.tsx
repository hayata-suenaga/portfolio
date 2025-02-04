"use client";

import { api } from "@/trpc/react";
import GitHubContributionCalendar from "./github-contribution-calendar";
import { GitHubPRChart } from "./github-pr-chart";
import { addDays, format, startOfWeek, getYear } from "date-fns";
import { eachDayOfInterval } from "date-fns";
import { eachWeekOfInterval } from "date-fns";
import { endOfYear } from "date-fns";
import { startOfYear } from "date-fns";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function GitHubCharts({ username }: { username: string }) {
  const [selectedYear, setSelectedYear] = useState(getYear(new Date()));

  const { data: userData } = api.github.getUserData.useQuery({
    username,
  });
  const { data, error } = api.github.getUserContributions.useQuery({
    username,
    fromDate: new Date(`${selectedYear}-01-01`),
    toDate: new Date(`${selectedYear}-12-31`),
  });

  // Generate available years (from 2022 to current year)
  const availableYears = useMemo(() => {
    const currentYear = getYear(new Date());
    if (!userData) return [currentYear];

    const years = [];
    for (
      let year = getYear(userData.user.createdAt);
      year <= currentYear;
      year++
    ) {
      years.push(year);
    }
    return years;
  }, [userData]);

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

  const isLoading = !data;

  return (
    <div className="mt-8 rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">
          GitHub Activity
        </h3>
        <Select
          value={selectedYear.toString()}
          onValueChange={(value) => setSelectedYear(parseInt(value))}
          disabled={!userData}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-8">
        <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm z-10">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Loading contribution data...
                </span>
              </div>
            </div>
          )}
          <div className="min-w-[700px]">
            <GitHubContributionCalendar
              contributionCalendarData={
                data?.contributionCalendar ??
                contributionCalendarPlaceholderData
              }
            />
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">
            Weekly Pull Request Counts
          </h4>
          <div
            className={cn(
              "relative min-w-[700px] border-t pt-4 overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
            )}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm z-10">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Loading PR data...
                  </span>
                </div>
              </div>
            )}
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
