import { Tabs } from "@yy/tofu-ui-react";
import React, { useState } from "react";
import { useAppSelector } from "../../store";

const PropsController = () => {
  const [selectedTab, setSelectTab] = useState(0);
  const cursorComponentId = useAppSelector(
    (state) => state.editor.cursorComponentId
  );
  return (
    <section className="PropsController">
      {cursorComponentId && (
        <div>
          <Tabs value={selectedTab} onChange={setSelectTab}>
            <Tabs.Tab label="属性" />
            <Tabs.Tab label="样式" />
            <Tabs.Tab label="事件" />
          </Tabs>
          <div className="tf-tab-panes">
            <Tabs.TabPane value={selectedTab} index={0}>
              <p>属性</p>
            </Tabs.TabPane>
            <Tabs.TabPane value={selectedTab} index={1}>
              <p>样式</p>
            </Tabs.TabPane>
            <Tabs.TabPane value={selectedTab} index={1}>
              <p>事件</p>
            </Tabs.TabPane>
          </div>
        </div>
      )}
    </section>
  );
};

export default PropsController;
