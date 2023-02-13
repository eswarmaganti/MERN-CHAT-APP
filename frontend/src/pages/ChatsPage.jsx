import React from "react";

import UserChatBox from "../components/UserChatBox";
import { useSelector } from "react-redux";

const ChatsPage = () => {
  const { selectedChat: chat } = useSelector((state) => state.chat);

  return Boolean(Object.keys(chat).length) && <UserChatBox chat={chat} />;
};

export default ChatsPage;
