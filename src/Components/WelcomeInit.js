import React from "react";

const WelcomeInit = (props) => {
  return (
    <div id="welcome">
      <h1>Welcome Rustician</h1>
      <p>
        Before beginning the <s>tedious</s> exciting journey learning Rust, you
        will need to setup the environment by pointing this application to the{" "}
        <em>Lesson Files</em>...
      </p>
      <button onClick={props.handleInitEnv}>Locate Lesson Files</button>
    </div>
  );
};

export default WelcomeInit;
