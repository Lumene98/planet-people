import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import planetReducer from "./features/planetSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    planet: planetReducer,
  },
});
