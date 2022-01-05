import { ActionMap, CanvasElementType } from "../../types";
import { MdAdsClick } from "react-icons/md";
import { BiLoader } from "react-icons/bi";

const ONCLICK = "onClick";
const ONMOUNT = "onMount";

export const ActionType = {
  onClick: ONCLICK,
  onMount: ONMOUNT,
};

// export const ActionMap = Object.entries(actionType).reduce(
//   (acc, [key, val]) => {
//     (acc as any)[val] = key; // TODO:
//     return acc;
//   },
//   {}
// );

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

export const platformActionExecutions = {
  setState: {
    type: "setState",
    label: "变量赋值",
  },
  showModal: {
    type: "showModal",
    label: "弹窗",
  },
};
