import { Empty } from "@yy/tofu-ui-react";
import { ConfigProvider, Form, Input, Select } from "antd";
import React, { FC } from "react";
import { useAppSelector } from "../../store";

interface Props {
  value?: any;
  onChange?: (v: any) => void;
}
export const SetStateExecutionConfig: FC<Props> = ({ value, onChange }) => {
  const $app = useAppSelector((s) => s.dataSource.$app);

  return (
    <div style={{ padding: "0 24px" }}>
      <ConfigProvider renderEmpty={() => <Empty text="暂无变量" />}>
        <Form.Item label="变量名" name="varName" rules={[{ required: true }]}>
          <Select
            options={$app.map((x) => ({
              label: [x.name, x.desc].join("-"),
              value: x.name,
            }))}
          />
        </Form.Item>
        <Form.Item label="变量值" name="varValue" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </ConfigProvider>
    </div>
  );
};
