import { Empty, Spacer } from "@yy/tofu-ui-react";
import { Button } from "antd";
import produce from "immer";
import update from "immutability-helper";
import React, { FC, useCallback, useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import toast from "react-hot-toast";
import { MdPostAdd } from "react-icons/md";
import { ItemModalForm } from "./ItemModalForm";
import { TableColumnsItem } from "./TableColumnsItem";

export interface ColumnInfo {
  accessor: string;
  Header: string; // TODO: 展示只支持 string
  formatter: string;
  formatterExpression?: string;
}

interface Props {
  value: any[];
  onChange: (r: any[]) => void;
}
export const TableColumnsEditor: FC<Props> = ({ value, onChange }) => {
  const columns: ColumnInfo[] = useMemo(() => value || [], [value]);

  const addColumn = (values: any) => {
    if (columns.find((c) => c.accessor === values.accessor)) {
      toast.error("已存在相同的类型的属性访问器（accessor), 请勿重复添加");
      return false;
    }
    onChange([...columns, values]);
    return true;
  };

  const editColumn = (column: ColumnInfo) => {
    const nextValue = produce(columns, (draft) => {
      draft.forEach((c, i) => {
        if (c.accessor === column.accessor) {
          draft[i] = column;
        }
      });
    });
    onChange(nextValue);
    return true;
  };

  const deleteItem = (accessor: string) => {
    const next = columns.filter((x) => x.accessor !== accessor);
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
    [columns, onChange]
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
                  editColumn={editColumn}
                />
              ))}
            </div>
          </DndProvider>
        ) : (
          <Empty text="无数据，请按下方按钮新增表格列" />
        )}
        <Spacer y={0.3} />
        <ItemModalForm
          addColumn={addColumn}
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
        />
      </div>
    </>
  );
};
