import payload from "payload";
import superjson from "superjson";
import type { Context } from "./context.mjs";
import { initTRPC } from "@trpc/server";

/* 
  NOTE:
  Do not use path aliases for type imports else api consumers
  will get incorrect typings.
*/

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const middleware = t.middleware;
export const router = t.router;

/**
 * Unprotected procedure
 */
export const publicProcedure = t.procedure;

export const appRouter = router({
  greeting: publicProcedure.query(() => "Hello world!"),

  posts: publicProcedure.query(async () => {
    const posts = await payload.find({
      collection: "posts",
    });

    return posts;
  }),
});

export type AppRouter = typeof appRouter;

// const isAuthed = middleware(({ next, ctx }) => {
//   if (!ctx.session?.user?.email) {
//     throw new TRPCError({
//       code: "UNAUTHORIZED",
//     });
//   }
//   return next({
//     ctx: {
//       // Infers the `session` as non-nullable
//       session: ctx.session,
//     },
//   });
// });
/**
 * Protected procedure
 */
// export const protectedProcedure = t.procedure.use(isAuthed);
