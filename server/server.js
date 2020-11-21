const express = require("express");
const os = require("os");
const pty = require("node-pty");
const window = require("tauri/api/window");
const { emit, listen } = require("tauri/api/event");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

const shell = os.platform() === "win32" ? "powershell.exe" : "bash";
const ptyProcess = pty.spawn(shell, [], {
  name: "xterm-color",
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env,
});

ptyProcess.onData((data) => {
  console.log("server: ", data);
  emit("term.incData", data);
});

listen("term.toTerm", (e) => {
  console.log("server 2: ", e.payload);
  ptyProcess.write(e.payload.data);
});

app.route("/").get((req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
