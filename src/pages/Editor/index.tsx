import React from "react";
import Content from "./Content";
import Sider from "./Sider";
import Tools from "./Tools";
import useRequest from "@ahooksjs/use-request";
import axios from "axios";

const Editor = () => {
  const { data } = useRequest(() => axios.get("/api/biz/allList"));

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
