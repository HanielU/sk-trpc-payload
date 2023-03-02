import superjson from "superjson";
import type { AppRouter } from "@apps/server";
import type { LoadEvent } from "@sveltejs/kit";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { env } from "$env/dynamic/public";

export const trpc = (loadFetch?: LoadEvent["fetch"]) =>
  createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: env.PUBLIC_PAYLOAD_SERVER_URL + "/trpc",
        fetch(url, options) {
          if (loadFetch) {
            return loadFetch(url, {
              ...options,
              credentials: "include",
            });
          }
          return fetch(url, {
            ...options,
            credentials: "include",
          });
        },
      }),
    ],
  });
