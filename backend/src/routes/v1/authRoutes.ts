import { Router } from "express";
import { createUser, verifyToken } from "../../controllers/auth.controller";

const router = Router();

// Auth routes
router.post("/register", createUser);
router.patch("/verify", verifyToken);

export default router;
