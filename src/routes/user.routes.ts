import { Router } from "express";
import { getCurrentUser } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware"; // Ensure this middleware decodes JWT

const router = Router();

// Protected route to get current user's profile
router.get("/me", authenticate, getCurrentUser);

export default router;
