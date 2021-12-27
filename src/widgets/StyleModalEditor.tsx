import Editor from "@monaco-editor/react";
import { Button } from "@yy/tofu-ui-react";
import { Drawer, Space } from "antd";
import React, { FC, useEffect, useReducer, useState } from "react";

const toCamcel = (val: string) => {
  return val.replaceAll(/-([a-z])/g, (...args) => {
    return args[1].toUpperCase();
  });
};

export const cssStringToObject = (cssText: string) => {
  var regex = /([\w-]*)\s*:\s*([^;]*)/g;
  var match,
    properties = {};
  while ((match = regex.exec(cssText))) {
    (properties as any)[match[1]] = match[2].trim();
  }
  // 转成驼峰
  properties = Object.entries(properties).reduce((acc, cur) => {
    const [key, value] = cur;
    const camelCaseKey = toCamcel(key);
    return {
      ...acc,
      [camelCaseKey]: value,
    };
  }, []);
  return properties;
};
export const objectToCssString = (obj: object) => {
  let string = Object.entries(obj)
    .map(([k, v]) => `${k}: ${v}`)
    .join(";\n\t");
  string = string.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
  return string ? `${string};` : "";
};

const trimExtra = (val: string) => {
  const found = val.match(/^self\s*{([\S\s]*)}/);
  return (found as any)[1];
};

interface Props {
  value: object;
  onChange: (v: Record<string, string>) => void;
}
export const StyleModalEditor: FC<Props> = (props) => {
  const { value, onChange } = props;

  const [v, setV] = useState(false);
  const close = () => setV(false);
  const show = () => setV(true);

  const [selfValue, dispatchSelfValue] = useReducer(
    (_state: any, action: { type: string; payload?: string }) => {
      switch (action.type) {
        case "init":
          return `self {
   	${objectToCssString(value || {})}
}`;
        case "update":
          return action.payload;
        default:
          throw new Error();
      }
    },
    ""
  );

  useEffect(() => {
    dispatchSelfValue({ type: "init" });
  }, [v]);

  const handleSubmit = () => {
    const result = cssStringToObject(trimExtra(selfValue as string));
    onChange(result);
    close();
  };

  return (
    <>
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
            defaultLanguage="css"
            defaultValue={selfValue}
            onChange={(val) => {
              dispatchSelfValue({ type: "update", payload: val as string });
            }}
            theme="vs-dark"
          />
        </div>
      </Drawer>
      <Button type="weak" style={{ width: "100%" }} onClick={show}>
        样式代码编辑
      </Button>
    </>
  );
};
