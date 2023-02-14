import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { notFoundHandler, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

// connect to mongoDB
connectDB();

const app = express();

// middleware setup
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`*** Backend is running on ${PORT} ***`)
);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to Socket.io");

  socket.on("setup", (user) => {
    socket.join(user._id);
    socket.emit("connedted");
  });

  socket.on("join chat", (chatId) => {
    socket.join(chatId);
    console.log(`User joined chatRoom with ID: ${chatId}`);
  });

  socket.on("new message", (message) => {
    console.log("New Message Received from frontend", message);
    const { chat, sender } = message;
    if (!chat.users) return console.log("chat.users are not defined");

    for (const user of chat.users) {
      if (user._id !== sender._id)
        socket.in(user._id).emit("message received", message);
    }
  });
});
