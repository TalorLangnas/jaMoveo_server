import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
export const registerUser = async (username, password, instrument, role = "player" // 👈 optional role arg
) => {
    const existingUser = await User.findOne({ username });
    if (existingUser)
        throw new Error("Username already exists");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, instrument, role });
    await user.save();
    return user;
};
export const loginUser = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user)
        throw new Error("Invalid username or password");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid username or password");
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    return token;
};
