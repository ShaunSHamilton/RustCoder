import React, { useState, useRef } from "react";
import "./App.css";
import Content from "./Components/Content";
import Editor from "@monaco-editor/react";

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
  const valueGetter = useRef(() => "// Test");

  const handleEditorDidMount = (_valueGetter: any) => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  };

  const onSubmit = (): void => {
    alert(valueGetter.current());
  };
  const handleDocs = (): void => {};
  return (
    <div id="app">
      <Content
        onSubmit={onSubmit}
        handleDocs={handleDocs}
        isEditorReady={isEditorReady}
      />
      <Editor
        height="100vh"
        language="rust"
        options={editorOptions}
        theme="dark"
        value={"// write your code here"}
        editorDidMount={handleEditorDidMount}
      />
    </div>
  );
}

export default App;
