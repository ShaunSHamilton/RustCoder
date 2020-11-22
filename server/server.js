const express = require("express");
const os = require("os");
const pty = require("node-pty");
// const window = require("tauri/api/window");
// const { emit, listen } = require("tauri/api/event");
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
// io.on('connection', socket => {
//     ++currentUsers;
//     console.log("NAME: ",socket.request)
//     io.emit('user', {
//       name: socket.request.user.name,
//       currentUsers,
//       connected: true
//     });
//     socket.on('chat message', (message) => {
//       io.emit('chat message', { name: socket.request.user.name, message })
//     })
//     console.log('A user has connected');
//     socket.on('disconnect', () => {
//       console.log('A user has disconnected');
//       --currentUsers;
//       io.emit('user', {
//         name: socket.request.user.name,
//         currentUsers,
//         connected: false
//       });
//     });

app.route("/").get((req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
