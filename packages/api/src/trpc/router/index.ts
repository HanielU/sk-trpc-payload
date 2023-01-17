import payload from "payload";
import type { Context } from "~t/context";
import type { Post } from "~/payload-types";
import { initTRPC } from "@trpc/server";

const t = initTRPC.context<Context>().create();

export const middleware = t.middleware;
export const router = t.router;

/**
 * Unprotected procedure
 */
export const publicProcedure = t.procedure;

export const appRouter = router({
  greeting: publicProcedure.query(() => "Hello world!"),

  posts: publicProcedure.query(async () => {
    const posts = await payload.find<Post>({
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
