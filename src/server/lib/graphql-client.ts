import { Octokit } from "@octokit/core";
import { paginateGraphQL } from "@octokit/plugin-paginate-graphql";

const MyOctokit = Octokit.plugin(paginateGraphQL);

export const octokit = new MyOctokit({ auth: process.env.GITHUB_TOKEN });
