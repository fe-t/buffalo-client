import React from "react";
import Collapse from "../../widgets/Collapse";
import ComponentTree from "./ComponentTree";
import MaterialList from "./MaterialList";
import { GrTree } from "react-icons/gr";
import { Space } from "antd";

const Sider = () => {
  return (
    <section className="Sider" style={{ height: "calc(100vh - 100px)" }}>
      <div className="SiderScrollable" style={{ flexGrow: 1 }}>
        <MaterialList />
      </div>
      <Collapse.Group style={{ flexShrink: 0 }}>
        <Collapse
          title={
            <Space>
              <GrTree />
              大纲树
            </Space>
          }
          defaultOpen
        >
          <ComponentTree />
        </Collapse>
      </Collapse.Group>
    </section>
  );
};

export default Sider;
