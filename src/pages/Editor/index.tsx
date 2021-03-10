import React from "react";
import Content from "./Content";
import MaterialList from "./MaterialList";
import Tools from "./Tools";

const Editor = () => {
  return (
    <main className="Editor">
      <Tools />
      <div className="EditorContent">
        <MaterialList />
        <Content />
      </div>
    </main>
  );
};

export default Editor;
