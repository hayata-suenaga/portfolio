"use client";

import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { GithubContributionData } from "@/server/api/root";
import { startOfMonth, isSameMonth, addDays, format } from "date-fns";
const chartConfig = {
  count: {
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
        Weekly Pull Request Counts
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
            interval={0}
            tickFormatter={getMonthStartLabel}
            textAnchor="start"
            className="text-xs fill-muted-foreground text-start"
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
            defaultIndex={1}
            content={<ChartTooltipContent labelFormatter={getWeekLabel} />}
          />
          <Bar
            dataKey="count"
            fill="var(--color-count)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

function getMonthStartLabel(dateString: string) {
  const weekStart = new Date(dateString);
  const weekEnd = addDays(weekStart, 6);

  const monthStart =
    weekStart.getDate() === 1
      ? startOfMonth(weekStart)
      : !isSameMonth(weekStart, weekEnd)
      ? startOfMonth(weekEnd)
      : undefined;

  return monthStart ? format(monthStart, "MMM") : "";
}

function getWeekLabel(dateString: string) {
  const weekStart = new Date(dateString);
  const weekEnd = addDays(weekStart, 6);

  return `${format(weekStart, "MMM dd")} - ${format(weekEnd, "MMM dd")}`;
}
