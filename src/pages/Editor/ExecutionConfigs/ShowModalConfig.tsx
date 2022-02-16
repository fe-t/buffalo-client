import { Form, Input } from "antd";
import React, { FC } from "react";

interface Props {
  name: string;
}
export const ShowModalConfig: FC<Props> = ({ name }) => {
  return (
    <div style={{ padding: "0 24px" }}>
      <Form.Item
        label="标题"
        name={`${name}.title`}
        rules={[{ required: true }]}
      >
        <Input placeholder="请填写" />
      </Form.Item>
      <Form.Item
        label="内容"
        name={`${name}.content`}
        rules={[{ required: true }]}
      >
        <Input placeholder="请填写" />
      </Form.Item>
    </div>
  );
};
