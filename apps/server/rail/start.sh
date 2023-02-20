#!/bin/sh

chmod +x ./rail/replacer
./rail/replacer --file ./package.json '"#type":' '"type":' # mod-on