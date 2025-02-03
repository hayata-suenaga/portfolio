import { z } from "zod";

const ContributionLevelEnum = z.enum([
  "NONE",
  "FIRST_QUARTILE",
  "SECOND_QUARTILE",
  "THIRD_QUARTILE",
  "FOURTH_QUARTILE",
]);

const ContributionDaySchema = z.object({
  date: z.string().transform((date) => new Date(date)),
  contributionCount: z.number(),
  contributionLevel: ContributionLevelEnum,
  weekday: z.number(),
});

const WeekSchema = z.object({
  contributionDays: z.array(ContributionDaySchema),
  firstDay: z.string().transform((date) => new Date(date)),
});

const PullRequestSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  state: z.string(),
  createdAt: z.string().transform((date) => new Date(date)),
});

const PullRequestContributionSchema = z.object({
  pullRequest: PullRequestSchema,
});

const ContributionCalendarSchema = z.object({
  totalContributions: z.number(),
  weeks: z.array(WeekSchema),
});

const ContributionsCollectionSchema = z.object({
  contributionCalendar: ContributionCalendarSchema,
  pullRequestContributions: z.object({
    nodes: z.array(PullRequestContributionSchema),
    totalCount: z.number(),
  }),
});

export const GitHubContributionsResponseSchema = z.object({
  user: z.object({
    contributionsCollection: ContributionsCollectionSchema,
  }),
});

export type GitHubContributionsResponse = z.infer<
  typeof GitHubContributionsResponseSchema
>;
