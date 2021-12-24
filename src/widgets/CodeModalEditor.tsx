import Editor from "@monaco-editor/react";
import { Button, Input, Spacer } from "@yy/tofu-ui-react";
import { Drawer, Space } from "antd";
import React, { FC, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FlexCenter } from "./styled";

interface Props {
  value: string;
  onChange: (v?: string) => void;
  type?: string; // 语言类型
}
export const CodeModalEditor: FC<Props> = ({
  value,
  onChange,
  type = "json",
}) => {
  const [v, setV] = useState(false);
  const close = () => setV(false);
  const show = () => setV(true);

  const formatted = value ? JSON.stringify(JSON.parse(value), null, 2) : "";
  // console.log("formatted", formatted);

  const [selfValue, setSelfValue] = useState<string>(formatted);

  const handleSubmit = () => {
    onChange(selfValue);
    setV(false);
  };

  return (
    <FlexCenter>
      <Drawer
        title="正在编辑..."
        visible={v}
        onClose={close}
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
          <Editor
            height="500px"
            defaultLanguage={type}
            defaultValue={formatted}
            onChange={(val) => {
              setSelfValue(val as string);
            }}
            theme="vs-dark"
          />
        </div>
      </Drawer>
      <Input value={value} readOnly />
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
        <AiFillEdit />
      </Button>
    </FlexCenter>
  );
};
