import { ModalForm, ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { Empty, Spacer } from "@yy/tofu-ui-react";
import { Button, Popconfirm } from "antd";
import React, { FC, useCallback, useRef } from "react";
import { MdPostAdd } from "react-icons/md";
import { RiDragMoveFill } from "react-icons/ri";
import { FiDelete } from "react-icons/fi";
import toast from "react-hot-toast";
import { useDrag, useDrop, DndProvider, DropTargetMonitor } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { XYCoord } from "dnd-core";
import update from "immutability-helper";

// 例子： https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_hooks_ts/04-sortable/simple?from-embed=&file=/src/Card.tsx:453-474
interface TableColumnsItemProps {
  index: number;
  column: any;
  onDeleteItem: (accessor: string) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}
interface DragItem {
  index: number;
  id: string;
  type: string;
}
const TableColumnsItem: FC<TableColumnsItemProps> = ({
  index,
  column,
  moveCard,
  onDeleteItem,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id: column.accessor, index: index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div
      className="TableColumnsItem"
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <div className="TableColumnsItemLeft">
        <RiDragMoveFill className="TableColumnsItemMoveIcon" />
        <span>
          {column.Header} - {column.accessor}
        </span>
      </div>
      <Popconfirm
        title={`确认删除「${column.Header}」列吗`}
        onConfirm={() => onDeleteItem(column.accessor)}
      >
        <div className="TableColumnsItemDelete">
          <FiDelete />
        </div>
      </Popconfirm>
    </div>
  );
};

interface Props {
  value: any[];
  onChange: (r: any[]) => void;
}
export const TableColumnsEditor: FC<Props> = ({ value, onChange }) => {
  const columns = value || [];

  const addColumns = (values: any) => {
    if (columns.find((c) => c.accessor)) {
      toast.error("已存在相同的类型的属性访问器（accessor), 请勿重复添加");
      return false;
    }
    onChange([...columns, values]);
    return true;
  };

  const deleteItem = (accessor: string) => {
    const next = value.filter((x) => x.accessor !== accessor);
    onChange(next);
  };

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = columns[dragIndex];
      onChange(
        update(columns, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [columns]
  );

  return (
    <>
      <div className="TableColumnsEditor">
        {columns.length ? (
          <DndProvider backend={HTML5Backend}>
            <div className="TableColumnsItems">
              {columns.map((x, i) => (
                <TableColumnsItem
                  index={i}
                  column={x}
                  key={x.accessor}
                  onDeleteItem={deleteItem}
                  moveCard={moveCard}
                />
              ))}
            </div>
          </DndProvider>
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
            return addColumns(values);
          }}
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
      </div>
    </>
  );
};
