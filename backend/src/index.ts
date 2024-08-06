import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ApiError } from "./utils/ApiError";
import httpStatus from "http-status";
import errorHandler from "./middlewares/errorHandler";
import apiRoutes from "./routes/index";

dotenv.config(); // Load environment variables

const app = express();

// Handle CORS issue
app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", apiRoutes);

// 404 handler for unknown API requests
app.use((req, res, next) => {
    next(new ApiError("Not found", httpStatus.NOT_FOUND));
});

// Error handler middleware
app.use(errorHandler);
