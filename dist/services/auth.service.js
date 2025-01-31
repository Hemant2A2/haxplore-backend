var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/user.model";
import { comparePassword, generateToken, hashPassword } from "utils/helpers";
export const register = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, email, password }) {
    const existingUser = yield User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already in use.");
    }
    const hashedPassword = yield hashPassword(password);
    const newUser = new User({ username, email, password: hashedPassword });
    yield newUser.save();
    return { id: newUser._id, username: newUser.username, email: newUser.email };
});
export const login = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    const user = yield User.findOne({ email });
    if (!user) {
        throw new Error("User not found.");
    }
    const isValidPassword = yield comparePassword(password, user.password);
    if (!isValidPassword) {
        throw new Error("Invalid password.");
    }
    const token = generateToken(user);
    return token;
});
//# sourceMappingURL=auth.service.js.map