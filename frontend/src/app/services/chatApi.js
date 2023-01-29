import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerName: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/chat/" }),
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
    }),
    fetchChats: builder.query({
      query: (token) => ({
        url: "",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useFetchChatsQuery, useCreateChatMutation } = chatApi;
