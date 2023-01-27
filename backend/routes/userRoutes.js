import { Router } from "express";

import {
  loginUser,
  registerUser,
  getAllUsers,
} from "../controllers/userController.js";
import isAuthenticated from "./../middleware/authMiddleware.js";

const router = Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/", isAuthenticated, getAllUsers);

export default router;
