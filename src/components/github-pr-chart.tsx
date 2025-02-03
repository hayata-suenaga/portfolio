"use client";

import { CartesianGrid, Line, LineChart, YAxis } from "recharts";

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
    <ChartContainer config={chartConfig} className="h-[300px]">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="count"
          type="monotone"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
        <YAxis dataKey="count" tickLine={false} tickCount={5} />
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
