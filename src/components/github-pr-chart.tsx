"use client";

import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { GithubContributionData } from "@/server/api/root";

const chartConfig = {
  pr: {
    label: "PR Count",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function GitHubPRChart({
  chartData,
}: {
  chartData: GithubContributionData["pullRequestContributions"];
}) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-muted-foreground">
        Pull Requests
      </h4>
      <ChartContainer config={chartConfig} className="h-[180px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid
            vertical={false}
            strokeDasharray="4"
            className="stroke-border"
          />
          <XAxis
            dataKey="weekStart"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
            tickFormatter={(value) =>
              value.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }
            className="text-xs fill-muted-foreground"
          />
          <YAxis
            dataKey="count"
            tickLine={false}
            axisLine={false}
            tickCount={5}
            tickMargin={8}
            className="text-xs fill-muted-foreground"
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="count" fill="var(--color-pr)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
