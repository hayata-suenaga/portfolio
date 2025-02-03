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

    const prDataResponsePromise = octokit.graphql.paginate(PR_QUERY, {
      username,
      from: from.toISOString(),
      to: to.toISOString(),
    });
    const contributionData = GitHubContributionsResponseSchema.parse(
      await contributionDataPromise
    );
    const prData = GitHubPRResponseSchema.parse(await prDataResponsePromise);

    const repositories = prData.search.nodes.map((pr) => pr.repository.name);
    const uniqueRepositories = Array.from(new Set(repositories));
    console.log("uniqueRepositories", uniqueRepositories);
    console.log("most recent date", prData.search.nodes[0].createdAt);
    console.log(
      "most distant date",
      prData.search.nodes[prData.search.nodes.length - 1].createdAt
    );

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

const PR_QUERY = `
  query ($cursor: String, $username: String!, $from: DateTime!, $to: DateTime!) {
    search(
      query: "is:pr author:$username created:$from..$to is:merged", 
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

// const PR_QUERY = `
//   query ($cursor: String, $username: String!) {
//     user(login: $username) {
//       pullRequests(first: 100, after: $cursor, states: MERGED, orderBy: {field: CREATED_AT, direction: DESC}) {
//         totalCount
//         nodes {
//           number
//           title
//           url
//           state
//           createdAt
//           repository {
//             name
//           }
//         }
//         pageInfo {
//           hasNextPage
//           endCursor
//         }
//       }
//     }
//   }
// `;
