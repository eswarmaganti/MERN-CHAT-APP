import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("chatAppUserInfo")
    ? JSON.parse(localStorage.getItem("chatAppUserInfo")).user
    : {},
};

export const userSlice = createSlice({
  name: "chatAppUserInfo",
  initialState,
  reducers: {
    setUserInfo: (state, data) => {
      localStorage.setItem(
        "chatAppUserInfo",
        JSON.stringify({ user: data.payload })
      );
      state.user = { ...data.payload };
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
