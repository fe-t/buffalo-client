import { Empty } from "@yy/tofu-ui-react";
import { Form, Modal } from "antd";
import classNames from "classnames";
import { setWith } from "lodash";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
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
export const ActionControlModalForm = forwardRef<any, Props>(
  ({ visible, onClose }, ref) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const componentId = useAppSelector(selectCursorComponentId);
    const component = useAppSelector(selectCursorComponent);

    const [selectedAction, setSelectedAction] = useState<PlatformActions>();
    const [selectedExecution, setSelectedExecution] =
      useState<PlatformActionExecutions>();

    // 外部控制高亮级联
    useImperativeHandle(ref, () => ({
      activate: ([action, execution]: [
        PlatformActions,
        PlatformActionExecutions
      ]) => {
        setSelectedAction(action);
        setSelectedExecution(execution);
      },
    }));

    useEffect(() => {
      if (component && visible) {
        const actions = component.actions || {};
        const flatActions: Record<string, any> = {};

        /**
         * 把嵌套对象拍平，以供 form 使用
         * 例如：
         * {
         *  onClick: {
         *    setState: {
         *      name: 'apple',
         *      value: 'blah'
         *    }
         *  }
         * }
         * 转换成：
         * {
         *   'onClick.setState.name: 'apple',
         *   'onClick.setState.name: 'blah'
         * }
         */
        const iterate = (obj: Record<string, any>, path: string) => {
          Object.keys(obj).forEach((key) => {
            const elem = obj[key];
            const nextPath = path ? `${path}.${key}` : `${key}`;
            if (typeof elem === "object" && elem !== null) {
              iterate(elem, nextPath);
            } else {
              // console.log(nextPath);
              flatActions[nextPath] = elem;
            }
          });
        };
        iterate(actions as any, "");
        form.setFieldsValue(flatActions);
      } else {
        form.resetFields();
      }
    }, [component, form, visible]);

    return (
      <Modal
        title="编辑事件"
        visible={visible}
        onOk={form.submit}
        onCancel={onClose}
        okText="保存"
        cancelText="取消"
        width={1200}
        destroyOnClose
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
             *  onClick: {
             *    setState': {
             *      name: "apple"
             *      value: "123"
             *    }
             * }
             */
            const action = {};
            Object.entries(vals).forEach(([path, value]) => {
              setWith(action, path, value, Object);
            });
            dispatch(bindComponentAction({ componentId, action }));
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
  }
);
