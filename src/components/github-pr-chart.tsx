"use client";

import { CartesianGrid, Line, LineChart } from "recharts";

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
    color: "hsl(var(--chart-1))",
  },
  //   mobile: {
  //     label: "Mobile",
  //     color: "hsl(var(--chart-2))",
  //   },
} satisfies ChartConfig;

export function GitHubPRChart({
  chartData,
}: {
  chartData: GithubContributionData["pullRequestContributions"];
}) {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        {/* <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        /> */}
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="count"
          type="monotone"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
        {/* <Line
          dataKey="mobile"
          type="monotone"
          stroke="var(--color-mobile)"
          strokeWidth={2}
          dot={false}
        /> */}
      </LineChart>
    </ChartContainer>
  );
}
