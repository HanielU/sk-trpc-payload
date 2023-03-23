import { trpc } from "$lib/trpc";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get("payload-token");
  if (session) {
    const v = await trpc(event.fetch)
      .user.self.query()
      .catch(() => null);
    console.log(v);
    event.locals.user = v;
  }
  return await resolve(event);
};
