const { spawn } = require("node:child_process");

function cexec(cmd, nodeArgs) {
  // console.log("cexec", cmd);
  let args = cmd.split(' ');
  const path = args.shift() + " " + (nodeArgs || []).join(" ");

  const child = spawn(path, args, {
    cwd: process.cwd(),
    env: {
      ...process.env,
      NODE_PATH: process.cwd() + "/node_modules:" + __dirname + "/node_modules",
      __dirname,
    },
    stdio: [process.stdin, process.stdout, process.stderr],
    encoding: "utf-8"
  });

  child.on("close", code => {
    process.exit(code);
  });

  return child;
}

module.exports = { cexec };
