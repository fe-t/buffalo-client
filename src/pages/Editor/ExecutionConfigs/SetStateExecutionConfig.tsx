import { Empty } from "@yy/tofu-ui-react";
import { ConfigProvider, Form, Input, Select } from "antd";
import React, { FC } from "react";
import { useAppSelector } from "../../../store";

interface Props {
  name: string;
}
export const SetStateExecutionConfig: FC<Props> = ({ name }) => {
  const $app = useAppSelector((s) => s.dataSource.$app);

  return (
    <div style={{ padding: "0 24px" }}>
      <ConfigProvider renderEmpty={() => <Empty text="暂无变量" />}>
        <Form.Item
          label="变量名"
          name={`${name}.name`}
          rules={[{ required: true }]}
        >
          <Select
            options={$app.map((x) => ({
              label: [x.name, x.desc].filter(Boolean).join("-"),
              value: x.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="变量值"
          name={`${name}.value`}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </ConfigProvider>
    </div>
  );
};
