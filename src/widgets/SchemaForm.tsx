import { Button } from "antd";
import React, { FC } from "react";
import FormRender, { connectForm, useForm } from "form-render";

interface Props {
  schema?: string;
}

const SchemaForm: FC<Props> = ({ schema }) => {
  const form = useForm();

  const onFinish = () => {};

  return (
    <div className="SchemaForm">
      <FormRender form={form} schema={schema} onFinish={onFinish} />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </div>
  );
};

export default connectForm(SchemaForm);
