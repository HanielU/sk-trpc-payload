import * as esbuild from "esbuild";
// import t from "./package.json" assert { type: "json" };
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

(async () => {
  const stack = [];
  for await (const f of getFiles("src")) {
    stack.push(f);
  }

  const mjsEntres = stack.filter(
    f =>
      !f.endsWith("types.ts") &&
      // !f.endsWith("handler.ts") &&
      !f.endsWith("config.ts") &&
      !f.includes("collections") &&
      !f.includes("access") &&
      !f.includes("hooks") &&
      (f.endsWith(".ts") || f.endsWith(".mts"))
  );

  const cjsEntries = stack.filter(
    f =>
      f.endsWith("config.ts") ||
      f.includes("collections") ||
      f.includes("access") ||
      f.includes("hooks")
  );

  await esbuild.build({
    entryPoints: mjsEntres,
    platform: "node",
    target: "node16",
    outdir: "dist",
    tsconfig: "./tsconfig.json",
    // format: "cjs",
    bundle: false,
    outExtension: { ".js": ".mjs" },
    // external: Object.keys(t.dependencies).concat(Object.keys(t.devDependencies)),
  });

  await esbuild.build({
    entryPoints: cjsEntries,
    platform: "node",
    target: "node16",
    outdir: "dist",
    tsconfig: "./tsconfig.json",
    format: "cjs",
    bundle: false,
    outExtension: { ".js": ".cjs" },
    // external: Object.keys(t.dependencies).concat(Object.keys(t.devDependencies)),
  });
})();

/* import * as esbuild from "esbuild";
// import t from "./package.json" assert { type: "json" };
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

(async () => {
  const stack = [];
  for await (const f of getFiles("src")) {
    stack.push(f);
  }

  const mjsEntres = stack.filter(
    f =>
      !f.endsWith("types.ts") &&
      !f.endsWith("handler.ts") &&
      !f.endsWith("config.ts") &&
      !f.includes("collections") &&
      (f.endsWith(".ts") || f.endsWith(".mts"))
  );

  const cjsEntries = stack.filter(f => f.includes("collections"));

  await esbuild.build({
    entryPoints: mjsEntres,
    platform: "node",
    target: "node16",
    outdir: "dist",
    tsconfig: "./tsconfig.json",
    // format: "cjs",
    bundle: false,
    outExtension: { ".js": ".mjs" },
    // external: Object.keys(t.dependencies).concat(Object.keys(t.devDependencies)),
  });

  await esbuild.build({
    entryPoints: cjsEntries,
    platform: "node",
    target: "node16",
    outdir: "dist/collections",
    tsconfig: "./tsconfig.json",
    format: "cjs",
    bundle: false,
    // outExtension: { ".js": ".cjs" },
    // external: Object.keys(t.dependencies).concat(Object.keys(t.devDependencies)),
  });

  await esbuild.build({
    entryPoints: ["src/payload.config.ts"],
    platform: "node",
    target: "node16",
    outdir: "dist",
    tsconfig: "./tsconfig.json",
    format: "cjs",
    bundle: false,
    outExtension: { ".js": ".cjs" },
    // external: Object.keys(t.dependencies).concat(Object.keys(t.devDependencies)),
  });
})(); */
