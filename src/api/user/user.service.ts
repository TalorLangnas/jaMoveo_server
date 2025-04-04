import User, { IUser } from "../../models/user.model.js";

// Returns an array of users
export const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

// Returns a single user or null
export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};
