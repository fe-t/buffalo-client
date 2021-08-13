import React from "react";
import Canvas from "./Canvas";
import CanvasBreadcrumb from "./CanvasBreadcrumb";

const Content = () => {
  return (
    <div className="Content">
      <CanvasBreadcrumb />
      <Canvas />
    </div>
  );
};

export default Content;
