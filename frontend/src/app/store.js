import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { chatApi } from "./services/chatApi";
import userReducer from "./slice/userSlice";
import chatReducer from "./slice/chatSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    chatAppUserInfo: userReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, chatApi.middleware),
});

export default store;
