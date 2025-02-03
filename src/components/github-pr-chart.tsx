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
  desktop: {
    label: "PR Count",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function GitHubPRChart({
  chartData,
}: {
  chartData: GithubContributionData["pullRequestContributions"];
}) {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="weekStart"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) =>
            value.toLocaleDateString("en-US", {
              month: "short",
            })
          }
        />
        <YAxis dataKey="count" tickLine={false} tickCount={5} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="count" fill="var(--color-desktop)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
