import {
  FormItem,
  FormLayout,
  Input,
  Select,
  Cascader,
  DatePicker,
  Submit,
  FormGrid,
  Upload,
  ArrayItems,
  Editable,
  FormButtonGroup,
  NumberPicker,
} from "@formily/antd";
import { createForm } from "@formily/core";
import { createSchemaField, FormProvider } from "@formily/react";
import React, { FC } from "react";
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
}
export const FormilyJSONSchema: FC<Props> = ({ schema, ...props }) => {
  const _schema = JSON.parse(schema);
  return (
    <div {...props}>
      {schema ? (
        <FormProvider form={form}>
          <FormLayout layout="vertical">
            <SchemaField schema={_schema} />
            <FormButtonGroup.FormItem>
              <Submit block size="large">
                提交
              </Submit>
            </FormButtonGroup.FormItem>
          </FormLayout>
        </FormProvider>
      ) : (
        <ComponentPlaceholder text={"先填写JSON Schema"} />
      )}
    </div>
  );
};
