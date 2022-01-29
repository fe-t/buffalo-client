import { isEmpty } from "lodash";
import React, { useRef, useState } from "react";
import { GoDiffAdded } from "react-icons/go";
import { useAppSelector } from "../../store";
import { selectCursorComponent } from "../../store/editor/selectors";
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
  const modalRef = useRef();

  // 打开事件编辑器弹窗，并设定高亮级联
  const showModal = (activate: (string | undefined)[]) => {
    (modalRef.current as any)?.activate(activate);
    show();
  };

  const component = useAppSelector(selectCursorComponent);
  const boundActions = component.actions;

  return (
    <>
      <ActionControlModalForm visible={v} onClose={close} ref={modalRef} />

      <div className="ActionPaneFields">
        {!isEmpty(boundActions) &&
          Object.entries(boundActions as any).map(
            ([actionName, executionInfo]) => {
              const platformActionInfo =
                platformActions[actionName as PlatformActions];
              return (
                <div className="ActionItem" key={actionName}>
                  <div
                    className="ActionItemTrigger"
                    onClick={() => showModal([actionName, undefined])}
                  >
                    {platformActionInfo.icon}
                    <span>{platformActionInfo.label}</span>
                  </div>
                  {Object.entries(executionInfo as object).map(
                    ([executionName, execution]) => {
                      const executionsInfo =
                        platformActionExecutions[
                          executionName as PlatformActionExecutions
                        ];
                      return (
                        <div
                          className="ActionItemExecution"
                          key={executionName}
                          onClick={() => showModal([actionName, executionName])}
                        >
                          <span>{executionsInfo.type}</span>
                          <span>{executionsInfo.label}</span>
                        </div>
                      );
                    }
                  )}
                </div>
              );
            }
          )}
        <div className="ActionItem">
          <div
            className="ActionItemTrigger"
            onClick={() => showModal([undefined, undefined])}
          >
            <GoDiffAdded />
            <span>新增绑定事件</span>
          </div>
        </div>
      </div>
    </>
  );
};
