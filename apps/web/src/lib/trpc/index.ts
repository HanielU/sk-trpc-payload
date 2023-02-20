import superjson from "superjson";
import type { AppRouter } from "@apps/server";
import type { LoadEvent } from "@sveltejs/kit";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
// import { dev } from "$app/environment";
// import { env } from "$env/dynamic/public";

export const trpc = (loadFetch?: LoadEvent["fetch"]) =>
  createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: "/trpc",
      }),
    ],
    ...(loadFetch && { fetch: loadFetch as typeof fetch }),
  });
