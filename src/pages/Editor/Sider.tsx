import { Tabs } from "@yy/tofu-ui-react";
import React, { useState } from "react";
import MaterialList from "./MaterialList";
import PropsController from "./PropsController";

const Sider = () => {
  const [selectedTab, setSelectTab] = useState(0);

  return (
    <section className="Sider">
      <Tabs className="SiderTabs" value={selectedTab} onChange={setSelectTab}>
        <Tabs.Tab label="属性" />
        <Tabs.Tab label="物料" />
      </Tabs>
      <div>
        <Tabs.TabPane value={selectedTab} index={0}>
          <PropsController />
        </Tabs.TabPane>
        <Tabs.TabPane value={selectedTab} index={1}>
          <MaterialList />
        </Tabs.TabPane>
      </div>
    </section>
  );
};

export default Sider;
