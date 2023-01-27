import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import userReducer from "./slice/userSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    chatAppUserInfo: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
