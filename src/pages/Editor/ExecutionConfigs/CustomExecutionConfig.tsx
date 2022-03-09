import Editor from "@monaco-editor/react";
import { Alert, Form, Typography } from "antd";
import React, { FC, useState } from "react";

const { Text } = Typography;

interface Props {
  value?: string;
  onChange?: (v: string) => void;
}
const InlineExpressionEditor: FC<Props> = ({
  value: controlValue,
  onChange,
}) => {
  const formatted = controlValue
    ? controlValue.replaceAll("{{", "").replaceAll("}}", "")
    : "";
  const [value, setValue] = useState(formatted);

  return (
    <>
      {" "}
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
      <br />
      <Editor
        height="300px"
        defaultLanguage="javascript"
        defaultValue={formatted}
        onChange={(val) => {
          setValue(val as string);
          setTimeout(() => {
            onChange?.(`{{${value}}}`);
          }, 0);
        }}
        theme="vs-dark"
      />
    </>
  );
};

export const CustomExecutionConfig: FC<{ name: string }> = ({ name }) => {
  return (
    <div style={{ padding: "0 24px" }}>
      <Form.Item
        label=""
        name={`${name}.expression`}
        rules={[{ required: true }]}
        required
      >
        <InlineExpressionEditor />
      </Form.Item>
    </div>
  );
};
