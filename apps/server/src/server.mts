import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import payload from "payload";
import { appRouter } from "./trpc/router.mjs";
import { createContext } from "./trpc/context.mjs";

// NOTE: Just here as a placeholder for sveltekit
// handler.mjs will be automatically converted to handler\.js (backslash to avoid conversion in comment)
// and is the sveltekit entrypoint
import { handler } from "./web/handler.mjs";

const app = express();
const port = process.env.PORT || 3000;

// add multiple origins to allowlist
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.PAYLOAD_PUBLIC_SERVER_URL],
  })
);

// Redirect root to Admin panel
// app.get("/", (_, res) => {
//   res.redirect("/admin");
// });

// Add your own express routes here

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGO_URL,
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  app.use(payload.authenticate);

  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.use(handler);

  app.listen(+port, () => {
    console.log(`API Server listening on port ${port}`);
  });
};

start();
