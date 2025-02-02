import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { getCollage, updateCollage, createCollage } from "../controllers/collage.controller";

const router = express.Router();

// Create a new collage (protected route)
router.post("/create", authenticate, createCollage);

// Get a collage by ID (protected route)
router.get("/:id", authenticate, getCollage);

// Update a collage by ID (protected route)
router.put("/update/:id", authenticate, updateCollage);

export default router;
