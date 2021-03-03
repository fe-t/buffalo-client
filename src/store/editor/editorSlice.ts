import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Input, Select, Datagrid } from "@yy/tofu-ui-react";
import { Material } from "../../types";

interface EditorState {
  materials: Material[];
  cursorComponent?: Material;
}

const initialState: EditorState = {
  cursorComponent: undefined,
  materials: [
    {
      id: "1",
      name: "Dategrid",
      zhName: "数据网格",
      component: Datagrid,
    },
    {
      id: "2",
      name: "Input",
      zhName: "输入框",
      component: Input,
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
      component: Select,
    },
  ],
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setCursorComponent: (state, action: PayloadAction<Material>) => {
      state.cursorComponent = action.payload;
    },
  },
});

export const { setCursorComponent } = editorSlice.actions;
export default editorSlice.reducer;
