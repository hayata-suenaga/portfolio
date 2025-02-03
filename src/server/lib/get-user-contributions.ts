import { z } from "zod";
import { graphqlWithAuth } from "./graphql-client";
import { GitHubContributionsResponseSchema } from "./types";
import { aggregateDailyContributions } from "./formatter";

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

    return {
      contributionCalendar:
        validatedResponse.user.contributionsCollection.contributionCalendar,
      pullRequestContributions: aggregateDailyContributions(
        validatedResponse.user.contributionsCollection.pullRequestContributions
      ),
    };
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
