import { combineReducers } from "@reduxjs/toolkit";
import orderSlice from "./orderSlice";
import customerSlice from "./customerSlice";
import dateSlice from "./dateSlice";
import custxSlice from "./custxSlice";
import loginSlice from "./loginSlice";
import cdqSlice from "./cdqSlice";
import generalSlice from "./generalSlice";


const rootReducers = combineReducers({
  orderx: orderSlice,
  customer: customerSlice,
  custx:custxSlice,
  dateReducer: dateSlice,
  loginReducer:loginSlice,
  cdqReducer:cdqSlice,
  generalReducer:generalSlice,
});
export default rootReducers;
