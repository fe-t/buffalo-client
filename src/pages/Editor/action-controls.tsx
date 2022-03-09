import { ActionMap, CanvasElementType } from "../../types";
import { MdAdsClick } from "react-icons/md";
import { BiLoader } from "react-icons/bi";

const ONCLICK = "onClick";
const ONMOUNT = "onMount";

export const ActionType = {
  onClick: ONCLICK,
  onMount: ONMOUNT,
};

export const applyActionControls = (
  Component: CanvasElementType,
  controls: ActionMap
) => {
  if (Component.actionControls) {
    Component.actionControls = {
      ...Component.actionControls,
      ...controls,
    };
  } else {
    Component.actionControls = controls;
  }
};

export const platformActions = {
  onClick: {
    type: ActionType.onClick,
    label: "点击时",
    icon: <MdAdsClick />,
  },
  onMount: {
    type: ActionType.onMount,
    label: "加载完成后",
    icon: <BiLoader />,
  },
};
export type PlatformActions = keyof typeof platformActions;

export const platformActionExecutions = {
  setState: {
    type: "setState",
    label: "变量赋值",
  },
  showModal: {
    type: "showModal",
    label: "弹窗",
  },
  navigateTo: {
    type: "navigateTo",
    label: "页面跳转",
  },
  showToast: {
    type: "showToast",
    label: "显示消息提示",
  },
  customExecution: {
    type: "customExecution",
    label: "自定义",
  },
};
export type PlatformActionExecutions = keyof typeof platformActionExecutions;
