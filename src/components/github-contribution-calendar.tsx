import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Skeleton } from "@/components/ui/skeleton";

function GitHubContributionCalendar({ username }: { username: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contributionData, setContributionData] = useState<
    WeeklyContributionData[] | null
  >(null);
  const [tooltip, setTooltip] = useState<{
    label: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setContributionData(null);

      try {
        const response = await fetch(
          `/api/github-contributions?username=${username}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch contribution data");
        }

        const data = await response.json();
        const transformed = transformData(data);
        setContributionData(transformed);
      } catch (error) {
        console.error(
          "Error fetching or rendering GitHub contributions:",
          error
        );
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username]);

  // Separate useEffect for creating the calendar after data is loaded and component is mounted
  useEffect(() => {
    if (contributionData && svgRef.current) {
      createCalendar({
        svgEl: svgRef.current,
        weeklyData: contributionData,
        onMouseOver: (data) => {
          if (!data) setTooltip(null);
          else
            setTooltip({
              label: `${data.data.contributionCount} contribution${
                data.data.contributionCount !== 1 ? "s" : ""
              } on ${data.data.date.toLocaleDateString()}`,
              x: data.x + 10,
              y: data.y - 28,
            });
        },
      });
    }
  }, [contributionData]);

  const transformData = (data: ContributionData) => {
    return data.weeks.map((week) => ({
      ...week,
      contributionDays: week.contributionDays.map((day) => ({
        ...day,
        date: new Date(day.date),
      })),
    }));
  };

  if (isLoading) {
    return <Skeleton className="w-full h-28" />;
  }

  if (error) {
    return (
      <div className="text-sm text-red-500">
        Failed to load contribution data: {error}
      </div>
    );
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
  weeklyData: WeeklyContributionData[];
  onMouseOver: (
    _: { data: DailyContributionData; x: number; y: number } | null
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

type ContributionData = {
  weeks: WeeklyContributionData[];
  totalContributions: number;
};

type WeeklyContributionData = {
  contributionDays: DailyContributionData[];
  firstDay: string;
};

type DailyContributionData = {
  date: Date;
  contributionCount: number;
  contributionLevel:
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";
  weekday: number;
};
