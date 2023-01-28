import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerName: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: ({ userId, token }) => ({
        url: "/chat",
        method: "POST",
        body: { userId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    fetchChats: builder.query({
      query: (token) => ({
        url: "chat",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useFetchChatsQuery, useCreateChatMutation } = chatApi;
