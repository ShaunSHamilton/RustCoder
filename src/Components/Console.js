import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "../../node_modules/xterm/css/xterm.css";
import { io } from "socket.io-client";

const terminal = new Terminal();

// TODO: Look into npm Mitt;
const Console = (props) => {
  const socket = io();
  const element = useRef(null);
  useEffect(() => {
    // Mount terminal on server:
    socket.emit("mountTerm", props.dir);
    element.current = document.getElementById("console");
    terminal.open(element.current);
  }, []);

  socket.on("term.incData", (ptyJSON) => {
    const { ptyData } = JSON.parse(ptyJSON);
    terminal.write(ptyData);
  });
  terminal.onData((xtermData) => {
    socket.emit("term.toTerm", xtermData);
  });
  terminal.onKey(({ domEvent: { which } }) => {
    // Have to specify backspace for terminal to receive
    // data, and emit it.
    if (which === 8) {
      terminal.write("\b");
    }
  });

  return <div id="console"></div>;
};

export default React.memo(Console);
