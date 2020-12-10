const express = require("express");
const os = require("os");
const pty = require("node-pty");
const app = express();
const http = require("http").createServer(app);

// Dynamicall set port and start server
const PORT = 8420;
const io = require("socket.io")(http);
io.serveClient(false);

app.use(express.static("../../../public"));

io.on("connection", (socket) => {
  const shell = os.platform() === "win32" ? "powershell.exe" : "bash";
  socket.on("mountTerm", (dir) => {
    const ptyProcess = pty.spawn(shell, [], {
      name: "xterm-color",
      cols: 80,
      rows: 30,
      cwd: dir || process.env.HOME,
      env: process.env,
    });

    ptyProcess.onData((ptyData) => {
      io.emit("term.incData", JSON.stringify({ ptyData }));
    });

    socket.on("term.toTerm", (xtermData) => {
      ptyProcess.write(xtermData);
    });
  });
  socket.on("disconnect", () => {
    console.log(
      "Socket.io has disconnected...\n The terminal may not be working"
    );
  });
});

app.route("/").get((req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
