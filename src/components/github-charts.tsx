"use client";

import { api } from "@/trpc/react";
import Link from "next/link";
import GitHubContributionCalendar from "./github-contribution-calendar";
import { Skeleton } from "./ui/skeleton";
import { GitHubPRChart } from "./github-pr-chart";

export function GitHubCharts({ username }: { username: string }) {
  const { data, error } = api.github.getUserContributions.useQuery({
    username,
    fromDate: new Date("2024-01-01"),
    toDate: new Date("2024-12-31"),
  });

  if (error) {
    return (
      <div className="text-sm text-red-500">
        Failed to load contribution data: {error.message}
      </div>
    );
  }

  if (!data) {
    return <Skeleton className="w-full h-28" />;
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
          <div className="min-w-[700px]">
            <GitHubContributionCalendar
              contributionCalendarData={data.contributionCalendar}
            />
          </div>
        </div>
        <div className="pt-4 border-t overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          <div className="min-w-[700px]">
            <GitHubPRChart chartData={data.pullRequestContributions} />
          </div>
        </div>
      </div>
    </div>
  );
}
