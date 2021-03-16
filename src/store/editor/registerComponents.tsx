/**
 * 注册组件，让画布和属性编辑器能识别到
 */
import { FC } from "react";
import {
  applyPropertyControls,
  ControlType,
} from "../../pages/Editor/property-controls";
import { CanvasElementType } from "../../types";
import { Datagrid, Input, Select } from "@yy/tofu-ui-react";

/** 自定义的物料 */
const Page: FC<{ children: string; name: string }> = ({ children, name }) => {
  return (
    <div className="Page" style={{ padding: "20px", border: "1px solid #999" }}>
      <p>page: {name}</p>
      {children}
    </div>
  );
};

/** 注册物料编辑属性 */
applyPropertyControls(Page, {
  children: {
    type: ControlType.String,
    required: true,
    placeholder: "请输入内容",
    defaultValue: "lorem ipsum",
  },
  name: {
    type: ControlType.String,
    required: true,
    defaultValue: "Home Page",
  },
});

export const componentMap = new Map<string, CanvasElementType>([
  ["1", Datagrid],
  ["2", Input],
  ["3", Select],
  ["4", Page],
]);
