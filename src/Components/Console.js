import React, { useEffect } from "react";
// import { emit, listen } from "tauri/api/event";
import { Terminal } from "xterm";
import "../../node_modules/xterm/css/xterm.css";
import { io } from "socket.io-client";

// var os = require("os");
// var pty = require("node-pty");

// var shell = os.platform() === "win32" ? "powershell.exe" : "bash";

// var ptyProcess = pty.spawn(shell, [], {
//   name: "xterm-color",
//   cols: 80,
//   rows: 30,
//   cwd: process.env.HOME,
//   env: process.env,
// });
const terminal = new Terminal();
const Console = (props) => {
  const socket = io();
  useEffect(() => {
    terminal.open(document.getElementById("console"));
    terminal.onData((e) => {
      console.log("console 1: ", e);
      socket.emit("term.toTerm", e);
    });
  }, []);
  socket.on("term.incData", (data) => {
    terminal.write(data);
  });

  // useEffect(() => {
  //   console.log("console 2: ", props.text);
  //   terminal.write(props.text);
  // }, [props.text]);

  return <div id="console"></div>;
};

export default Console;
