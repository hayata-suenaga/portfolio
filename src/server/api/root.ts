import { helloRouter } from "@/server/api/routers/hello";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { githubRouter } from "@/server/api/routers/github";
import { inferRouterOutputs } from "@trpc/server";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  hello: helloRouter,
  github: githubRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
type RouterOutputs = inferRouterOutputs<AppRouter>;
export type GithubContributionData =
  RouterOutputs["github"]["getUserContributions"];

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
