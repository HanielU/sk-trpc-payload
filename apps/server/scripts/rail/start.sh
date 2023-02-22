#!/bin/sh

chmod +x ./scripts/rail/replacer
./scripts/rail/replacer --file ./package.json '"#type":' '"type":' # mod-on