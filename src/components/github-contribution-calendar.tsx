import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { GithubContributionData } from "@/server/api/root";

function GitHubContributionCalendar({ username }: { username: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { data, error } = api.github.getUserContributions.useQuery({
    username,
    fromDate: new Date("2024-01-01"),
    toDate: new Date("2024-12-31"),
  });

  const [tooltip, setTooltip] = useState<{
    label: string;
    x: number;
    y: number;
  } | null>(null);

  // Separate useEffect for creating the calendar after data is loaded and component is mounted
  useEffect(() => {
    if (data && svgRef.current) {
      createCalendar({
        svgEl: svgRef.current,
        weeklyData: data.contributionCalendar.weeks,
        onMouseOver: (args) => {
          if (!args) setTooltip(null);
          else {
            const { data, x, y } = args;

            setTooltip({
              label: `${data.contributionCount} contribution${
                data.contributionCount !== 1 ? "s" : ""
              } on ${data.date.toLocaleDateString()}`,
              x: x + 10,
              y: y - 28,
            });
          }
        },
      });
    }
  }, [data]);

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
    <>
      <div>
        <svg ref={svgRef} width="100%" height="auto" />
      </div>
      {tooltip && (
        <CalendarTooltip label={tooltip.label} x={tooltip.x} y={tooltip.y} />
      )}
    </>
  );
}

export default GitHubContributionCalendar;

function CalendarTooltip({
  label,
  x,
  y,
}: {
  label: string;
  x: number;
  y: number;
}) {
  return (
    <div
      className="absolute pointer-events-none bg-background border border-border p-2 rounded-sm text-foreground text-xs z-50"
      style={{
        left: x,
        top: y,
      }}
    >
      {label}
    </div>
  );
}

function createCalendar({
  svgEl,
  weeklyData,
  onMouseOver,
}: {
  svgEl: SVGSVGElement;
  weeklyData: GithubContributionData["contributionCalendar"]["weeks"];
  onMouseOver: (
    _: {
      data: GithubContributionData["contributionCalendar"]["weeks"][number]["contributionDays"][number];
      x: number;
      y: number;
    } | null
  ) => void;
}) {
  // Clear existing content
  d3.select(svgEl).selectAll("*").remove();

  const MARGIN = {
    TOP: 16,
    RIGHT: 0,
    BOTTOM: 0,
    LEFT: 16,
  };
  const CELL_SIZE = 10;
  const DAYS_IN_WEEK = 7;
  const LABEL_PADDING = 4;

  // Calculate the total width based on the number of weeks
  const gridWidth = weeklyData.length * CELL_SIZE;
  const canvasWidth = gridWidth + MARGIN.LEFT + MARGIN.RIGHT;
  const canvasHeight = DAYS_IN_WEEK * CELL_SIZE + MARGIN.TOP + MARGIN.BOTTOM;

  const svg = d3
    .select(svgEl)
    .attr("viewBox", `0 0 ${canvasWidth} ${canvasHeight}`);

  const grid = svg
    .append("g")
    .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

  // Create grid for each week
  weeklyData.forEach((week, weekIndex) => {
    const column = grid
      .append("g")
      .attr("transform", `translate(${weekIndex * CELL_SIZE}, 0)`);

    column
      .selectAll("rect")
      .data(week.contributionDays)
      .join("rect")
      .attr("width", CELL_SIZE - 1)
      .attr("height", CELL_SIZE - 1)
      .attr("x", 0)
      .attr("y", (d) => d.weekday * CELL_SIZE)
      .attr("rx", CELL_SIZE / 2)
      .attr("ry", CELL_SIZE / 2)
      .classed("fill-muted", (d) => d.contributionLevel === "NONE")
      .classed(
        "fill-yellow-300",
        (d) => d.contributionLevel === "FIRST_QUARTILE"
      )
      .classed(
        "fill-yellow-500",
        (d) => d.contributionLevel === "SECOND_QUARTILE"
      )
      .classed(
        "fill-yellow-700",
        (d) => d.contributionLevel === "THIRD_QUARTILE"
      )
      .classed(
        "fill-yellow-900",
        (d) => d.contributionLevel === "FOURTH_QUARTILE"
      )
      .on("mouseover", (event: MouseEvent, data) => {
        onMouseOver({ data, x: event.pageX, y: event.pageY });
      })
      .on("mouseout", () => {
        onMouseOver(null);
      });
  });

  // Add month labels at the top
  if (weeklyData.length > 0) {
    const months = Array.from(
      new Set(
        weeklyData.flatMap((week) =>
          week.contributionDays.map(
            (day) => new Date(day.date.getFullYear(), day.date.getMonth(), 1)
          )
        )
      )
    ).sort((a, b) => a.getTime() - b.getTime());

    svg
      .append("g")
      .attr(
        "transform",
        `translate(${MARGIN.LEFT}, ${MARGIN.TOP - LABEL_PADDING})`
      )
      .selectAll("text")
      .data(months)
      .join("text")
      .text((d) => d3.timeFormat("%b")(d))
      .attr("x", (d) => {
        const weekIndex = weeklyData.findIndex((week) =>
          week.contributionDays.some(
            (day) =>
              day.date.getMonth() === d.getMonth() &&
              day.date.getFullYear() === d.getFullYear()
          )
        );
        return weekIndex * CELL_SIZE;
      })
      .classed("text-[9px]", true)
      .classed("fill-muted-foreground", true)
      .attr("text-anchor", "start");
  }

  // Add day labels on the left
  const dayLabels = ["", "M", "", "W", "", "F", ""];
  svg
    .append("g")
    .attr(
      "transform",
      `translate(${MARGIN.LEFT - LABEL_PADDING}, ${MARGIN.TOP})`
    )
    .selectAll("text")
    .data(dayLabels)
    .join("text")
    .text((d) => d)
    .attr("y", (_, i) => i * CELL_SIZE + CELL_SIZE / 2)
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "middle")
    .classed("text-[9px]", true)
    .classed("fill-muted-foreground", true);
}
