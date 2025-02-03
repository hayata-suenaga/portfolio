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

const ContributionCalendarSchema = z.object({
  totalContributions: z.number(),
  weeks: z.array(WeekSchema),
});

export const GitHubContributionsResponseSchema = z.object({
  user: z.object({
    contributionsCollection: z.object({
      contributionCalendar: ContributionCalendarSchema,
    }),
  }),
});

const PullRequestSchema = z.object({
  number: z.number(),
  title: z.string(),
  url: z.string().url(),
  state: z.enum(["OPEN", "CLOSED", "MERGED"]),
  createdAt: z.string().transform((date) => new Date(date)),
  repository: z.object({
    name: z.string(),
  }),
});

export type PullRequest = z.infer<typeof PullRequestSchema>;

// export const GitHubPRResponseSchema = z.object({
//   user: z.object({
//     pullRequests: z.object({
//       nodes: z.array(PullRequestSchema),
//       pageInfo: z.object({
//         hasNextPage: z.boolean(),
//         endCursor: z.string(),
//       }),
//     }),
//   }),
// });

export const GitHubPRResponseSchema = z.object({
  search: z.object({
    issueCount: z.number(),
    nodes: z.array(PullRequestSchema),
    pageInfo: z.object({
      hasNextPage: z.boolean(),
      endCursor: z.string().nullable(),
    }),
  }),
});
