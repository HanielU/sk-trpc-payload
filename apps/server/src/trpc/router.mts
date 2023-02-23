import payload from "payload";
import user from "./routes/user.mjs";
import { publicProcedure } from "./procedures.mjs";
import { router } from "./procedures.mjs";

/* 
  NOTE:
  Do not use path aliases for type imports else api consumers
  will get incorrect typings.
*/

export const appRouter = router({
  greeting: publicProcedure.query(() => "Hello world!"),

  posts: publicProcedure.query(async () => {
    const posts = await payload.find({
      collection: "posts",
    });

    return posts;
  }),

  user,
});

export type AppRouter = typeof appRouter;
