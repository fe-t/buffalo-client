import { CanvasComponent, Material } from "../../types";

interface EditorState {
  materials: Material[]; // 物料
  components: CanvasComponent[]; // 画布上的组件
  canvasComponentCounter: number;
  cursorComponentId?: string; // 当前编辑的组件
}

export const initialState: EditorState = {
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
