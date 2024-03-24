import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const dateSlice = createSlice({
  name: "activeday",
  initialState: {
    activeDay: moment(new Date()).format("YYYY-MM-DD"),
  },
  reducers: {
    changeDay: (state, action) => {
      state.activeDay = moment(action.payload).format("YYYY-MM-DD");
    },
  },
});

export const { changeDay } = dateSlice.actions;
export default dateSlice.reducer;
