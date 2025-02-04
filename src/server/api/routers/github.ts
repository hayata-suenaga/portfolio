import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getUserContributions } from "@/server/lib/get-user-contributions";
import { getUserData } from "@/server/lib/get-user-data";

export const githubRouter = createTRPCRouter({
  getUserContributions: publicProcedure
    .input(
      z.object({
        username: z.string(),
        fromDate: z.date().default(() => new Date("2024-01-01")),
        toDate: z.date().default(() => new Date("2024-12-31")),
      })
    )
    .query(async ({ input }) => {
      const { username, fromDate, toDate } = input;
      return getUserContributions(username, fromDate, toDate);
    }),

  getUserData: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      return getUserData(input.username);
    }),
});
