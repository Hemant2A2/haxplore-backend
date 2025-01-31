import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { extractToken } from "utils/helpers";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Same secret as in auth.service.ts

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};
