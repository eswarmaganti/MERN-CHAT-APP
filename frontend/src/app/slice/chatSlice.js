import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: { selectedChat: {} },
  reducers: {
    setSelectedChat: (state, data) => {
      state.selectedChat = { ...data.payload };
    },
  },
});

export const { setSelectedChat } = chatSlice.actions;
export default chatSlice.reducer;
