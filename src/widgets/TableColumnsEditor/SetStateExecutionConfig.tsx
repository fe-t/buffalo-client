import { Form, Input, Select } from "antd";
import React, { FC } from "react";

interface Props {
  value?: any;
  onChange?: (v: any) => void;
}
export const SetStateExecutionConfig: FC<Props> = ({ value, onChange }) => {
  return (
    <div style={{ padding: "0 24px" }}>
      <Form.Item label="变量名" name="varName" rules={[{ required: true }]}>
        <Select></Select>
      </Form.Item>
      <Form.Item label="变量值" name="varValue" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </div>
  );
};
