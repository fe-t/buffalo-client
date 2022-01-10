import { ModalForm, ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { Button } from "antd";
import { FC } from "react";
import { MdPostAdd } from "react-icons/md";

interface ColumnInfo {
  name: string;
  company: string;
}
export const ItemModalForm: FC<{ addColumns?: (vals: ColumnInfo) => void }> = ({
  addColumns,
}) => {
  return (
    <ModalForm<ColumnInfo>
      title="新增列"
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log("run"),
      }}
      onFinish={async (values) => {
        return addColumns?.(values);
      }}
      trigger={
        <Button
          className="TableColumnsEditorAddButton"
          icon={<MdPostAdd />}
          block
          type="dashed"
        >
          添加列
        </Button>
      }
    >
      <ProFormText
        width="sm"
        name="accessor"
        tooltip="对应接口字段名"
        label="属性访问名称 (accessor)"
        placeholder="请输入"
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
              label: "¥0,0.00",
            },
            {
              value: "0,0",
              label: "千分符",
            },
          ];
        }}
      />
    </ModalForm>
  );
};
