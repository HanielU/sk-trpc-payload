#!/bin/sh

rm -rf dist
# prep-build
./scripts/dum replacer --dir ./src/collections .ts .cts --dirfile ./src '.js";' '.cjs";'
./scripts/dum replacer --file ./src/server.mts handler.mjs handler.js
./scripts/dum replacer --file ./package.json '"type":' '"#type":' # mod-off
node ./esbuild.build.mjs 

# prep-dev
./scripts/dum replacer --dir ./src/collections .cts .ts --dirfile ./src '.cjs";' '.js";'
./scripts/dum replacer --file ./src/server.mts handler.js handler.mjs
