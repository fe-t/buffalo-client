import { Tabs } from "@yy/tofu-ui-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../store";
import { selectComponents } from "../../store/editor/selectors";
import MaterialList from "./MaterialList";
import PropsController from "./PropsController";

const Sider = () => {
  const canvasComponents = useSelector(selectComponents);
  // 画布没有组件即先定位到物料Tab
  const showMaterialTabFirst = !canvasComponents?.length;
  const [selectedTab, setSelectTab] = useState(showMaterialTabFirst ? 1 : 0);
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
      <div className="SiderScrollable">
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
