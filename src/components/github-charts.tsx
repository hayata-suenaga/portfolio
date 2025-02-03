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
    <div className="mt-8 p-4 rounded-lg border bg-card overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">GitHub Contributions</h3>
        <Link
          href="https://github.com/hayata-suenaga"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View Profile
        </Link>
      </div>
      <div className="w-full overflow-scroll">
        <div className="min-w-[700px]">
          <GitHubContributionCalendar
            contributionCalendarData={data.contributionCalendar}
          />
        </div>
      </div>
      <GitHubPRChart chartData={data.pullRequestContributions} />
    </div>
  );
}
