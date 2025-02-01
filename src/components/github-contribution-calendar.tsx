"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function GitHubContributionCalendar({ username }: { username: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/github-contributions?username=${username}`
        );
        const data = await response.json();
        const contributionData = transformData(data);

        if (!svgRef.current) return;
        createCalendar(svgRef.current, contributionData);
      } catch (error) {
        console.error(
          "Error fetching or rendering GitHub contributions:",
          error
        );
      }
    };

    fetchData();
  }, [username]);

  const transformData = (data: ContributionData) => {
    return data.weeks.map((week) => ({
      ...week,
      contributionDays: week.contributionDays.map((day) => ({
        ...day,
        date: new Date(day.date),
      })),
    }));
  };

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
  const cellSize = 15;
  const margin = {
    top: 20, // Space for month labels
    right: 10,
    bottom: 10,
    left: 35, // Space for day labels
  };
  const width = 828 + margin.left + margin.right;
  const height = 7 * cellSize + margin.top + margin.bottom;

  // Clear existing content
  d3.select(svgEl).selectAll("*").remove();

  const svg = d3
    .select(svgEl)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("font-family", "sans-serif")
    .attr("font-size", 10);

  // Create a group for the entire chart, translated by the margins
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Remove any existing tooltips
  d3.select("body").selectAll(".calendar-tooltip").remove();

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "calendar-tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border", "1px solid #ddd")
    .style("padding", "10px")
    .style("border-radius", "4px")
    .style("pointer-events", "none")
    .style("z-index", "10");

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
      .attr("transform", `translate(0, ${-8})`) // Adjust position upward
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
      .attr("font-size", "10px")
      .attr("text-anchor", "start")
      .attr("fill", "#767676");
  }

  // Add day labels on the left
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  g.append("g")
    .selectAll("text")
    .data(dayLabels)
    .join("text")
    .attr("x", -8) // Move labels closer to the grid
    .attr("y", (_, i) => i * cellSize + cellSize / 2)
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "middle") // More reliable than alignment-baseline
    .attr("font-size", "10px")
    .attr("fill", "#767676")
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
