import _ from "lodash";
import { GitHubContributionsResponse } from "./types";

export function aggregateDailyContributions(
  pullRequestContributions: GitHubContributionsResponse["user"]["contributionsCollection"]["pullRequestContributions"]
) {
  // Extract all PR creation dates
  const prDates = pullRequestContributions.nodes.map(
    (node) => node.pullRequest.createdAt
  );

  // Group PRs by date
  const groupedByDate = _.groupBy(
    prDates,
    (date) => date.toISOString().split("T")[0]
  );

  // Convert to array of objects with date and count
  const formattedData = Object.entries(groupedByDate).map(([date, prs]) => ({
    date,
    count: prs.length,
  }));

  // Sort by date in ascending order (oldest to newest)
  const sortedData = _.sortBy(formattedData, (item) =>
    new Date(item.date).getTime()
  );

  // Fill in missing dates with zero counts
  const filledData = fillMissingDates(sortedData);

  return filledData;
}

function fillMissingDates(data: Array<{ date: string; count: number }>) {
  if (data.length === 0) return [];

  const result = [];
  const startDate = new Date(data[0].date);
  const endDate = new Date(data[data.length - 1].date);

  // Create a map of existing dates for quick lookup
  const dateMap = new Map(data.map((item) => [item.date, item.count]));

  // Iterate through all dates in the range
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split("T")[0];
    result.push({
      date: dateStr,
      count: dateMap.get(dateStr) || 0,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}
