"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface GitHubContributionCalendarProps {
  username: string;
}

const GitHubContributionCalendar: React.FC<GitHubContributionCalendarProps> = ({
  username,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/github-contributions?username=${username}`
        );
        const data = await response.json();
        const contributionData = transformData(data);
        createCalendar(contributionData);
      } catch (error) {
        console.error(
          "Error fetching or rendering GitHub contributions:",
          error
        );
      }
    };

    fetchData();
  }, [username]);

  const transformData = (apiData: any): ContributionDay[] => {
    return apiData.data.user.contributionsCollection.contributionCalendar.weeks
      .flatMap((week: any) => week.contributionDays)
      .map((day: any) => ({
        date: new Date(day.date),
        count: day.contributionCount,
        color: day.color,
      }));
  };

  const createCalendar = (data: ContributionDay[]) => {
    if (!svgRef.current) return;

    const cellSize = 15;
    const width = 828;
    const height = 128;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("font-family", "sans-serif")
      .attr("font-size", 10);

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "calendar-tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "1px solid #ddd")
      .style("padding", "10px")
      .style("border-radius", "4px");

    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("width", cellSize - 1)
      .attr("height", cellSize - 1)
      .attr("x", (d, i) => (i % 52) * cellSize)
      .attr("y", (d, i) => Math.floor(i / 52) * cellSize)
      .attr("fill", (d) => d.color)
      .attr("rx", 2)
      .attr("ry", 2)
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`${d.count} contributions on ${d.date.toDateString()}`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Add month labels
    const months = d3.utcMonths(
      d3.utcMonth(data[0].date),
      data[data.length - 1].date
    );
    svg
      .append("g")
      .selectAll("text")
      .data(months)
      .join("text")
      .attr("x", (d, i) => i * (cellSize * 4.3))
      .attr("y", -5)
      .text((d) => d3.utcFormat("%b")(d))
      .attr("font-size", "10px")
      .attr("text-anchor", "start")
      .attr("fill", "#767676");
  };

  return <svg ref={svgRef} width="100%" height="auto" />;
};

export default GitHubContributionCalendar;
