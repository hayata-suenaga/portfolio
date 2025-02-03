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
  number: z.number(),
  title: z.string(),
  state: z.enum(["OPEN", "CLOSED", "MERGED"]),
  createdAt: z.string(),
  url: z.string().url(),
});

const PullRequestContributionSchema = z
  .object({
    pullRequest: PullRequestSchema,
  })
  .nullable();

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

export const SearchResponseSchema = z.object({
  data: z.object({
    search: z.object({
      issueCount: z.number(),
      nodes: z.array(PullRequestSchema),
    }),
  }),
});

export const RepositorySchema = z.object({
  pullRequests: z.object({
    nodes: z.array(PullRequestSchema),
  }),
});
