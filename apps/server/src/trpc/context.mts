import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { inferAsyncReturnType } from "@trpc/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  return { req, res /* prisma */ };
};

export type Context = inferAsyncReturnType<typeof createContext>;
