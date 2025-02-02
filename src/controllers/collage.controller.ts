import { Request, Response } from "express";
import Collage from "../models/collage.model";

// Create a new collage
export const createCollage = async (req: Request, res: Response): Promise<void> => {
  try {
    // Assume authenticate middleware attaches { userId } to req.user
    const userId = (req as any).user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    
    // Create a new collage with an empty images array and no locks
    const newCollage = new Collage({
      images: [],
      createdBy: userId,
      locks: []
    });
    
    await newCollage.save();
    res.status(201).json({ collageId: newCollage._id, message: "Collage created successfully" });
  } catch (error: any) {
    console.error("Error creating collage:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Retrieve a collage by its ID
export const getCollage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const collage = await Collage.findById(id);
    if (!collage) {
      res.status(404).json({ message: "Collage not found" });
      return;
    }
    res.status(200).json(collage);
  } catch (error: any) {
    console.error("Error fetching collage:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an existing collage by its ID
export const updateCollage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    // Expect updated collage data (for example, images and locks) in req.body
    const { images, locks } = req.body;
    const updatedCollage = await Collage.findByIdAndUpdate(id, { images, locks }, { new: true });
    if (!updatedCollage) {
      res.status(404).json({ message: "Collage not found" });
      return;
    }
    res.status(200).json({ message: "Collage updated", collage: updatedCollage });
  } catch (error: any) {
    console.error("Error updating collage:", error);
    res.status(500).json({ message: "Server error" });
  }
};
