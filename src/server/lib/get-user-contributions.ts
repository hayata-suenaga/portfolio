import { z } from "zod";
import { octokit } from "./graphql-client";
import {
  GitHubContributionsResponseSchema,
  GitHubPRResponseSchema,
} from "./types";
import { aggregateWeeklyContributions } from "./formatter";

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
      getPRQuery({ username, from, to })
    );
    const prByDateResponsePromise = octokit.graphql(
      getPRByDateQuery({ username, date: new Date() })
    );

    const contributionData = GitHubContributionsResponseSchema.parse(
      await contributionDataPromise
    );
    const prData = GitHubPRResponseSchema.parse(await prDataResponsePromise);
    const prByDateData = GitHubPRResponseSchema.parse(
      await prByDateResponsePromise
    );

    return {
      contributionCalendar:
        contributionData.user.contributionsCollection.contributionCalendar,
      pullRequestContributions: aggregateWeeklyContributions(
        prData.search.nodes
      ),
      prsMadeToday: prByDateData.search.nodes,
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
  from: Date;
  to: Date;
}) => `
  query ($cursor: String) {
    search(
      query: "is:pr author:${username} created:${from.toISOString()}..${to.toISOString()} is:merged", 
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

const getPRByDateQuery = ({
  username,
  date,
}: {
  username: string;
  date: Date;
}) => `
  query {
    search(query: "is:pr author:${username} created:>${date.toISOString()}", type: ISSUE, first: 100) {
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
    }
  }
`;
