import { Tabs } from "@yy/tofu-ui-react";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store";
import MaterialList from "./MaterialList";
import PropsController from "./PropsController";

const Sider = () => {
  const [selectedTab, setSelectTab] = useState(0);
  const cursorComponentId = useAppSelector(
    (s) => s.editor.present.cursorComponentId
  );

  useEffect(() => {
    // 如果选择了组件，自动定位到属性 tab
    if (cursorComponentId) {
      setSelectTab(0);
    }
  }, [cursorComponentId]);

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
