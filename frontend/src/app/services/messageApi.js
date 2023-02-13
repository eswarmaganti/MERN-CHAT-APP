import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/message/" }),
  endpoints: (builder) => ({
    sendNewMessage: builder.mutation({
      query: ({ content, chatId, token }) => ({
        url: "",
        method: "POST",
        body: { content, chatId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    fetchMessages: builder.query({
      query: ({ chatId, token }) => ({
        url: `/${chatId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useSendNewMessageMutation, useFetchMessagesQuery } = messageApi;
