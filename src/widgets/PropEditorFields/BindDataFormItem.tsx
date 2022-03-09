import Editor from "@monaco-editor/react";
import { Alert, Button, Modal, Tag, Typography } from "antd";
import React, { FC, useState } from "react";
import { RiLinksLine } from "react-icons/ri";
import { FlexExpand } from "../styled";

const { Text } = Typography;

interface Props {
  value?: string;
  onChange?: (v: string) => void;
}
export const BindDataFormItem: FC<Props> = ({
  value: controlValue,
  onChange,
}) => {
  const [v, setV] = useState(false);

  const formatted = controlValue
    ? controlValue.replaceAll("{{", "").replaceAll("}}", "")
    : "";
  const [value, setValue] = useState(formatted);

  return (
    <FlexExpand>
      <Modal
        visible={v}
        onCancel={() => setV(false)}
        title="绑定数据"
        width={1200}
        destroyOnClose
        onOk={() => {
          onChange?.(`{{${value}}}`);
          setV(false);
        }}
      >
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
          }}
          theme="vs-dark"
        />
      </Modal>
      {!!value && (
        <Tag
          color="blue"
          style={{
            maxWidth: "130px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </Tag>
      )}
      <Button
        size="small"
        type="text"
        onClick={() => setV(true)}
        style={!!value ? { color: "#1890ff" } : undefined}
      >
        <RiLinksLine />
      </Button>
    </FlexExpand>
  );
};
