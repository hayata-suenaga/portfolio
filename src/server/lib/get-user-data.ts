import { octokit } from "./graphql-client";
import { z } from "zod";

export async function getUserData(username: string) {
  const userData = await octokit.graphql(USER_DATA_QUERY, {
    username,
  });

  return UserDataSchema.parse(userData);
}

const USER_DATA_QUERY = `
  query($username: String!) {
    user(login: $username) {
      createdAt
    }
  }
`;

const UserDataSchema = z.object({
  user: z.object({
    createdAt: z.string().transform((date) => new Date(date)),
  }),
});
