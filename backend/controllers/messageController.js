import asyncHandler from "express-async-handler";
import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

export const createNewMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    res.status(400);
    throw new Error("Message content and chatIs are required");
  }

  const newMessage = {
    content,
    sender: req.user._id,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "name profilePicture email");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name  email",
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// route : GET /api/message/:chatId
// access : PRIVATE
export const fetchAllMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name profilePicture email")
      .populate("chat");

    res.status(200).json(messages);
  } catch (error) {
    res.send(500);
    throw new Error(error.message);
  }
});
