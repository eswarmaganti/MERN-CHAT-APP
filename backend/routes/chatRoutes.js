import { Router } from "express";
import isAuthenticated from "./../middleware/authMiddleware.js";
import {
  createOrAccessChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  removeFromGroupChat,
  addUserToGroupChat,
} from "../controllers/chatController.js";
const router = Router();

router
  .post("/", isAuthenticated, createOrAccessChat)
  .get("/", isAuthenticated, fetchChats)
  .post("/group", isAuthenticated, createGroupChat)
  .put("/group/rename/:chatId", isAuthenticated, renameGroupChat)
  .put("/group/remove/:chatId", isAuthenticated, removeFromGroupChat)
  .put("/group/add/:chatId", addUserToGroupChat);

export default router;
