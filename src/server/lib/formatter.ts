import {
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  isBefore,
  isAfter,
  differenceInCalendarWeeks,
} from "date-fns";
import { groupBy } from "lodash";
import { PullRequest } from "./types";

export function groupPullRequestsIntoWeeks(
  pullRequests: PullRequest[],
  startDate: Date,
  endDate: Date
) {
  pullRequests.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // 1. Adjust start to first Sunday >= original start date
  let adjustedStart = startOfWeek(startDate, { weekStartsOn: 0 });
  if (isBefore(adjustedStart, startDate)) {
    adjustedStart = addWeeks(adjustedStart, 1);
  }

  // 2. Adjust end to last Saturday <= original end date
  let adjustedEnd = endOfWeek(endDate, { weekStartsOn: 0 });
  if (isAfter(adjustedEnd, endDate)) {
    adjustedEnd = subWeeks(adjustedEnd, 1);
  }

  // 3. Handle no valid weeks
  if (isAfter(adjustedStart, adjustedEnd)) {
    return [];
  }

  // 4. Generate week slots
  const weeks: Array<{
    weekStart: string;
    prs: PullRequest[];
    count: number;
  }> = [];

  let currentWeekStart = adjustedStart;
  while (!isAfter(currentWeekStart, adjustedEnd)) {
    weeks.push({
      weekStart: currentWeekStart.toISOString(),
      prs: [],
      count: 0,
    });
    currentWeekStart = addWeeks(currentWeekStart, 1);
  }

  // 5. Group pull requests by week
  const groupedPRs = groupBy(pullRequests, (pr) =>
    differenceInCalendarWeeks(pr.createdAt, adjustedStart)
  );

  // 6. Assign pull requests to their corresponding weeks
  Object.entries(groupedPRs).forEach(([weekIndex, prs]) => {
    const index = parseInt(weekIndex);
    if (index >= 0 && index < weeks.length) {
      weeks[index].prs = prs;
      weeks[index].count = prs.length;
    }
  });

  return weeks;
}
