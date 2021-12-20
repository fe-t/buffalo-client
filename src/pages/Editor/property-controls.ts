import { CanvasElementType, PropsMap } from "../../types";

const BOOLEAN = "boolean";
const ENUM = "enum";
const NUMBER = "number";
const STRING = "string";
const FUSED_NUMBER = "fusednumber";
const COLOR = "color";
const IMAGE = "image";
const FILE = "file";
const COMPONENT_INSTANCE = "componentinstance";
const ARRAY = "array";
const EVENT_HANDLER = "eventhandler";
const STYLE = "style";
const OBJECT = "object";
const TEXTFIELD = "textfield";
const CODE_FIELD = "codefield";

export type ValueOf<T> = T[keyof T];

export const ControlType = {
  TextField: TEXTFIELD,
  Boolean: BOOLEAN,
  Enum: ENUM,
  Number: NUMBER,
  String: STRING,
  FusedNumber: FUSED_NUMBER,
  Color: COLOR,
  Image: IMAGE,
  File: FILE,
  ComponentInstance: COMPONENT_INSTANCE,
  Array: ARRAY,
  EventHandler: EVENT_HANDLER,
  Style: STYLE,
  Object: OBJECT,
  CodeField: CODE_FIELD,
};

export const ControlMap = Object.entries(ControlType).reduce(
  (acc, [key, val]) => {
    (acc as any)[val] = key; // TODO:
    return acc;
  },
  {}
);

export const applyPropertyControls = (
  Component: CanvasElementType,
  controls: PropsMap
) => {
  if (Component.propertyControls) {
    Component.propertyControls = {
      ...Component.propertyControls,
      ...controls,
    };
  } else {
    Component.propertyControls = controls;
  }
};

// export const is = (val) => ControlMap[val];
