import { Request, Response } from "express";
import { saveFile, fetchUploads } from "../services/upload.service";

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const fileData = await saveFile(req.file);
    res.status(201).json({ message: "File uploaded successfully", file: fileData });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUploads = async (_req: Request, res: Response): Promise<void> => {
  try {
    const uploads = await fetchUploads();
    res.status(200).json({ uploads });
  } catch (error) {
    console.error("Fetch uploads error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
