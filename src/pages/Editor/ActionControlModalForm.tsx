import { Empty } from "@yy/tofu-ui-react";
import { Form, Modal } from "antd";
import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  bindComponentAction,
  selectCursorComponent,
  selectCursorComponentId,
} from "../../store/editor/editorSlice";
import {
  PlatformActionExecutions,
  platformActionExecutions,
  PlatformActions,
  platformActions,
} from "./action-controls";
import { ExecutionConfigEditor } from "./ExecutionConfigEditor";

interface Props {
  visible: boolean;
  onClose: () => void;
}
export const ActionControlModalForm: FC<Props> = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const componentId = useAppSelector(selectCursorComponentId);
  const component = useAppSelector(selectCursorComponent);

  const [selectedAction, setSelectedAction] = useState<PlatformActions>();
  const [selectedExecution, setSelectedExecution] =
    useState<PlatformActionExecutions>();

  useEffect(() => {
    if (component) {
      const actions = component.actions;
      const flatActions = Object.values(actions as any).reduce((acc, cur) => {
        return { ...(acc as any), ...(cur as any) };
      }, {});
      form.setFieldsValue(flatActions);
    }
  }, [component, form]);

  return (
    <Modal
      title="添加事件"
      visible={visible}
      onOk={form.submit}
      onCancel={onClose}
      okText="保存"
      cancelText="取消"
      width={1200}
    >
      <Form
        form={form}
        onFinish={(vals) => {
          // 转换成actionObject,
          /**
           * 例子:
           * onClick.setState.name(pin):"apple"
           * onClick.setState.value(pin):"123" 合并成:
           *
           * {
           *  'onClick.setState': {
           *    'onClick.setState.name':"apple"
           *    'onClick.setState.value':"123"
           *  }
           * }
           */
          const actionKey = Object.entries(vals).map(
            ([name]) => `${name.split(".")[0]}.${name.split(".")[1]}`
          )[0];

          dispatch(
            bindComponentAction({
              componentId,
              action: { [actionKey]: vals },
            })
          );
          onClose();
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
                  onClick={() => {
                    setSelectedAction(actionKey as PlatformActions);
                  }}
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
                      onClick={() =>
                        setSelectedExecution(
                          executionKey as PlatformActionExecutions
                        )
                      }
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
              <ExecutionConfigEditor
                action={selectedAction}
                execution={selectedExecution}
              />
            ) : (
              <Empty text="请选择执行动作" style={{ height: "300px" }} />
            )}
          </div>
        </div>
      </Form>
    </Modal>
  );
};
