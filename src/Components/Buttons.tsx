import React from "react";

interface Props {
  onSubmit: (event: any) => void;
  handleDocs: () => void;
  isEditorReady: boolean;
}

const Buttons = (props: Props) => {
  return (
    <div id="buttons">
      <button
        id="submit"
        onClick={props.onSubmit}
        disabled={!props.isEditorReady}
      >
        Submit
      </button>
      <button id="docs" onClick={props.handleDocs}>
        Docs
      </button>
    </div>
  );
};

export default Buttons;
