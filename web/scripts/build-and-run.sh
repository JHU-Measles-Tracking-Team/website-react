#!/bin/sh
npm run build

mv .next/standalone ./dist
# rm -rf ./dist/node_modules
cp -a public ./dist/public
mv .next/static ./dist/.next/static

cd dist
node server.js
