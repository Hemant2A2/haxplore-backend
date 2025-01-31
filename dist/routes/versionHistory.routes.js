import express from "express";
import { createSnapshotController, getSnapshotsController, restoreSnapshotController, } from "../controllers/versionHistory.controller";
const router = express.Router();
router.post("/save", createSnapshotController); // Save snapshot
router.get("/:collageId", getSnapshotsController); // Get all snapshots for a collage
router.post("/restore", restoreSnapshotController); // Restore a specific snapshot
export default router;
//# sourceMappingURL=versionHistory.routes.js.map