import {
  ArrayItems,
  Cascader,
  DatePicker,
  Editable,
  FormButtonGroup,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  NumberPicker,
  Select,
  Upload,
} from "@formily/antd";
import { createForm } from "@formily/core";
import { createSchemaField, FormProvider } from "@formily/react";
import { Button } from "antd";
import React, { FC } from "react";
import { ButtonInfo } from "../../../widgets/PropEditorFields/ButtonGroupEditor";
import { ComponentPlaceholder } from "./ComponentPlaceholder";

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
  },
});

interface Props {
  style: any;
  schema: any;
  buttonGroup: ButtonInfo[];
  labelCol: number;
  wrapperCol: number;
  layout: "vertical" | "horizontal" | "inline";
}
export const FormilyJSONSchema: FC<Props> = ({
  schema,
  buttonGroup,
  layout = "horizontal",
  labelCol,
  wrapperCol,
  ...props
}) => {
  const _schema = JSON.parse(schema);
  return (
    <div {...props}>
      {schema ? (
        <FormProvider form={form}>
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
        </FormProvider>
      ) : (
        <ComponentPlaceholder text={"先填写JSON Schema"} />
      )}
    </div>
  );
};
