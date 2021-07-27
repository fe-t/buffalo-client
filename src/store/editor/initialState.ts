import { CanvasComponent, Material } from "../../types";

interface EditorState {
  materials: {
    blocks: Material[];
    widgets: Material[];
  }; // 物料
  components: CanvasComponent[]; // 画布上的组件
  canvasComponentCounter: number;
  cursorComponentId?: string; // 当前编辑的组件
}

export const initialState: EditorState = {
  cursorComponentId: "",
  canvasComponentCounter: 0,
  components: [],
  materials: {
    blocks: [
      {
        id: "4",
        name: "page",
        zhName: "页面",
      },
    ],
    widgets: [
      {
        id: "1",
        name: "Dategrid",
        zhName: "数据网格",
      },
      {
        id: "2",
        name: "Input",
        zhName: "输入框",
      },
      {
        id: "3",
        name: "Select",
        zhName: "选择器",
      },
    ],
  },
};
