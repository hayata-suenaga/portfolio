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
        data: contributionData,
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
    return <Skeleton className="w-full h-24" />;
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
  data,
  onMouseOver,
}: {
  svgEl: SVGSVGElement;
  data: WeeklyContributionData[];
  onMouseOver: (
    _: { data: DailyContributionData; x: number; y: number } | null
  ) => void;
}) {
  // Clear existing content
  d3.select(svgEl).selectAll("*").remove();

  const cellSize = 10;
  const margin = {
    top: 16,
    right: 0,
    bottom: 0,
    left: 16,
  };

  // Calculate the total width based on the number of weeks
  const gridWidth = data.length * cellSize;
  const width = gridWidth + margin.left + margin.right;
  const height = 7 * cellSize + margin.top + margin.bottom;

  //TODO: Get the function to get the cell width with scale linear?

  const svg = d3
    .select(svgEl)
    .attr("viewBox", `0 0 ${width} ${height}`)
    //TODO: Remove the front style
    .attr("font-family", "sans-serif")
    .attr("font-size", 9);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Create grid for each week
  data.forEach((week, weekIndex) => {
    const weekGroup = g
      .append("g")
      .attr("transform", `translate(${weekIndex * cellSize}, 0)`);

    weekGroup
      .selectAll("rect")
      .data(week.contributionDays)
      .join("rect")
      .attr("width", cellSize - 1)
      .attr("height", cellSize - 1)
      .attr("x", 0)
      .attr("y", (d) => d.weekday * cellSize)
      .attr("fill", (d) => d.color)
      .attr("rx", cellSize / 2)
      .attr("ry", cellSize / 2)
      .on("mouseover", (event: MouseEvent, data) => {
        onMouseOver({ data, x: event.pageX, y: event.pageY });
      })
      .on("mouseout", () => {
        onMouseOver(null);
      });
  });

  // Add month labels at the top
  if (data.length > 0) {
    const months = Array.from(
      new Set(
        data.flatMap((week) =>
          week.contributionDays.map(
            (day) => new Date(day.date.getFullYear(), day.date.getMonth(), 1)
          )
        )
      )
    ).sort((a, b) => a.getTime() - b.getTime());

    g.append("g")
      .attr("transform", `translate(0, ${-6})`)
      .selectAll("text")
      .data(months)
      .join("text")
      .attr("x", (d) => {
        const weekIndex = data.findIndex((week) =>
          week.contributionDays.some(
            (day) =>
              day.date.getMonth() === d.getMonth() &&
              day.date.getFullYear() === d.getFullYear()
          )
        );
        return weekIndex * cellSize;
      })
      .text((d) => d3.timeFormat("%b")(d))
      .classed("text-[9px]", true)
      .classed("fill-muted-foreground", true)
      .attr("text-anchor", "start");
  }

  // Add day labels on the left
  const dayLabels = ["", "M", "", "W", "", "F", ""];
  g.append("g")
    .selectAll("text")
    .data(dayLabels)
    .join("text")
    .attr("x", -6)
    .attr("y", (_, i) => i * cellSize + cellSize / 2)
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "middle")
    .classed("text-[9px]", true)
    .classed("fill-muted-foreground", true)
    .text((d) => d);
}

type ContributionData = {
  weeks: WeeklyContributionData[];
  totalContributions: number;
};

type WeeklyContributionData = {
  contributionDays: DailyContributionData[];
};

type DailyContributionData = {
  date: Date;
  contributionCount: number;
  color: string;
  weekday: number;
};
