import { Router } from "express";
import {
    changePassword,
    createUser,
    login,
    resendToken,
    verifyToken,
} from "../../controllers/auth.controller";
import { isUserAuthenticated } from "../../middlewares/auth";

const router = Router();

// Auth routes
router.post("/register", createUser);
router.patch("/verify", verifyToken);
router.post("/login", login);

router.get("/resend", resendToken);

router.patch("/change-password", isUserAuthenticated, changePassword);

export default router;
