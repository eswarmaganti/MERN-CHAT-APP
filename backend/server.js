import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { notFoundHandler, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

// connect to mongoDB
connectDB();

const app = express();

// middleware setup
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`*** Backend is running on ${PORT} ***`));
