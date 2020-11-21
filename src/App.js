import React, { useState, useRef } from "react";
import "./App.css";
import Content from "./Components/Content";
import Editor from "@monaco-editor/react";
import Console from "./Components/Console";
import ResizePanel from "react-resize-panel";
import { emit, listen } from "tauri/api/event";
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
function App() {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [text, setText] = useState("");
  const valueGetter = useRef(() => "// Test");

  const handleEditorDidMount = (_valueGetter) => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  };

  const onSubmit = () => {
    // alert(valueGetter.current());
    const value = valueGetter.current();
    emit("codeSubmit", value);
    listen("rust-event", (e) => {
      console.log(e.payload);
      setText(e.payload.data);
    });
  };
  const handleDocs = () => {};
  return (
    <div id="app">
      <ResizePanel direction="e" containerClass="content-container">
        <Content
          onSubmit={onSubmit}
          handleDocs={handleDocs}
          isEditorReady={isEditorReady}
        />
      </ResizePanel>
      <section id="editor">
        <Editor
          height="100%"
          language="rust"
          options={editorOptions}
          theme="dark"
          value={"// write your code here"}
          editorDidMount={handleEditorDidMount}
        />
        {/* <iframe src="https://play.rust-lang.org/" id="frame"></iframe> */}
        <ResizePanel direction="n" containerClass="console-container">
          <Console text={text} />
        </ResizePanel>
      </section>
    </div>
  );
}

export default App;
