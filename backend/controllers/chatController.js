import Chat from "../models/chatModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const createOrAccessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400);
    throw new Error("User Id is mandatory to create or access chat");
  }

  // finding the chat with current user and input user and populating user and lastMessage data
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        users: { $elemMatch: { $eq: req.user._id } },
      },
      {
        users: { $elemMatch: { $eq: userId } },
      },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  // populating the sender details of lastMessage
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name profilePicture email",
  });

  if (isChat.length > 0) {
    res.send(isChat);
  } else {
    const senderData = await User.findById(userId);

    try {
      const newChat = await Chat.create({
        chatName: senderData.name,
        isGroupChat: false,
        users: [userId, req.user._id],
      });

      const FullChat = await Chat.find({ _id: newChat._id }).populate(
        "users",
        "-password"
      );
      res.status(201);
      res.send(FullChat);
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
});

export const fetchChats = asyncHandler(async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin")
      .sort({ updatedAt: -1 });

    const finalChats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name email profilePicture",
    });

    res.status(200).send(finalChats);
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

export const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.users) {
    res.status(400);
    throw new Error("Group Name / Group Participants are required");
  }

  const users = JSON.parse(req.body.users);
  if (users.length < 2) {
    res.status(400);
    throw new Error("Group participants must be at least 2 users");
  }

  // push current user to group
  users.push(req.user._id);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users,
      isGroupChat: true,
      groupAdmin: req.user._id,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage");

    res.status(200).send(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
export const removeFromGroupChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { userId } = req.body;
  if (!userId) {
    res.status(400);
    throw new Error("userId is mandatory to remove from a group");
  }
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      res.status(400);
      throw new Error("No Chat found with given details");
    } else res.status(200).send(updatedChat);
  } catch (error) {
    console.error(error);
    res.status(400);
    throw new Error(error);
  }
});

export const addUserToGroupChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { userId } = req.body;
  if (!userId) {
    res.status(400);
    throw new Error("user is mandatory to add to a group");
  }
  try {
    const user = await Chat.findOne({ _id: chatId, users: { $in: [userId] } });
    // check whether the user is already in the group
    console.log(user);
    if (user) {
      res.status(400);
      throw new Error("User is already exists in the group");
    }

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      res.status(400);
      throw new Error("No Chat found with given details");
    } else res.status(200).send(updatedChat);
  } catch (error) {
    console.error(error);
    res.status(400);
    throw new Error(error);
  }
});

export const renameGroupChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { chatName } = req.body;
  if (!chatName) {
    res.status(400);
    throw new Error("Chat Name is required");
  }
  try {
    const chatData = await Chat.findById(chatId);

    if (!chatData) {
      res.status(400);
      throw new Error("there is no group chat data available");
    }

    chatData.chatName = chatName;

    await chatData.save();

    const fullChatData = await Chat.findById(chatId)
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage");

    res.status(200).send(fullChatData);
  } catch (error) {
    console.error(error);
    res.status(400);
    throw new Error(error.message);
  }
});
