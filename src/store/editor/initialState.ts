import { VersionInfo } from "../../models/GetVersionConfigResult";
import { CanvasComponent, Material } from "../../types";

interface EditorState {
  materials: Material[]; // 物料
  components: CanvasComponent[]; // 画布上的组件
  canvasComponentCounter: number;
  cursorComponentId?: string; // 当前编辑的组件
  appConfig: object; // 暂时
  appName: string; //
  versionInfo: VersionInfo;
}

export const editorInitialState: EditorState = {
  cursorComponentId: "",
  canvasComponentCounter: 0,
  components: [],
  materials: [
    {
      id: "4",
      name: "page",
      zhName: "页面",
      type: "layout",
    },
    {
      id: "1",
      name: "Dategrid",
      zhName: "数据网格",
      type: "display",
    },
    {
      id: "2",
      name: "Input",
      zhName: "输入框",
      type: "form",
    },
    {
      id: "3",
      name: "Select",
      zhName: "选择器",
      type: "form",
    },
    {
      id: "5",
      name: "SchemaForm",
      zhName: "表单",
      type: "form",
    },
    {
      id: "6",
      name: "DataList",
      zhName: "查询表格",
      type: "form",
    },
    {
      id: "7",
      name: "Button",
      zhName: "按钮",
      type: "form",
    },
  ],
  appConfig: {},
  appName: "",
  versionInfo: {},
};

export type Mode = "editor" | "app";
export interface DataSouceState {
  mode: Mode;
  $page: any; // 页面变量
  $app: any; // 全局变量
}

export const dataSourceInitialState: DataSouceState = {
  mode: "editor",
  $page: undefined,
  $app: undefined,
};
