import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
const router = express.Router();
router.post("/register", registerUser); // User Signup
router.post("/login", loginUser); // User Login
export default router;
//# sourceMappingURL=auth.routes.js.map