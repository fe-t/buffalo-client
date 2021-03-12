import React from "react";
import Content from "./Content";
import Sider from "./Sider";
import Tools from "./Tools";

const Editor = () => {
  return (
    <main className="Editor">
      <Tools />
      <div className="EditorContent">
        <Sider />
        <Content />
      </div>
    </main>
  );
};

export default Editor;
