import React from "react";

import Buttons from "./Buttons";
import Lesson from "./Lesson";
import Challenge from "./Challenge";

interface Props {
  onSubmit: (event: any) => void;
  handleDocs: () => void;
  isEditorReady: boolean;
}

const Content = (props: Props) => {
  return (
    <div id="content">
      <h1>#1: Section - Sub-section</h1>
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
