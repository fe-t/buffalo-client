import { Form, Input, Switch } from "antd";
import React, { FC } from "react";

const urlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

interface Props {
  name: string;
}
export const NavigateToConfig: FC<Props> = ({ name }) => {
  return (
    <div style={{ padding: "0 24px" }}>
      <Form.Item
        label="链接"
        name={`${name}.url`}
        rules={[
          { required: true },
          {
            pattern: urlRegex,
            message: "URL格式不正确，请检查",
          },
        ]}
      >
        <Input placeholder="请填写" />
      </Form.Item>
      <Form.Item
        label="新窗口打开"
        name={`${name}.newTab`}
        valuePropName="checked"
      >
        <Switch defaultChecked size="small" />
      </Form.Item>
    </div>
  );
};
