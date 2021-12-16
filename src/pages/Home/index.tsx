import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div style={{ padding: 50 }}>
      <Link to={"/editor?versionId=1"}>去调试页面</Link>
    </div>
  );
};
