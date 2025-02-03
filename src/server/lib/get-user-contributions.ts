import { z } from "zod";
import { graphqlWithAuth } from "./graphql-client";
import { GitHubContributionsResponseSchema, RepositorySchema } from "./types";
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

    const tempResult = await graphqlWithAuth(PR_QUERY, {
      from: from.toISOString(),
      to: to.toISOString(),
      userLogin: username,
    });

    console.log("prs for two repos", JSON.stringify(tempResult));

    // const tempValidatedResponse = z
    //   .object({
    //     eisukeMono: RepositorySchema,
    //     portfolio: RepositorySchema,
    //   })
    //   .parse(tempResult);

    return {
      contributionCalendar:
        validatedResponse.user.contributionsCollection.contributionCalendar,
      pullRequestContributions: aggregateDailyContributions(
        validatedResponse.user.contributionsCollection.pullRequestContributions
      ),
      // tempPullRequestContributions: tempValidatedResponse,
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
              number
            }
          }
          totalCount
        }
      }
    }
  }
`;

const PR_QUERY = `
  query {
    user(login: "hayata-suenaga") {
      pullRequests(first: 100, states: MERGED, orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        nodes {
          createdAt
          number
          title
          repository {
            name
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;
