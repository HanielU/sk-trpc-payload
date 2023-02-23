import superjson from "superjson";
import type { AppRouter } from "@apps/server";
import type { LoadEvent } from "@sveltejs/kit";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { dev } from "$app/environment";
import { env } from "$env/dynamic/public";

export const trpc = (loadFetch?: LoadEvent["fetch"]) =>
  createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: dev ? "http://localhost:" + env.PUBLIC_PORT + "/trpc" : "/trpc",
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
