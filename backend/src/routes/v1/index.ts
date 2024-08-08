import { Router } from "express";
import httpStatus from "http-status";
import authRoutes from "./authRoutes";

const router = Router();

// Auth routes
router.use("/auth", authRoutes);

// Checking api is live
router.get("/info", (req, res) => {
    res.status(httpStatus.OK).json("Api is working fine");
});

export default router;
