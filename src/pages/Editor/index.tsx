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
        <section className="PropsController"></section>
      </div>
    </main>
  );
};

export default Editor;
