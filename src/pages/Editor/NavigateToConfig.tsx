import { Form, Input } from "antd";
import React, { FC } from "react";

interface Props {
  name: string;
}
export const NavigateToConfig: FC<Props> = ({ name }) => {
  return (
    <div style={{ padding: "0 24px" }}>
      <Form.Item
        label="链接"
        name={`${name}.url`}
        rules={[{ required: true }]}
        required
      >
        <Input />
      </Form.Item>
    </div>
  );
};
