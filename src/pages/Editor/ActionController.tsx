import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { GoDiffAdded } from "react-icons/go";
import { useAppSelector } from "../../store";
import { componentMap } from "../../store/editor/registerComponents";
import { selectCursorComponent } from "../../store/editor/selectors";
import { RenderPropsItem } from "../../types";
import {
  PlatformActionExecutions,
  platformActionExecutions,
  PlatformActions,
  platformActions,
} from "./action-controls";
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

  const boundActions = component.actions;

  return (
    <>
      <ActionControlModalForm visible={v} onClose={close} />

      <div className="ActionPaneFields">
        {!isEmpty(boundActions) &&
          Object.entries(boundActions as object).map((entry) => {
            const [actionPath, actionInfo] = entry;
            const [actionName, executionName] = actionPath.split(".");
            const platformActionInfo =
              platformActions[actionName as PlatformActions];
            const executionsInfo =
              platformActionExecutions[
                executionName as PlatformActionExecutions
              ];
            return (
              <div className="ActionItem">
                <div className="ActionItemTrigger" onClick={show}>
                  {platformActionInfo.icon}
                  <span>{platformActionInfo.label}</span>
                </div>
                <div className="ActionItemExecution">
                  <span>{executionsInfo.type}</span>
                  <span>{executionsInfo.label}</span>
                </div>
              </div>
            );
          })}
        <div className="ActionItem">
          <div className="ActionItemTrigger" onClick={show}>
            <GoDiffAdded />
            <span>新增绑定事件</span>
          </div>
        </div>
      </div>
    </>
  );
};
