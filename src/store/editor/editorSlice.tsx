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
        // 如果更新的属性是 children, 查出这个 material.
        const isComponentType = action.payload.propKey === "children";
        if (isComponentType) {
          const materialId = action.payload.propValue;
          const material = state.materials.find((x) => x.id === materialId);
          // const component =
          if (!material) {
            console.error("not such material, material id:", materialId);
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
    deleteCursorComponent: (state) => {
      remove(state.components, (c) => c.id === state.cursorComponentId);
      // 和清除游标
      state.cursorComponentId = "";
    },
  },
});

export const {
  setAppName,
  setAppConfig,
  setCursorComponentId,
  cursorComponentBlur,
  addComponent,
  updateComponentProp,
  deleteCursorComponent,
} = editorSlice.actions;

export default editorSlice.reducer;
