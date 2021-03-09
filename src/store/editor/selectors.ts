import { RootState } from "..";

// 当前游标选择组件的 id
export const selectCursorComponentId = (state: RootState) =>
  state.editor.present.cursorComponentId;

// 当前游标选择的组件
export const selectCursorComponent = (state: RootState) => {
  const components = state.editor.present.components;
  const cursorId = state.editor.present.cursorComponentId;
  return components.filter((c) => c.id === cursorId)[0];
};

// 物料
export const selectMaterials = (state: RootState) =>
  state.editor.present.materials;

// 画布上的组件
export const selectComponents = (state: RootState) =>
  state.editor.present.components;
