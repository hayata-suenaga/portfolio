import { NextResponse } from "next/server";
import { graphql } from "@octokit/graphql";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const data = await getUserContributions(
      username,
      new Date("2024-01-01"),
      new Date("2024-12-31")
    );
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub contributions" },
      { status: 500 }
    );
  }
}

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

async function getUserContributions(username: string, from: Date, to: Date) {
  try {
    const result = await graphqlWithAuth<{
      user: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: number;
            weeks: Array<{
              contributionDays: Array<{
                date: string;
                contributionCount: number;
              }>;
            }>;
          };
        };
      };
    }>(GET_USER_CONTRIBUTIONS, {
      username,
      from: from.toISOString(),
      to: to.toISOString(),
    });

    return result.user.contributionsCollection.contributionCalendar;
  } catch (error) {
    console.error("Error fetching user contributions:", error);
    throw error;
  }
}

const GET_USER_CONTRIBUTIONS = `
  query getUserContributions($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
              weekday
            }
          }
        }
      }
    }
  }
`;
