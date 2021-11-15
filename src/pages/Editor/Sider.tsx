import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../store";
import { selectComponents } from "../../store/editor/selectors";
import MaterialList from "./MaterialList";

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
      <div className="SiderScrollable">
        <MaterialList />
      </div>
      {/* <ComponentTree /> */}
    </section>
  );
};

export default Sider;
