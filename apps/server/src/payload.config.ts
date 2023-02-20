import Categories from "./collections/Categories.js";
import Posts from "./collections/Posts.js";
import Tags from "./collections/Tags.js";
import Users from "./collections/Users.js";
import Customers from "./collections/Customers.js";
import path from "path";
import { buildConfig } from "payload/config";

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  // routes: {},
  admin: {
    user: Users.slug,
  },
  collections: [Customers, Categories, Posts, Tags, Users],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
});
