import Editor from "@monaco-editor/react";
import { Alert, Button, Card, Modal, Typography } from "antd";
import React, { useState } from "react";
import { RiLinksLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../store";
import { bindComponentConditionRender } from "../store/editor/editorSlice";
import {
  selectCursorComponent,
  selectCursorComponentId,
} from "../store/editor/selectors";

const { Text } = Typography;

export const BindData = () => {
  const [v, setV] = useState(false);
  const dispatch = useAppDispatch();
  const component = useAppSelector(selectCursorComponent);
  const componentId = useAppSelector(selectCursorComponentId);

  const [value, setValue] = useState("");

  return (
    <>
      <Modal
        visible={v}
        onCancel={() => setV(false)}
        title="绑定数据"
        width={1200}
        destroyOnClose
        onOk={() => {
          dispatch(
            bindComponentConditionRender({ componentId, expression: value })
          );
          setV(false);
        }}
      >
        <Card>
          <Alert
            showIcon
            type="warning"
            message="输入 JavaScript 表达式, 可引用 $app, $page 等变量"
          />
          <br />
          <ul>
            <li>
              使用全局变量
              <Text code copyable={{ text: "$app.apple" }}>
                $app.apple
              </Text>
            </li>
            <li>
              使用当前页变量
              <Text code copyable={{ text: "$page.apple" }}>
                $page.apple
              </Text>
            </li>
          </ul>
        </Card>
        <br />
        <Editor
          height="500px"
          defaultLanguage="javascript"
          defaultValue={value}
          onChange={(val) => {
            setValue(val as string);
          }}
          theme="vs-dark"
        />
      </Modal>
      <Button
        type="text"
        onClick={() => setV(true)}
        style={
          component?.general?.conditionRender ? { color: "#1890ff" } : undefined
        }
      >
        <RiLinksLine />
      </Button>
    </>
  );
};
