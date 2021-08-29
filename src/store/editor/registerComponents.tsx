/**
 * 注册组件，让画布和属性编辑器能识别到
 */
import React, { FC } from "react";
import {
  applyPropertyControls,
  ControlType,
} from "../../pages/Editor/property-controls";
import { CanvasElementType } from "../../types";
import { Datagrid, Input, Select } from "@yy/tofu-ui-react";
import SchemaForm from "../../widgets/SchemaForm";

/** 自定义的物料 */
const Page: FC<{
  children: string;
  name: string;
  type: string;
  backgroundColor: string;
  height: number;
}> = ({ children, name, type, backgroundColor, height = 100 }) => {
  return (
    <div
      className="Page"
      style={{
        padding: "20px",
        border: "1px solid #999",
        backgroundColor,
        height,
      }}
    >
      <p>page: {name}</p>
      <p>type: {type}</p>
      <div>children: {children}</div>
    </div>
  );
};

/** 注册物料编辑属性 */
applyPropertyControls(Page, {
  children: {
    type: ControlType.ComponentInstance,
    required: true, // TODO: impl required
    placeholder: "选择子组件",
    defaultValue: undefined,
    label: "子组件",
    desc: "Lorem ipsum sei weigs",
  },
  name: {
    type: ControlType.String,
    required: true,
    defaultValue: "Home Page",
    label: "字段名称",
  },
  type: {
    type: ControlType.Enum,
    placeholder: "选择类型",
    label: "页面类型",
    defaultValue: "large",
    options: [
      { label: "大的", value: "large" },
      { label: "一般", value: "normal" },
      { label: "小的", value: "small" },
    ],
  },
  backgroundColor: {
    type: ControlType.Color,
    label: "背景颜色",
  },
  height: {
    type: ControlType.Number,
    label: "高度",
    defaultValue: 100,
    extend: {
      unit: "px",
    },
  },
});

applyPropertyControls(Input, {
  placeholder: {
    type: ControlType.String,
    defaultValue: "请输入",
    label: "占位字符",
  },
  disabled: {
    type: ControlType.Boolean,
    defaultValue: false,
    label: "是否禁用",
  },
});

applyPropertyControls(SchemaForm, {
  schema: {
    type: ControlType.TextField,
    defaultValue: "",
    label: "定义模型",
    desc: (
      <span>
        可以通过
        <a href="https://x-render.gitee.io/tools/generator/playground">
          在线schema编辑器
        </a>
        配置
      </span>
    ),
  },
});

export const componentMap = new Map<string, CanvasElementType>([
  ["1", Datagrid],
  ["2", Input],
  ["3", Select],
  ["4", Page],
  ["5", SchemaForm],
]);
