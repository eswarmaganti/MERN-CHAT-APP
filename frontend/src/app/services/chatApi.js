import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerName: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/chat/" }),
  tagTypes: ["Chat"],
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: ({ userId, token }) => ({
        url: "",
        method: "POST",
        body: { userId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Chat"],
    }),
    createGroupChat: builder.mutation({
      query: ({ users, name, token }) => ({
        url: "group",
        method: "POST",
        body: { name, users: JSON.stringify(users) },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Chat"],
    }),
    removeFromGroupChat: builder.mutation({
      query: ({ userId, chatId, token }) => ({
        url: `group/remove/${chatId}`,
        method: "PUT",
        body: { userId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Chat"],
    }),
    addUserToGroupChat: builder.mutation({
      query: ({ chatId, userId, token }) => ({
        url: `group/add/${chatId}`,
        method: "PUT",
        body: { userId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Chat"],
    }),
    renameGroupChat: builder.mutation({
      query: ({ chatId, chatName, token }) => ({
        url: `group/rename/${chatId}`,
        method: "PUT",
        body: { chatName },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Chat"],
    }),
    fetchChats: builder.query({
      query: (token) => ({
        url: "",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Chat"],
    }),
  }),
});

export const {
  useFetchChatsQuery,
  useCreateGroupChatMutation,
  useCreateChatMutation,
  useRemoveFromGroupChatMutation,
  useRenameGroupChatMutation,
  useAddUserToGroupChatMutation,
} = chatApi;
