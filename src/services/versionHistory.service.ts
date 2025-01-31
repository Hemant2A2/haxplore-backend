import VersionHistory, { IVersionHistory } from "../models/versionHistory.model";

/**
 * Create a new snapshot of the collage.
 */
export const createSnapshot = async (collageId: string, data: any): Promise<IVersionHistory> => {
  try {
    return await VersionHistory.create({ collageId, data });
  } catch (error) {
    console.error("Error creating snapshot:", error);
    throw new Error("Failed to save snapshot.");
  }
};

/**
 * Retrieve all snapshots for a given collage.
 */
export const getSnapshots = async (collageId: string): Promise<IVersionHistory[]> => {
  try {
    return await VersionHistory.find({ collageId }).sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error retrieving snapshots:", error);
    throw new Error("Failed to fetch snapshots.");
  }
};

/**
 * Restore a specific snapshot.
 */
export const restoreSnapshot = async (snapshotId: string): Promise<IVersionHistory | null> => {
  try {
    return await VersionHistory.findById(snapshotId);
  } catch (error) {
    console.error("Error restoring snapshot:", error);
    throw new Error("Failed to restore snapshot.");
  }
};
