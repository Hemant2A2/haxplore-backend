import User from "../models/user.model";
import { comparePassword, generateToken, hashPassword } from "../utils/helpers";


export const register = async ({ username, email, password }: { username: string; email: string; password: string }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use.");
  }

  const hashedPassword = await hashPassword(password);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  return { id: newUser._id, username: newUser.username, email: newUser.email };
};

export const login = async ({ email, password }: { email: string; password: string }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found.");
  }

  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid password.");
  }

  const token = generateToken(user);
  return token;
};
