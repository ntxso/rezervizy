import { createSlice } from "@reduxjs/toolkit";

export const generalSlice=  createSlice({
    name:"general",
    initialState:{
        loading:false,
    },
    reducers:{
        //dispatch(changeDay(moment(val).format("YYYY-MM-DD")));
        setLoading: (state, action) => {
            state.loading = action.payload;
          },
    },

})
export const { setLoading } = generalSlice.actions;
export default generalSlice.reducer;