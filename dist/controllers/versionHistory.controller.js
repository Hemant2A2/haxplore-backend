var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createSnapshot, getSnapshots, restoreSnapshot } from "../services/versionHistory.service";
/**
 * Save a new version history snapshot.
 */
export const createSnapshotController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { collageId, data } = req.body;
        const snapshot = yield createSnapshot(collageId, data);
        return res.status(201).json({ message: "Snapshot saved", snapshot });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
/**
 * Retrieve all snapshots for a given collage.
 */
export const getSnapshotsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { collageId } = req.params;
        const snapshots = yield getSnapshots(collageId);
        return res.status(200).json(snapshots);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
/**
 * Restore a specific snapshot.
 */
export const restoreSnapshotController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { snapshotId } = req.body;
        const restoredSnapshot = yield restoreSnapshot(snapshotId);
        if (!restoredSnapshot) {
            return res.status(404).json({ message: "Snapshot not found" });
        }
        return res.status(200).json({ message: "Snapshot restored", restoredSnapshot });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
//# sourceMappingURL=versionHistory.controller.js.map