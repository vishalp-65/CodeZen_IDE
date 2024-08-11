import { Router } from "express";
import {
    createUser,
    login,
    verifyToken,
} from "../../controllers/auth.controller";

const router = Router();

// Auth routes
router.post("/register", createUser);
router.patch("/verify", verifyToken);
router.post("/login", login);

export default router;
