import { Request, Response } from "express";
import { register, login } from "../services/auth.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await register(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const token = await login(req.body);
    res.status(200).json({ message: "Login successful", token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
