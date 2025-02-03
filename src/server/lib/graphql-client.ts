import { graphql } from "@octokit/graphql";

// GraphQL client setup
export const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});
