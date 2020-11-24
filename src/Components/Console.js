import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "../../node_modules/xterm/css/xterm.css";
import { io } from "socket.io-client";

const terminal = new Terminal();

// TODO: Look into npm Mitt; Only update `text` when ABSOLUTELY necessary!; Test for change in `text`/emitted-message
const Console = () => {
  const socket = io();
  const element = useRef(null);
  console.log("Console defined...");
  useEffect(() => {
    element.current = document.getElementById("console");
    terminal.open(element.current);
  }, []);

  socket.on("term.incData", (data) => {
    console.log("term.incData...");
    const datas = JSON.parse(data);
    terminal.write(datas.data);
  });
  terminal.onData((data) => {
    console.log("onData...: ", data);
    socket.emit("term.toTerm", data);
  });
  terminal.onKey(({ domEvent: { which } }) => {
    console.log("onKey...", which);

    if (which === 8) {
      terminal.write("\b");
    }
  });

  return <div id="console"></div>;
};

export default Console;
