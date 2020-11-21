import React from "react";

import Buttons from "./Buttons";
import Lesson from "./Lesson";
import Challenge from "./Challenge";

// import Marked from "marked";

const Content = (props) => {
  return (
    <div id="content">
      <h1 id="title">#1: Section - Sub-section</h1>
      <Lesson />
      <Challenge />
      <Buttons
        onSubmit={props.onSubmit}
        handleDocs={props.handleDocs}
        isEditorReady={props.isEditorReady}
      />
    </div>
  );
};

export default Content;
