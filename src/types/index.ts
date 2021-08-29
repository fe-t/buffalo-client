import { ElementType, ReactNode } from "react";
import { CSSProperties } from "styled-components";
import { ControlType, ValueOf } from "../pages/Editor/property-controls";

export interface PropsItem {
  /** 属性中文名称 */
  zhName?: string;
  /** 类型，属性编辑器会根据这个类型渲染属性编辑器组件 */
  type: ValueOf<typeof ControlType>;
  /** 占位符, 某些属性编辑器组件会需要 */
  placeholder?: string;
  /** 是否必填写 */
  required?: boolean;
  /** 默认值 */
  defaultValue?: any;
  /** 值 */
  value?: any;
  /** 属性标签 */
  label: string;
  /** 属性描述 */
  desc?: ReactNode;
  /** 属性描述 */
  popHint?: ReactNode;
  /** 选项 */
  options?: { label: string; value: any }[];
  /** 包装器样式 */
  wrapperStyle?: CSSProperties;
  /** 扩展 */
  extend?: {
    [k: string]: any;
  };
}

export interface PropsMap {
  [k: string]: PropsItem;
  // children?: CanvasComponent[];
}

export type MaterialType = "layout" | "form" | "display" | "navigation";
export interface Material {
  id: string;
  name: string;
  zhName: string;
  type: MaterialType;
}

export interface CanvasComponent {
  id: string;
  name: string;
  zhName: string;
  materialId: string;
  props: PropsMap;
}

export type CanvasElementType = ElementType & {
  propertyControls?: PropsMap;
};

export interface RenderPropsItem extends PropsItem {
  name: string;
}
