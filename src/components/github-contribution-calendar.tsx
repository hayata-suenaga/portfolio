"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { GithubContributionData } from "@/server/api/root";

function GitHubContributionCalendar({
  contributionCalendarData,
}: {
  contributionCalendarData: GithubContributionData["contributionCalendar"];
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [tooltip, setTooltip] = useState<{
    label: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    if (contributionCalendarData && svgRef.current) {
      createCalendar({
        svgEl: svgRef.current,
        weeklyData: contributionCalendarData.weeks,
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
  }, [contributionCalendarData]);

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
      className="absolute pointer-events-none bg-popover border border-border p-2.5 rounded-lg text-popover-foreground text-xs z-50 shadow-md"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -100%)",
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
    TOP: 20,
    RIGHT: 0,
    BOTTOM: 0,
    LEFT: 20,
  };
  const CELL_SIZE = 11;
  const CELL_PADDING = 1.5;
  const CELL_RADIUS = CELL_SIZE / 2;
  const DAYS_IN_WEEK = 7;
  const LABEL_PADDING = 8;

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
      .attr("width", CELL_SIZE - CELL_PADDING)
      .attr("height", CELL_SIZE - CELL_PADDING)
      .attr("x", 0)
      .attr("y", (d) => d.weekday * CELL_SIZE)
      .attr("rx", CELL_RADIUS)
      .attr("ry", CELL_RADIUS)
      .attr("class", (d) => {
        const baseClass =
          "transition-colors duration-200 cursor-pointer hover:opacity-80";
        switch (d.contributionLevel) {
          case "NONE":
            return `${baseClass} fill-muted`;
          case "FIRST_QUARTILE":
            return `${baseClass} fill-yellow-300`;
          case "SECOND_QUARTILE":
            return `${baseClass} fill-yellow-500`;
          case "THIRD_QUARTILE":
            return `${baseClass} fill-yellow-700`;
          case "FOURTH_QUARTILE":
            return `${baseClass} fill-yellow-900`;
        }
      })
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
      .attr("class", "text-[8px] font-medium fill-muted-foreground");

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
      .attr("class", "text-[8px] font-medium fill-muted-foreground");
  }
}
