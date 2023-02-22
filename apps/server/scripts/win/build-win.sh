#!/bin/sh

# prepare for build:
# clean dist
# replace access"; with access.cjs"; in all files in the src directory
# replace s"; with s.cjs"; in payload.config.ts
# replace handler.mjs with handler.js in server.mts
# replace "type": with "#type": in package.json

rm -rf dist
./scripts/win/dum replacer \
  --dirfile ./src 'access";' 'access.cjs";' \
  --file ./src/payload.config.ts 's";' 's.cjs";' \
  --file ./src/server.mts handler.mjs handler.js \
  --file ./package.json '"type":' '"#type":' # mod-off
node ./esbuild.build.mjs # build

# --------------------------------------------

# prepare for dev:
# replace .cjs"; with "; in all files in the src directory
# replace handler.js with handler.mjs in server.mts

./scripts/win/dum replacer \
  --dirfile ./src '.cjs";' '";' \
  --file ./src/server.mts handler.js handler.mjs
