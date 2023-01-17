import Categories from "./payload/collections/Categories";
import Posts from "./payload/collections/Posts";
import Tags from "./payload/collections/Tags";
import Users from "./payload/collections/Users";
import path from "path";
import { buildConfig } from "payload/config";

export default buildConfig({
  serverURL: "http://localhost:3000",
  admin: {
    user: Users.slug,
  },
  collections: [Categories, Posts, Tags, Users],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
});
