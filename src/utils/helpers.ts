import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { IUser } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Hash the password
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare hashed password
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

// Generate JWT token
export const generateToken = (user: IUser): string => {
  return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
};

// Extract token from request headers
export const extractToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
};
``
