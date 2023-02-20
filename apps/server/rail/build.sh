#!/bin/sh

rm -rf dist 
chmod +x ./rail/replacer
# prep-build
./rail/replacer --dir ./src/collections .ts .cts --dirfile ./src 'access";' 'access.cjs";'
./rail/replacer --file ./src/payload.config.ts 's";' 's.cjs";'
./rail/replacer --file ./src/server.mts handler.mjs handler.js
./rail/replacer --file ./package.json '"type":' '"#type":' # mod-off
node esbuild.build.mjs

# prep-dev
./rail/replacer --dir ./src/collections .cts .ts --dirfile ./src '.cjs";' '";
./rail/replacer --file ./src/payload.config.ts '.cjs";' '";'
./rail/replacer --file ./src/server.mts handler.js handler.mjs
