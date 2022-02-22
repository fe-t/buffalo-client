import React from "react";
import ComponentTree from "./ComponentTree";
import MaterialList from "./MaterialList";

const Sider = () => {
  return (
    <section className="Sider">
      <div className="SiderScrollable">
        <MaterialList />
      </div>
      <ComponentTree />
    </section>
  );
};

export default Sider;
