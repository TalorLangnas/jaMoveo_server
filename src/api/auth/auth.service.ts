import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

export const registerUser = async (
  username: string,
  password: string,
  instrument: string,
  role: "player" | "admin" = "player" // 👈 optional role arg
) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) throw new Error("Username already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, instrument, role });
  await user.save();
  return user;
};

export const loginUser = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("Invalid username or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid username or password");

  // Create the token, include user role along with user id
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
  
  // Return both token and role
  console.log("instrument is:", user.instrument); // Debugging line
  return { token, role: user.role, userId: user._id, instrument: user.instrument };
};
