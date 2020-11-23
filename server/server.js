const express = require("express");
const os = require("os");
const pty = require("node-pty");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
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

io.on("connection", (socket) => {
  ptyProcess.onData((data) => {
    console.log("server: ", data);
    io.emit("term.incData", data);
  });

  socket.on("term.toTerm", (e) => {
    console.log("server 2: ", e);
    ptyProcess.write(e);
  });

  socket.on("disconnect", () => {
    console.log("A user has disconnected");
  });
});

app.route("/").get((req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
