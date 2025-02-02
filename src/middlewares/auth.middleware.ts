import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
    // Attach the decoded payload to req.user
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
    return;
  }
};
