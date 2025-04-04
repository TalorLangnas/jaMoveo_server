import User from "../../models/user.model.js";
export const getAllUsers = async () => {
    return await User.find();
};
export const getUserById = async (id) => {
    return await User.findById(id);
};
