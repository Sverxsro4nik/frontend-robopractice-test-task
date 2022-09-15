import { configureStore } from "@reduxjs/toolkit";
import usersDataReducer from "./usersDataSlice";

export default configureStore({
  reducer: {
    usersData: usersDataReducer,
  }
})