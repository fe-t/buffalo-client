import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { editorSlice } from "./editor/editorSlice";
import undoable, { excludeAction } from "redux-undo";

const store = configureStore({
  reducer: {
    editor: undoable(editorSlice.reducer, {
      // exclude these actions out of unoable stack
      filter: excludeAction([
        editorSlice.actions.cursorComponentBlur.type,
        editorSlice.actions.setCursorComponentId.type,
      ]),
    }),
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
