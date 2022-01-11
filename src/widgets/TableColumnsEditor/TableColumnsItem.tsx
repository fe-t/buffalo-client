import { Button, Descriptions, Popconfirm, Popover, Tooltip } from "antd";
import { FC, useRef } from "react";
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd";
import { RiEdit2Fill } from "react-icons/ri";
import { BiInfoCircle } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { ItemModalForm } from "./ItemModalForm";
import { ColumnInfo } from "./TableColumnsEditor";

// 例子： https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_hooks_ts/04-sortable/simple?from-embed=&file=/src/Card.tsx:453-474
interface TableColumnsItemProps {
  index: number;
  column: any;
  onDeleteItem: (accessor: string) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  editColumn: (c: ColumnInfo) => boolean;
}
interface DragItem {
  index: number;
  id: string;
  type: string;
}
export const TableColumnsItem: FC<TableColumnsItemProps> = ({
  index,
  column,
  moveCard,
  onDeleteItem,
  editColumn,
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
        <Popover
          content={
            <div style={{ width: 300 }}>
              <Descriptions
                title="列信息"
                size="small"
                column={{ md: 1, sm: 1, xs: 1 }}
              >
                <Descriptions.Item label="属性访问名称">
                  {column.accessor}
                </Descriptions.Item>
                <Descriptions.Item label="列标题">
                  {column.Header}
                </Descriptions.Item>
              </Descriptions>
            </div>
          }
          placement="left"
        >
          <BiInfoCircle
            className="TableColumnsItemMoveIcon"
            style={{ cursor: "pointer" }}
          />
        </Popover>
        <ItemModalForm
          editColumn={editColumn}
          column={column}
          trigger={
            <Tooltip title="编辑列">
              <Button
                type="link"
                icon={<RiEdit2Fill style={{ color: "#666666" }} />}
              />
            </Tooltip>
          }
        />
        <span className="TableColumnsItemText">
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
