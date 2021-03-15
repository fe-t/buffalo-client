import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Datagrid, Input, Select } from "@yy/tofu-ui-react";
import { remove } from "lodash";
import { ElementType, FC } from "react";
import {
  applyPropertyControls,
  ControlType,
} from "../../pages/Editor/property-controls";
import { Material } from "../../types";
import { initialState } from "./initialState";
export * from "./selectors";

const Page: FC<{ children: string }> = ({ children }) => {
  return (
    <div className="Page" style={{ padding: "20px", border: "1px solid #999" }}>
      <p>page: </p>
      {children}
    </div>
  );
};
applyPropertyControls(Page, {
  children: {
    type: ControlType.String,
    required: true,
    placeholder: "请输入内容",
  },
});

export type CanvasElementType = ElementType & {
  propertyControls?: object;
};

export const componentMap = new Map<string, CanvasElementType>([
  ["1", Datagrid],
  ["2", Input],
  ["3", Select],
  ["4", Page],
]);

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setCursorComponentId: (state, action: PayloadAction<string>) => {
      state.cursorComponentId = action.payload;
    },
    cursorComponentBlur: (state) => {
      state.cursorComponentId = "";
    },
    addComponent: (state, action: PayloadAction<Material>) => {
      const material = action.payload;
      const nextCusorId = `${++state.canvasComponentCounter}`;

      // 把组件加入画布
      state.components.push({
        ...material,
        id: nextCusorId,
        materialId: material.id,
      });

      // // 设置新增的组件选中状态
      // state.cursorComponentId = nextCusorId;
    },
    updateComponentProp: (
      state,
      action: PayloadAction<{
        componentId: string;
        propIndex: number;
        propValue: any;
      }>
    ) => {
      const target = state.components.find(
        (c) => c.id === action.payload.componentId
      );
      const targetProp = target?.props?.[action.payload.propIndex];
      if (targetProp) {
        targetProp.value = action.payload.propValue;
      }
    },
    deleteCursorComponent: (state) => {
      remove(state.components, (c) => c.id === state.cursorComponentId);
      // 和清除游标
      state.cursorComponentId = "";
    },
  },
});

export const {
  setCursorComponentId,
  cursorComponentBlur,
  addComponent,
  updateComponentProp,
  deleteCursorComponent,
} = editorSlice.actions;

export default editorSlice.reducer;
