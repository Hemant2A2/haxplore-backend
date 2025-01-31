import express from "express";
import { uploadFile, getUploads } from "../controllers/upload.controller";
import { uploadMiddleware } from "../middlewares/upload.middleware";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.post("/", uploadMiddleware, asyncHandler(uploadFile));
router.get("/", asyncHandler(getUploads));

export default router;
