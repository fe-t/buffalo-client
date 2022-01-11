import { Modal } from "antd";
import React, { FC } from "react";
import { platformActionExecutions, platformActions } from "./action-controls";

interface Props {
  visible: boolean;
  onCancel: () => void;
}
export const ActionControlModalForm: FC<Props> = ({ visible, onCancel }) => {
  const save = () => {};

  return (
    <Modal
      title="添加事件"
      visible={visible}
      onOk={save}
      onCancel={onCancel}
      okText="保存"
      cancelText="取消"
      width={1200}
    >
      <div className="ActionEditor">
        <div className="ActionEditorTriggerCol">
          {Object.entries(platformActions).map(([actionKey, action]) => {
            return (
              <div className="ActionEditorTriggerRow" key={actionKey}>
                {action.label}
              </div>
            );
          })}
        </div>
        <div className="ActionEditorExecutionCol">
          {Object.entries(platformActionExecutions).map(
            ([actionKey, action]) => {
              return (
                <div className="ActionEditorTriggerRow" key={actionKey}>
                  {action.label}
                </div>
              );
            }
          )}
        </div>
      </div>
    </Modal>
  );
};
