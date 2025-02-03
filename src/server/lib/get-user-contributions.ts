import { z } from "zod";
import { octokit } from "./graphql-client";
import {
  GitHubContributionsResponseSchema,
  GitHubPRResponseSchema,
} from "./types";
import { aggregateDailyContributions } from "./formatter";

export async function getUserContributions(
  username: string,
  from: Date,
  to: Date
) {
  try {
    const contributionDataPromise = octokit.graphql(CONTRIBUTIONS_QUERY, {
      username,
      from: from.toISOString(),
      to: to.toISOString(),
    });
    const prDataResponsePromise = octokit.graphql.paginate(
      getPRQuery({ username, from: from.toISOString(), to: to.toISOString() })
    );

    const contributionData = GitHubContributionsResponseSchema.parse(
      await contributionDataPromise
    );
    const prData = GitHubPRResponseSchema.parse(await prDataResponsePromise);

    return {
      contributionCalendar:
        contributionData.user.contributionsCollection.contributionCalendar,
      pullRequestContributions: aggregateDailyContributions(
        prData.search.nodes
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

const CONTRIBUTIONS_QUERY = `
  query getUserContributions($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
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
      }
    }
  }
`;

const getPRQuery = ({
  username,
  from,
  to,
}: {
  username: string;
  from: string;
  to: string;
}) => `
  query ($cursor: String) {
    search(
      query: "is:pr author:${username} created:${from}..${to} is:merged", 
      type: ISSUE, 
      first: 100, 
      after: $cursor
    ) {
      issueCount
      nodes {
        ... on PullRequest {
          number
          title
          url
          state
          createdAt
          repository {
            name
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
