import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Datagrid, Input, Select } from "@yy/tofu-ui-react";
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
          type: "string",
        },
        {
          name: "disabled",
          type: "boolean",
        },
        {
          name: "name",
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

      state.components.push({
        ...material,
        id: nextCusorId,
        materialId: material.id,
      });
    },
  },
});

export const { setCursorComponentId, addComponent } = editorSlice.actions;
export default editorSlice.reducer;
