import { z } from "zod";
import { graphqlWithAuth } from "./graphql-client";

export async function getUserContributions(
  username: string,
  from: Date,
  to: Date
) {
  try {
    const result = await graphqlWithAuth(GET_USER_CONTRIBUTIONS, {
      username,
      from: from.toISOString(),
      to: to.toISOString(),
    });

    // Validate the response with Zod
    const validatedResponse = GitHubContributionsResponseSchema.parse(result);

    return validatedResponse.user.contributionsCollection.contributionCalendar;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Response validation error:", error.errors);
    }
    console.error("Error fetching user contributions:", error);
    throw error;
  }
}

const GET_USER_CONTRIBUTIONS = `
  query getUserContributions($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
              weekday
            }
            firstDay
          }
        }
        pullRequestContributions(first: 100, orderBy: {direction: DESC}) {
          nodes {
            pullRequest {
              title
              url
              state
              createdAt
            }
          }
          totalCount
        }
      }
    }
  }
`;

// Define Zod schemas
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

const GitHubContributionsResponseSchema = z.object({
  user: z.object({
    contributionsCollection: ContributionsCollectionSchema,
  }),
});
