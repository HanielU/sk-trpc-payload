import * as esbuild from "esbuild";
import t from "./package.json" assert { type: "json" };
import { readdir } from "fs/promises";
import { resolve } from "path";

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

const main = async () => {
  const stack = [];
  for await (const f of getFiles("src")) {
    stack.push(f);
  }

  await esbuild.build({
    entryPoints: stack.filter(f => !f.endsWith("types.ts") && f.endsWith(".ts")),
    bundle: true,
    platform: "node",
    target: "node14",
    outdir: "dist",
    tsconfig: "./tsconfig.json",
    external: Object.keys(t.dependencies).concat(Object.keys(t.devDependencies)),
  });
};

main();
