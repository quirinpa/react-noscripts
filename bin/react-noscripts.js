#!/usr/bin/env node

const { cexec } = require("../cexec");
const { bias } = require("../bias");

process.on("unhandledRejection", err => {
  throw err;
});

function scriptCmd(path) {
  return process.execPath + ' ' + require.resolve("../scripts/" + path);
}

const scripts = {
  build: scriptCmd("build"),
  start: scriptCmd("start"),
  test: "npx jest --projects " + process.cwd(),
  lint: "npx eslint --format compact --ext .js,.jsx,.ts,.tsx src",
  init: __dirname + "/../scripts/init.sh",
};

const args = process.argv.slice(2);
const scriptIndex = args.findIndex(x => scripts[x]);
const scriptName = scriptIndex === -1 ? args[0] : args[scriptIndex];
const script = scripts[scriptName];
// const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

if (!script)
  throw new Error("Unknown script " + scriptName);

if (script.charAt(0) == "*") {
  cexec(process.execPath + ' ' + require.resolve("../scripts/" + script.substr(1)));
} else
  cexec(script);
