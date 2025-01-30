import express from "express";
import { getCollage, updateCollage } from "../controllers/collage.controller";

const router = express.Router();

router.get("/:id", getCollage);
router.put("/:id", updateCollage);

export default router;
