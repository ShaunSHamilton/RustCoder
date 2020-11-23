import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import "../../node_modules/xterm/css/xterm.css";
import { io } from "socket.io-client";

const terminal = new Terminal();
const Console = (props) => {
  const [text, setText] = useState("");
  const shouldRender = useRef(true);
  const socket = io();
  // useEffect(() => {
  //   terminal.open(document.getElementById("console"));
  //   terminal.onData((e) => {
  //     console.log("console 1: ", e);
  //     socket.emit("term.toTerm", e);
  //   });
  // }, []);
  // socket.on("term.incData", (data) => {
  //   terminal.write(data);
  // });
  useEffect(() => {
    socket.emit("term.toTerm", text);
  }, []);
  const handleInput = (e) => {
    // console.log("console 1: ", e);
    setText(e.target.value);
  };
  const handleEnter = (e) => {
    if (e.which == 13) {
      if (!shouldRender.current) {
        shouldRender.current = true;
      }
      socket.emit("term.toTerm", stripTerminal(text) + String.fromCharCode(13));
    }
  };

  function stripTerminal(text) {
    const test = text.replace(/PS.*?>\s*?/, "");
    console.log("String: ", test);
    return test;
  }

  socket.on("term.incData", (data) => {
    console.log("console 2: ", typeof data, data);
    if (shouldRender.current) {
      shouldRender.current = false;
      setText(data);
    }
  });
  return (
    <div id="console">
      <input
        type="text"
        value={text}
        onChange={handleInput}
        onKeyPress={handleEnter}
      ></input>
    </div>
  );
};

export default Console;
