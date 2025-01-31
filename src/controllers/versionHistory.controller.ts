import { Request, Response } from "express";
import { createSnapshot, getSnapshots, restoreSnapshot } from "../services/versionHistory.service";

/**
 * Save a new version history snapshot.
 */
export const createSnapshotController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { collageId, data } = req.body;
    const snapshot = await createSnapshot(collageId, data);
    return res.status(201).json({ message: "Snapshot saved", snapshot });
  } catch (error:any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieve all snapshots for a given collage.
 */
export const getSnapshotsController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { collageId } = req.params;
    const snapshots = await getSnapshots(collageId);
    return res.status(200).json(snapshots);
  } catch (error:any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Restore a specific snapshot.
 */
export const restoreSnapshotController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { snapshotId } = req.body;
    const restoredSnapshot = await restoreSnapshot(snapshotId);

    if (!restoredSnapshot) {
      return res.status(404).json({ message: "Snapshot not found" });
    }

    return res.status(200).json({ message: "Snapshot restored", restoredSnapshot });
  } catch (error:any) {
    return res.status(500).json({ message: error.message });
  }
};
