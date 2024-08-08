import { Router } from "express";
import { createUser } from "../../controllers/auth.controller";

const router = Router();

// Auth routes
router.post("/register", createUser);

export default router;
