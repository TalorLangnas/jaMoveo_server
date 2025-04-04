import { getAllUsers, getUserById } from "./user.service.js";
export const getUsers = async (_req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
};
export const getUser = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
};
