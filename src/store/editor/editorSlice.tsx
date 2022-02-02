import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { merge, remove } from "lodash";
import { VersionInfo } from "../../models/GetVersionConfigResult";
import { Material } from "../../types";
import { editorInitialState } from "./initialState";
import "./registerComponents";
import { componentMap } from "./registerComponents";
export * from "./selectors";

export const editorSlice = createSlice({
  name: "editor",
  initialState: editorInitialState,
  reducers: {
    setVersionInfo: (state, action: PayloadAction<VersionInfo>) => {
      state.versionInfo = action.payload;
    },
    setAppName: (state, action: PayloadAction<string>) => {
      state.appName = action.payload;
    },
    setAppConfig: (state, action: PayloadAction<object>) => {
      state.appConfig = action.payload;
    },
    setCursorComponentId: (state, action: PayloadAction<string>) => {
      state.cursorComponentId = action.payload;
    },
    cursorComponentBlur: (state) => {
      state.cursorComponentId = "";
    },
    addComponent: (state, action: PayloadAction<Material>) => {
      const material = action.payload;
      // const nextCusorId = `${++state.canvasComponentCounter}`;

      // 获取到物料的默认属性
      const props = componentMap.get(material.id)?.propertyControls || {};
      const serializeProps = Object.entries(props).reduce(
        (acc, [propName, propInfo]) => {
          // 如果有defaultValue，取defaultValue
          return { ...acc, [propName]: propInfo.defaultValue };
        },
        {}
      );

      // 把组件加入画布
      state.components.push({
        ...material,
        id: nanoid(),
        materialId: material.id,
        props: serializeProps,
        style: {},
      });

      // // 设置新增的组件选中状态
      // state.cursorComponentId = nextCusorId;
    },
    setSavedComponents: (state, action: PayloadAction<any>) => {
      state.components = action.payload;
    },
    updateComponentProp: (
      state,
      action: PayloadAction<{
        componentId: string;
        propKey: string;
        propValue: any;
      }>
    ) => {
      const target = state.components.find(
        (c) => c.id === action.payload.componentId
      );
      if (target) {
        // 如果更新的属性是 children, 查出这个 material.
        const isComponentType = action.payload.propKey === "children";
        if (isComponentType) {
          const materialId = action.payload.propValue;
          const material = state.materials.find((x) => x.id === materialId);
          if (!material) {
            // TODO:
            // 如果找不到 物料，即是string，插入 string
            console.error("not such material, material id:", materialId);
            target.props[action.payload.propKey] = action.payload.propValue;
            return;
          }

          const nextCusorId = `${++state.canvasComponentCounter}`;
          // 获取到物料的默认属性
          const props =
            componentMap.get(material?.id as string)?.propertyControls || {};
          const serializeProps = Object.entries(props).reduce(
            (acc, [propName, propInfo]) => {
              // 如果有defaultValue，取defaultValue
              return { ...acc, [propName]: propInfo.defaultValue };
            },
            {}
          );

          target.props.children = [
            {
              ...material,
              id: nextCusorId,
              materialId: material.id,
              props: serializeProps,
            },
          ] as any; // TODO: 怎么写这个类型？
        } else {
          target.props[action.payload.propKey] = action.payload.propValue;
        }
      } else {
        console.error(
          "not such target in canvas, componentId:",
          action.payload.componentId
        );
      }
    },
    updateComponentStyle: (
      state,
      action: PayloadAction<{
        componentId: string;
        style: Record<string, string>;
      }>
    ) => {
      const target = state.components.find(
        (c) => c.id === action.payload.componentId
      );
      if (target) {
        target.style = action.payload.style;
      }
    },
    removeComponentAction: (
      state,
      action: PayloadAction<{
        componentId?: string;
        actionName: string;
        executionName: string;
      }>
    ) => {
      const target = state.components.find(
        (c) => c.id === action.payload.componentId
      );
      if (target) {
        delete target.actions?.[action.payload.actionName][
          action.payload.executionName
        ];
      }
    },
    bindComponentAction: (
      state,
      action: PayloadAction<{
        componentId?: string;
        action: Record<string, object>;
      }>
    ) => {
      const target = state.components.find(
        (c) => c.id === action.payload.componentId
      );
      if (target) {
        target.actions = merge(target.actions, action.payload.action);
        // target.actions = {};
      }
    },
    deleteCursorComponent: (state) => {
      remove(state.components, (c) => c.id === state.cursorComponentId);
      // 和清除游标
      state.cursorComponentId = "";
    },
  },
});

export const {
  setVersionInfo,
  setAppName,
  setAppConfig,
  setCursorComponentId,
  cursorComponentBlur,
  addComponent,
  updateComponentProp,
  removeComponentAction,
  bindComponentAction,
  deleteCursorComponent,
  setSavedComponents,
  updateComponentStyle,
} = editorSlice.actions;

export default editorSlice.reducer;
