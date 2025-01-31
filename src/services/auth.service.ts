import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Replace with a strong secret key

export const register = async ({ username, email, password }: { username: string; email: string; password: string }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  return { id: newUser._id, username: newUser.username, email: newUser.email };
};

export const login = async ({ email, password }: { email: string; password: string }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found.");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid password.");
  }

  const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });
  return token;
};
