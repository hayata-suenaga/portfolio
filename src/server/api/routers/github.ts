import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getUserContributions } from "@/server/lib/get-user-contributions";

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

      try {
        const data = await getUserContributions(username, fromDate, toDate);
        return data;
      } catch {
        throw new Error("Failed to fetch GitHub contributions");
      }
    }),
});
