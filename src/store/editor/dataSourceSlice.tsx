import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dataSourceInitialState, Mode } from "./initialState";

export const dataSourceSlice = createSlice({
  name: "dataSource",
  initialState: dataSourceInitialState,
  reducers: {
    setAppData: (state, action: PayloadAction<any>) => {
      state.$app = action.payload;
    },
    setPageData: (state, action: PayloadAction<any>) => {
      state.$page = action.payload;
    },
    setMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
    },
  },
});

export const { setAppData } = dataSourceSlice.actions;
export default dataSourceSlice.reducer;
