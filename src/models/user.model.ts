import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  instrument: { type: String, required: true },
  role: { type: String, enum: ["player", "admin"], default: "player" },
});

const User = mongoose.model("User", userSchema);
export default User;
