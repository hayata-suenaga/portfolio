import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

// Define the context
export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    ...opts,
  };
};

// Initialize tRPC
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// Create a server-side caller
export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
