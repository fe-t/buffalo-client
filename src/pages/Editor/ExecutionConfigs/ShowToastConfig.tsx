import { Form, Input, InputNumber, Select, Tag } from "antd";
import React, { FC } from "react";

export const ShowToastConfig: FC<{ name: string }> = ({ name }) => {
  return (
    <div style={{ padding: "0 24px" }}>
      <Form.Item
        label="消息内容"
        name={`${name}.text`}
        rules={[{ required: true }]}
        required
      >
        <Input />
      </Form.Item>
      <Form.Item label="消息类型" name={`${name}.type`}>
        <Select defaultValue="normal">
          <Select.Option value="normal">
            <Tag color="default">普通</Tag>
          </Select.Option>
          <Select.Option value="error">
            <Tag color="error">错误</Tag>
          </Select.Option>
          <Select.Option value="success">
            <Tag color="success">成功</Tag>
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="展示时长" name={`${name}.duration`}>
        <InputNumber defaultValue={3000} /> ms
      </Form.Item>
    </div>
  );
};
