import {
  ArrayItems,
  Cascader,
  DatePicker,
  Editable,
  Form,
  FormButtonGroup,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  NumberPicker,
  Select,
  Upload,
  ArrayCards,
} from "@formily/antd";
import { createForm } from "@formily/core";
import { createSchemaField, FormProvider } from "@formily/react";
import { Button } from "antd";
import React, { FC } from "react";
import { ComponentPlaceholder } from "./ComponentPlaceholder";

export interface ButtonInfo {
  title: string;
  type: "submit" | "reset" | "button";
  layoutType: "primary" | "default";
  actions: Record<any, any>;
}

const form = createForm({
  validateFirst: true,
});

const SchemaField = createSchemaField({
  components: {
    NumberPicker,
    FormItem,
    FormGrid,
    FormLayout,
    Input,
    DatePicker,
    Cascader,
    Select,
    Upload,
    ArrayItems,
    Editable,
    ArrayCards,
  },
});

interface Props {
  style: any;
  schema: any;
  buttonGroup: ButtonInfo[];
  labelCol: number;
  wrapperCol: number;
  layout: "vertical" | "horizontal" | "inline";
  onAutoSubmit?: (values: any) => void;
  onAutoSubmitFailed?: (feedbacks: any[]) => void;
}
export const FormilyJSONSchema: FC<Props> = ({
  schema,
  buttonGroup,
  layout = "horizontal",
  labelCol,
  wrapperCol,
  onAutoSubmit,
  onAutoSubmitFailed,
  ...props
}) => {
  const _schema = JSON.parse(schema);
  return (
    <div {...props}>
      {schema ? (
        <FormProvider form={form}>
          <Form
            onAutoSubmit={onAutoSubmit}
            onAutoSubmitFailed={onAutoSubmitFailed}
          >
            <FormLayout
              layout={layout}
              labelCol={labelCol}
              wrapperCol={wrapperCol}
            >
              <SchemaField schema={_schema} />
              <FormButtonGroup.FormItem>
                {buttonGroup?.map((x, i) => {
                  return (
                    <Button key={i} type={x.layoutType} htmlType={x.type}>
                      {x.title}
                    </Button>
                  );
                })}
                {/* <Submit
                block
                size="large"
                onSubmit={(vals) => {
                  console.log(vals);
                }}
              >
                提交
              </Submit> */}
              </FormButtonGroup.FormItem>
            </FormLayout>
          </Form>
        </FormProvider>
      ) : (
        <ComponentPlaceholder text={"先填写JSON Schema"} />
      )}
    </div>
  );
};
