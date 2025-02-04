import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import { connectDB } from "./config/db.config";
import authRoutes from "./routes/auth.routes";
import uploadRoutes from "./routes/upload.routes";
import collageRoutes from "./routes/collage.routes";
// import chatRoutes from "./routes/chat.routes";
import versionHistoryRoutes from "./routes/versionHistory.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

// Set CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // explicitly allow this origin
  credentials: true,               // allow credentials (cookies, headers, etc.)
};

const app = express();

// Middleware
// Use CORS middleware with the options
app.use(cors(corsOptions));

app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

// Database connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/collage", collageRoutes);
// app.use("/api/chat", chatRoutes);
app.use("/api/history", versionHistoryRoutes);
app.use("/api/user", userRoutes);

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Image Collage Creator API is running...");
});

export default app;
