import { protectedProcedure, router } from "../procedures.mjs";

export default router({
  self: protectedProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
});
