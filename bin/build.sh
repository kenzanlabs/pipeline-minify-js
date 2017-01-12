#!/usr/bin/env bash

echo "installing npm dependencies"
rm -rf node_modules > /dev/null 2>&1

npm install

echo "running build task"
gulp build