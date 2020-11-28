import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import WelcomeInit from "./Components/WelcomeInit";
import Content from "./Components/Content";
import { ControlledEditor } from "@monaco-editor/react";
import Console from "./Components/Console";
import ResizePanel from "react-resize-panel";
import { emit, listen } from "tauri/api/event";
import { io } from "socket.io-client";
// import { invoke } from "tauri/api/tauri";

const editorOptions = {
  cursorWidth: 2,
  cursorBlinking: "blink",
  cursorStyle: "line",
  lineNumbers: "on",
  tabCompletions: "on",
  snippetSuggestions: true,
  scrollBeyondLastLine: false,
};

// TODO: When editor loses focus, send data
function App() {
  const [isEnvReady, setIsEnvReady] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [dir, setDir] = useState("");
  // const [text, setText] = useState("");
  const valueGetter = useRef(() => "// Test");

  const socket = io();

  const handleInitEnv = () => {
    listen("envInitialised", () => {
      setIsEnvReady(true);
    });
    window.__TAURI__.dialog
      .open({
        defaultPath: null,
      })
      .then(function (res) {
        console.log(res);
        var pathToRead = res;
        window.__TAURI__.fs
          .readBinaryFile(pathToRead)
          .then(function (response) {
            console.log(response);
            console.log(res);
          })
          .catch(console.log(res));
      })
      .catch(console.log);
    window.__TAURI__.dialog.open({ directory: true }).then((res) => {
      setDir(res);
      emit("initialiseEnv", res);
    });
  };

  const handleEditorDidMount = (_valueGetter) => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  };

  const onSubmit = () => {
    const value = valueGetter.current();
    emit("submitCode", value);
  };
  useEffect(() => {
    emit("setFile", "1-introduction.rs");
  }, []);
  const handleDocs = () => {};
  const handleChange = (ev, value) => {
    return value;
  };
  const handleBlur = () => {
    const value = valueGetter.current();
    console.log(value);
    emit("updateCode", value);
  };
  return (
    <div id="app">
      {isEnvReady ? (
        <>
          <ResizePanel direction="e" containerClass="content-container">
            <Content
              onSubmit={onSubmit}
              handleDocs={handleDocs}
              isEditorReady={isEditorReady}
            />
          </ResizePanel>
          <section id="editor">
            <div id="code" onBlur={handleBlur}>
              <ControlledEditor
                height="100%"
                language="rust"
                options={editorOptions}
                theme="dark"
                value={"// write your code here"}
                editorDidMount={handleEditorDidMount}
                onChange={handleChange}
              />
              {/* <iframe src="https://play.rust-lang.org/" id="frame"></iframe> */}
            </div>
            <ResizePanel direction="n" containerClass="console-container">
              <Console dir={dir} />
            </ResizePanel>
          </section>
        </>
      ) : (
        <WelcomeInit handleInitEnv={handleInitEnv} />
      )}
    </div>
  );
}

export default App;
