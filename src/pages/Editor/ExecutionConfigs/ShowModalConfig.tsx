import { Form, Input, Select, Tag } from "antd";
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
      <Form.Item label="类型" name={`${name}.type`}>
        <Select defaultValue="info">
          <Select.Option value="info">
            <Tag color="default">普通 info</Tag>
          </Select.Option>
          <Select.Option value="success">
            <Tag color="success">成功 success</Tag>
          </Select.Option>
          <Select.Option value="error">
            <Tag color="error">错误 error</Tag>
          </Select.Option>
          <Select.Option value="warn">
            <Tag color="warning">警告 warn</Tag>
          </Select.Option>
          <Select.Option value="confirm">
            <Tag color="warning">确认 confirm</Tag>(带取消按钮)
          </Select.Option>
        </Select>
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
