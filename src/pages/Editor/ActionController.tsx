import { Modal } from "antd";
import React, { useMemo, useState } from "react";
import { BiLoader } from "react-icons/bi";
import { MdAdsClick } from "react-icons/md";
import { useAppSelector } from "../../store";
import { componentMap } from "../../store/editor/registerComponents";
import { selectCursorComponent } from "../../store/editor/selectors";
import { RenderPropsItem } from "../../types";
import { platformActionExecutions, platformActions } from "./action-controls";
import { ActionControlModalForm } from "./ActionControlModalForm";

export const ActionController = () => {
  const [v, setV] = useState(false);
  const close = () => setV(false);
  const show = () => setV(true);

  const component = useAppSelector(selectCursorComponent);
  const componentType = componentMap.get(component?.materialId);

  const actionList = useMemo(() => {
    return Object.entries(componentType?.actionControls || {}).reduce(
      (acc: RenderPropsItem[], [propName, propInfo]) => {
        const item = { ...propInfo, name: propName };
        // 如果 Canvas组件有值，读取 canvas 组件的值
        if (component?.props[propName]) {
          // item.value = component?.props[propName];
        }
        return [...acc, item];
      },
      []
    );
  }, [component?.props, componentType?.actionControls]);

  return (
    <>
      <ActionControlModalForm visible={v} onCancel={close} />

      <div className="ActionPaneFields">
        <div className="ActionItem">
          <div className="ActionItemTrigger" onClick={show}>
            <MdAdsClick />
            <span>点击时</span>
          </div>
          <div className="ActionItemExecution">
            <span>showModal</span>
            <span>弹窗</span>
          </div>
        </div>
        <div className="ActionItem">
          <div className="ActionItemTrigger" onClick={show}>
            <BiLoader />
            <span>加载完成后</span>
          </div>
          <div className="ActionItemExecution">
            <span>callDataSource</span>
            <span>调用数据源方法</span>
          </div>
        </div>
      </div>
    </>
  );
};
