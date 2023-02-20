#!/bin/sh

rm -rf dist 
chmod +x ./rail/replacer
# prep-build
./rail/replacer --dir ./src/collections .ts .cts --dirfile ./src '.js";' '.cjs";'
./rail/replacer --file ./src/server.mts handler.mjs handler.js
./rail/replacer --file ./package.json '"type":' '"#type":' # mod-off
node esbuild.build.mjs

# prep-dev
./rail/replacer --dir ./src/collections .cts .ts --dirfile ./src '.cjs";' '.js";'
./rail/replacer --file ./src/server.mts handler.js handler.mjs
