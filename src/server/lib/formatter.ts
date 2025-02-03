import _ from "lodash";
import { PullRequest } from "./types";

export function aggregateWeeklyContributions(pullRequests: PullRequest[]) {
  if (pullRequests.length === 0) return [];

  // Get the date range from the sorted PRs
  const firstPRDate = new Date(pullRequests[pullRequests.length - 1].createdAt);
  const lastPRDate = new Date(pullRequests[0].createdAt);

  // Find the boundaries of complete weeks
  const firstSunday = new Date(firstPRDate);
  firstSunday.setDate(firstPRDate.getDate() + ((7 - firstPRDate.getDay()) % 7));

  const lastSaturday = new Date(lastPRDate);
  lastSaturday.setDate(lastPRDate.getDate() - ((lastPRDate.getDay() + 1) % 7));

  // Group PRs by week
  const weeklyData = _.chain(pullRequests)
    .filter((pr) => {
      const date = new Date(pr.createdAt);
      return date >= firstSunday && date <= lastSaturday;
    })
    .groupBy((pr) => {
      const date = new Date(pr.createdAt);
      const sundayOfWeek = new Date(date);
      sundayOfWeek.setDate(date.getDate() - date.getDay());
      return sundayOfWeek.toISOString().split("T")[0];
    })
    .map((prs, weekStart) => ({
      weekStart: new Date(weekStart),
      weekEnd: new Date(
        new Date(weekStart).setDate(new Date(weekStart).getDate() + 6)
      ),
      count: prs.length,
    }))
    .value();

  return weeklyData;
}
