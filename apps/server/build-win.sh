#!/bin/sh

rm -rf dist
# prep-build
./scripts/dum replacer --dir ./src/collections .ts .cts --file ./src/payload.config.ts 's";' 's.cjs";'
./scripts/dum replacer --file ./src/server.mts handler.mjs handler.js
./scripts/dum replacer --file ./package.json '"type":' '"#type":' # mod-off
node ./esbuild.build.mjs 

# prep-dev
./scripts/dum replacer --dir ./src/collections .cts .ts --file ./src/payload.config.ts '.cjs"' '"'
./scripts/dum replacer --file ./src/server.mts handler.js handler.mjs
