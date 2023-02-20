#!/bin/sh

rm -rf dist
# prep-build
dum replacer --dir ./src/collections .ts .cts --file ./src/payload.config.ts 's";' 's.cjs";'
dum replacer --file ./src/server.mts handler.mjs handler.js
dum replacer --file ./package.json '"type":' '"#type":' # mod-off
node ./esbuild.build.mjs 

# prep-dev
dum replacer --dir ./src/collections .cts .ts --file ./src/payload.config.ts '.cjs"' '"'
dum replacer --file ./src/server.mts handler.js handler.mjs
