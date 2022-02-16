import ProForm from "@ant-design/pro-form";
import { Typography } from "antd";
import React, { FC } from "react";

const { Paragraph } = Typography;

const Component: FC<{ value?: any }> = ({ value }) => {
  return (
    <Paragraph copyable={{ text: value }}>
      <b>{value}</b>
    </Paragraph>
  );
};

export const ProFormCopitableText = (props: any) => {
  return (
    <ProForm.Item {...props}>
      <Component />
    </ProForm.Item>
  );
};
