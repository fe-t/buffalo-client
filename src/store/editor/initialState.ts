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

export type DataType = "string" | "number" | "boolean" | "array" | "object";
export interface DataConfig {
  name: string;
  type: string; // TODO: 默认普通，
  dataType: DataType;
  defaultValue?: any;
  desc?: string;
}

export type Mode = "editor" | "app";
export interface DataSouceState {
  mode: Mode;
  $page: DataConfig[]; // 页面变量
  $app: DataConfig[]; // 全局变量
}

export const dataSourceInitialState: DataSouceState = {
  mode: "editor",
  $page: [
    {
      name: "apple",
      type: "normal",
      dataType: "string",
      defaultValue: "apple",
    },
    {
      name: "counter",
      type: "normal",
      dataType: "number",
      defaultValue: 1,
    },
  ],
  $app: [
    // {
    //   name: "banana",
    //   type: "normal",
    //   dataType: "string",
    //   defaultValue: "banana",
    // },
  ],
};
