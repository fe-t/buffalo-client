import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Datagrid, Input, Select } from "@yy/tofu-ui-react";
import { remove } from "lodash";
import { ElementType } from "react";
import { CanvasComponent, Material } from "../../types";

interface EditorState {
  materials: Material[]; // 物料
  components: CanvasComponent[]; // 画布上的组件
  canvasComponentCounter: number;
  cursorComponentId?: string; // 当前编辑的组件
}

export const componentMap = new Map<string, ElementType>([
  ["1", Datagrid],
  ["2", Input],
  ["3", Select],
]);

const initialState: EditorState = {
  cursorComponentId: "",
  canvasComponentCounter: 0,
  components: [],
  materials: [
    {
      id: "1",
      name: "Dategrid",
      zhName: "数据网格",
    },
    {
      id: "2",
      name: "Input",
      zhName: "输入框",
      props: [
        {
          name: "placeholder",
          zhName: "占位字符",
          type: "string",
        },
        {
          name: "disabled",
          zhName: "禁用",
          type: "boolean",
        },
        {
          name: "name",
          zhName: "字段名称",
          type: "string",
        },
      ],
    },
    {
      id: "3",
      name: "Select",
      zhName: "选择器",
    },
  ],
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setCursorComponentId: (state, action: PayloadAction<string>) => {
      state.cursorComponentId = action.payload;
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

      // 设置新增的组件选中状态
      state.cursorComponentId = nextCusorId;
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
    },
  },
});

export const {
  setCursorComponentId,
  addComponent,
  updateComponentProp,
  deleteCursorComponent,
} = editorSlice.actions;
export default editorSlice.reducer;
