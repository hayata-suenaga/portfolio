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
      createCalendar(svgRef.current, contributionData);
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
    <div className="relative w-full">
      <svg ref={svgRef} width="100%" height="auto" />
    </div>
  );
}

export default GitHubContributionCalendar;

const createCalendar = (
  svgEl: SVGSVGElement,
  data: WeeklyContributionData[]
) => {
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

  // Clear existing content
  d3.select(svgEl).selectAll("*").remove();

  const svg = d3
    .select(svgEl)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("font-family", "sans-serif")
    .attr("font-size", 9);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Remove any existing tooltips
  d3.select("body").selectAll(".calendar-tooltip").remove();

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "calendar-tooltip")
    .classed("bg-background", true)
    .classed("border-border", true)
    .classed("border", true)
    .classed("p-2", true)
    .classed("rounded-sm", true)
    .classed("text-foreground", true)
    .style("opacity", 0)
    .style("position", "absolute")
    .style("pointer-events", "none")
    .style("z-index", "50")
    .style("font-size", "12px");

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
      .attr("rx", 2)
      .attr("ry", 2)
      .on("mouseover", (event: MouseEvent, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `${d.contributionCount} contribution${
              d.contributionCount !== 1 ? "s" : ""
            } on ${d.date.toLocaleDateString()}`
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
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
};

type ContributionData = {
  weeks: WeeklyContributionData[];
  totalContributions: number;
};

type WeeklyContributionData = {
  contributionDays: Array<{
    date: Date;
    contributionCount: number;
    color: string;
    weekday: number;
  }>;
};
