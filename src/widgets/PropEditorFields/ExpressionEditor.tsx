import Editor from "@monaco-editor/react";
import { Button, Input, Spacer } from "@yy/tofu-ui-react";
import { Alert, Drawer, Space, Typography } from "antd";
import React, { FC, useState } from "react";
import { VscJson } from "react-icons/vsc";
import { FlexCenter } from "../styled";

interface Props {
  value: string;
  onChange: (v?: string) => void;
}

const { Text } = Typography;

export const ExpressionEditor: FC<Props> = ({ value, onChange }) => {
  const [v, setV] = useState(false);
  const close = () => setV(false);
  const show = () => setV(true);

  // TODO: 更好的format方法
  const formatted = value
    ? value.replaceAll("{{", "").replaceAll("}}", "")
    : "";
  const [selfValue, setSelfValue] = useState<string>(formatted);

  const handleSubmit = () => {
    onChange(`{{${selfValue}}}`);
    setV(false);
  };

  return (
    <FlexCenter>
      <Drawer
        title="正在编辑..."
        visible={v}
        onClose={close}
        mask={false}
        placement="right"
        size="large"
        destroyOnClose
        extra={
          <Space>
            <Button type="cancel" onClick={close}>
              取消
            </Button>
            <Button type="emphasis" onClick={handleSubmit}>
              保存
            </Button>
          </Space>
        }
      >
        <div className="CodeContainer">
          <div>
            <Alert showIcon type="warning" message="编写 JavaScript 代码" />
            <br />
            <ul>
              <li>
                可使用变量: 参数 <Text code>arguments</Text>,{" "}
                <Text code>process</Text>, <Text code>axios</Text>,{" "}
                <Text code>lodash</Text>, <Text code>store</Text>
              </li>
              <li>
                可以使用 <Text code>await</Text>, 本身是一个
                <Text code>AsyncFunciton</Text>
              </li>
            </ul>
          </div>
          <Spacer y={1} />
          <Editor
            height="500px"
            defaultLanguage="javascript"
            defaultValue={selfValue}
            onChange={(val) => {
              setSelfValue(val as string);
            }}
            theme="vs-dark"
          />
        </div>
      </Drawer>
      <Input value={selfValue} readOnly placeholder="表达式" />
      <Spacer x={0.5} />
      <Button
        style={{
          height: 36,
          width: 40,
          minWidth: "unset",
          fontSize: "14px",
          color: "#fff",
        }}
        size="s"
        type="emphasis"
        onClick={show}
      >
        <VscJson />
      </Button>
    </FlexCenter>
  );
};
