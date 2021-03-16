import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { remove } from "lodash";
import { Material } from "../../types";
import { initialState } from "./initialState";
import "./registerComponents";
import { componentMap } from "./registerComponents";
export * from "./selectors";

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setCursorComponentId: (state, action: PayloadAction<string>) => {
      state.cursorComponentId = action.payload;
    },
    cursorComponentBlur: (state) => {
      state.cursorComponentId = "";
    },
    addComponent: (state, action: PayloadAction<Material>) => {
      const material = action.payload;
      const nextCusorId = `${++state.canvasComponentCounter}`;

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
        id: nextCusorId,
        materialId: material.id,
        props: serializeProps,
      });

      // // 设置新增的组件选中状态
      // state.cursorComponentId = nextCusorId;
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
        target.props[action.payload.propKey] = action.payload.propValue;
      } else {
        console.error(
          "not such target in canvas, componentId:",
          action.payload.componentId
        );
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
  setCursorComponentId,
  cursorComponentBlur,
  addComponent,
  updateComponentProp,
  deleteCursorComponent,
} = editorSlice.actions;

export default editorSlice.reducer;
