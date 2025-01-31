import { Request, Response } from "express";
import Collage from "../models/collage.model";

export const getCollage = async (req: Request, res: Response) => {
  try {
    const collage = await Collage.findById(req.params.id);
    res.json(collage);
  } catch (err) {
    res.status(500).json({ error: "Error fetching collage" });
  }
};

export const updateCollage = async (req: Request, res: Response) => {
  try {
    const { images } = req.body;
    const updatedCollage = await Collage.findByIdAndUpdate(req.params.id, { images }, { new: true });

    // // Notify all users about the update
    // WebSocketService.broadcast({ type: "collage_updated", data: updatedCollage });

    res.json(updatedCollage);
  } catch (err) {
    res.status(500).json({ error: "Error updating collage" });
  }
};
