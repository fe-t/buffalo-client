import { ModalForm, ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { Empty, Spacer } from "@yy/tofu-ui-react";
import { Button } from "antd";
import React, { FC } from "react";
import { MdPostAdd } from "react-icons/md";
import { RiDragMoveFill } from "react-icons/ri";
import { FiDelete } from "react-icons/fi";

interface Props {
  value: any[];
  onChange: (r: any[]) => void;
}
export const TableColumnsEditor: FC<Props> = ({ value, onChange }) => {
  const columns = value || [];
  const addColumns = (values: any) => {
    // TODO: 保证不能重复
    onChange([...columns, values]);
  };
  const deleteItem = (accessor: string) => {
    const next = value.filter((x) => x.accessor !== accessor);
    onChange(next);
  };

  return (
    <>
      <div className="TableColumnsEditor">
        {columns.length ? (
          columns.map((x) => (
            <div className="TableColumnsItem" key={x.accessor}>
              <div className="TableColumnsItemLeft">
                <RiDragMoveFill className="TableColumnsItemMoveIcon" />
                <span>
                  {x.Header} - {x.accessor}
                </span>
              </div>
              <div
                className="TableColumnsItemDelete"
                onClick={() => deleteItem(x.accessor)}
              >
                <FiDelete />
              </div>
            </div>
          ))
        ) : (
          <Empty text="无数据，请按下方按钮新增表格列" />
        )}
        <Spacer y={0.3} />

        {/* TODO: 配置样式, 与支持JSX与操作列 */}
        <ModalForm<{
          name: string;
          company: string;
        }>
          title="新增列"
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
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
            onCancel: () => console.log("run"),
          }}
          onFinish={async (values) => {
            // toast.success("提交成功");
            addColumns(values);
            return true;
          }}
        >
          <ProFormText
            width="md"
            name="Header"
            label="列标题"
            placeholder="请输入"
            required
            rules={[{ required: true, message: "请填写" }]}
          />
          <ProFormText
            width="sm"
            name="accessor"
            tooltip="对应接口字段名"
            label="属性访问名称"
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
      </div>
    </>
  );
};
