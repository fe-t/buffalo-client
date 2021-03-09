import React from "react";
import Canvas from "./Canvas";
import MaterialList from "./MaterialList";
import Tools from "./Tools";

const Editor = () => {
  return (
    <main className="Editor">
      <Tools />
      <div className="EditorContent">
        <MaterialList />
        <Canvas />
      </div>
    </main>
  );
};

export default Editor;
