import express from "express";
import isAuthenticated from "./../middleware/authMiddleware.js";
import {
  createNewMessage,
  fetchAllMessages,
} from "../controllers/messageController.js";

const router = express.Router();

router
  .post("/", isAuthenticated, createNewMessage)
  .get("/:chatId", isAuthenticated, fetchAllMessages);

export default router;
