import {
  ModalForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { FC, useEffect, useRef, useState } from "react";
import { ColumnInfo } from "./TableColumnsEditor";

export const ItemModalForm: FC<{
  editColumn?: (c: ColumnInfo) => boolean;
  addColumn?: (c: ColumnInfo) => boolean;
  trigger: JSX.Element;
  column?: ColumnInfo;
}> = ({ addColumn, editColumn, trigger, column }) => {
  const [v, setV] = useState(false);
  const formRef = useRef<ProFormInstance<ColumnInfo>>();

  useEffect(() => {
    if (typeof column !== "undefined") {
      formRef.current?.setFieldsValue({
        accessor: column.accessor,
        Header: column.Header,
        formatter: column.formatter,
      });
    }
  }, [column, v]);

  return (
    <ModalForm<ColumnInfo>
      formRef={formRef}
      title={column ? "编辑列" : "新增列"}
      autoFocusFirstInput
      visible={v}
      onVisibleChange={setV}
      trigger={trigger}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log("run"),
        okText: column ? "保存修改" : "提交",
      }}
      onFinish={async (values) =>
        column ? editColumn?.(values) : addColumn?.(values)
      }
    >
      <ProFormText
        width="sm"
        name="accessor"
        tooltip="对应接口字段名"
        label="属性访问名称 (accessor)"
        placeholder="请输入"
        disabled={!!column}
        required
        rules={[{ required: true, message: "请填写" }]}
      />
      <ProFormText
        width="md"
        name="Header"
        label="列标题 (Header)"
        placeholder="请输入"
        required
        rules={[{ required: true, message: "请填写" }]}
      />
      <ProFormSelect
        width="md"
        name="formatter"
        tooltip="转换原始数据到格式化字符串的函数"
        label="格式化函数"
        placeholder="请输入"
        request={async () => {
          return [
            {
              value: "dateTimeYYYYMMDDHHmmSS",
              label: "日期时间YYYY-MM-DD HH:mm:SS",
            },
            {
              value: "money",
              label: "货币(¥0,0.00)",
            },
            {
              value: "0,0",
              label: "数目(0,0)",
            },
          ];
        }}
      />
    </ModalForm>
  );
};
