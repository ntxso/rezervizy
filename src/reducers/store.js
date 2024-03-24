import { configureStore } from "@reduxjs/toolkit";
import rootReducers from ".";

const store=configureStore({
    reducer:rootReducers
})

export default store;