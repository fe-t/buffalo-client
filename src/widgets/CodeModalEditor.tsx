import Editor from "@monaco-editor/react";
import { Button, Input, Spacer } from "@yy/tofu-ui-react";
import { Drawer } from "antd";
import React, { FC, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FlexCenter } from "./styled";

interface Props {
  value: string;
  onChange: (v?: string) => void;
}
export const CodeModalEditor: FC<Props> = ({ value, onChange }) => {
  const [v, setV] = useState(true);
  const close = () => setV(false);
  const show = () => setV(true);

  const formatted = value ? JSON.stringify(JSON.parse(value), null, 2) : "";
  console.log("formatted", formatted);

  return (
    <FlexCenter>
      <Drawer
        title="正在编辑..."
        visible={v}
        onClose={close}
        placement="right"
        size="large"
      >
        <div className="CodeContainer">
          <Editor
            height="500px"
            defaultLanguage="json"
            defaultValue={formatted}
            onChange={(val) => {
              console.log("val", val);
              // onChange(val);
            }}
            // theme="vs-dark"
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
        onClick={() => setV(true)}
      >
        <AiFillEdit />
      </Button>
    </FlexCenter>
  );
};
