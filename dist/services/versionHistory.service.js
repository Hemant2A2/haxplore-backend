var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import VersionHistory from "../models/versionHistory.model";
/**
 * Create a new snapshot of the collage.
 */
export const createSnapshot = (collageId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield VersionHistory.create({ collageId, data });
    }
    catch (error) {
        console.error("Error creating snapshot:", error);
        throw new Error("Failed to save snapshot.");
    }
});
/**
 * Retrieve all snapshots for a given collage.
 */
export const getSnapshots = (collageId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield VersionHistory.find({ collageId }).sort({ createdAt: -1 });
    }
    catch (error) {
        console.error("Error retrieving snapshots:", error);
        throw new Error("Failed to fetch snapshots.");
    }
});
/**
 * Restore a specific snapshot.
 */
export const restoreSnapshot = (snapshotId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield VersionHistory.findById(snapshotId);
    }
    catch (error) {
        console.error("Error restoring snapshot:", error);
        throw new Error("Failed to restore snapshot.");
    }
});
//# sourceMappingURL=versionHistory.service.js.map