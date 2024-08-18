import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import todoReducer from "../slices/todoSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  todo:todoReducer,
});

export default rootReducer;
