import { createSlice } from "@reduxjs/toolkit";


export const loginControlSlice=createSlice({
    name:'loginControl',
    initialState:{
        isLogged:false,
    },
    reducers:{
        checkLogin:(state)=>{
            const checkFromLS=localStorage.getItem("token");
            if(checkFromLS){
                state.isLogged=true;
            }
            else{
                state.isLogged=false;
            }
        },
        logOut:(state)=>{
            localStorage.removeItem("token");
            localStorage.removeItem("supplierid");
            state.isLogged=false;
        }
    }
})

export const {checkLogin,logOut}=loginControlSlice.actions;
export default loginControlSlice.reducer;