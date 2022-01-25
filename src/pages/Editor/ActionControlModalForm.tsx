import { Empty } from "@yy/tofu-ui-react";
import { Form, Modal } from "antd";
import classNames from "classnames";
import React, { FC, useState } from "react";
import { SetStateExecutionConfig } from "../../widgets/TableColumnsEditor/SetStateExecutionConfig";
import { platformActionExecutions, platformActions } from "./action-controls";

interface Props {
  visible: boolean;
  onCancel: () => void;
}
export const ActionControlModalForm: FC<Props> = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const save = () => {
    form.submit();
  };

  const [selectedAction, setSelectedAction] = useState<string>();
  const [selectedExecution, setSelectedExecution] = useState<string>();

  // console.log('selectedAction', selectedAction)

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
      <Form
        form={form}
        onFinish={(vals) => {
          debugger;
        }}
      >
        <div className="ActionEditor">
          <div className="ActionEditorTriggerCol">
            <p className="ActionEditorColTitle">1. 触发条件</p>
            {Object.entries(platformActions).map(([actionKey, action]) => {
              return (
                <div
                  className={classNames("ActionEditorTriggerRow", {
                    active: selectedAction === actionKey,
                  })}
                  key={actionKey}
                  onClick={() => setSelectedAction(actionKey)}
                >
                  {action.label}
                </div>
              );
            })}
          </div>
          <div className="ActionEditorExecutionCol">
            <p className="ActionEditorColTitle">2. 执行动作</p>
            {selectedAction ? (
              Object.entries(platformActionExecutions).map(
                ([executionKey, execution]) => {
                  return (
                    <div
                      className={classNames("ActionEditorTriggerRow", {
                        active: selectedExecution === executionKey,
                      })}
                      key={executionKey}
                      onClick={() => setSelectedExecution(executionKey)}
                    >
                      {execution.type} {execution.label}
                    </div>
                  );
                }
              )
            ) : (
              <Empty text="请选择触发条件" style={{ height: "300px" }} />
            )}
          </div>
          <div className="ExecutionConfigCol">
            <p className="ActionEditorColTitle">3. 平台方法</p>
            {selectedExecution ? (
              selectedExecution === "setState" && (
                <SetStateExecutionConfig name="setState" />
              )
            ) : (
              <Empty text="请选择执行动作" style={{ height: "300px" }} />
            )}
          </div>
        </div>
      </Form>
    </Modal>
  );
};
