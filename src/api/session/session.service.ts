import mongoose from "mongoose";
import Session, { ISession } from "../../models/session.model.js";
import User from "../../models/user.model.js";

export const createSession = async (adminId: string): Promise<ISession | null> => {

  const existingSession = await Session.findOne({ admin: adminId, isActive: true });

  if (existingSession) {
    
    return null;
  }

  const isLocal = process.env.NODE_ENV === "development";  // Check if in development
  const baseUrl = isLocal ? "http://localhost:5000" : process.env.BASE_URL; // Use environment variable for production URL

  // Create a new session first (so Mongoose generates _id)
  const session = new Session({
    admin: adminId,
  });

  await session.save(); // Save the session to the database, Mongoose will generate _id

  // Now that the session is saved, use session._id to generate sessionUrl
  session.sessionUrl = `${baseUrl}/api/session/${session._id.toString()}`;

  // Save the session again after assigning the sessionUrl
  await session.save();

  // Update the admin's sessionId with the session._id value
  const admin = await User.findById(adminId);
  if (admin) {
    admin.sessionId = session._id;  // Set admin's sessionId to the session's _id
    await admin.save();  // Save the updated admin document
  }

  return session;  // Return the session object with sessionUrl included (correctly generated)
};

export const getCurrentSession = async (sessionId: string): Promise<ISession | null> => {
  return await Session.findById(sessionId) // No need to populate songs
    .populate("admin", "username")  // Populating admin's username
    .populate("connectedUsers", "username instrument")  // Populating connected user details
    .exec();  // Explicitly call .exec() for more control over the query
};

export const disconnectUser = async (userSessionId: string, userId: string) => {
  const session = await Session.findById(userSessionId);
  if (!session) throw new Error("Session not found");

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const userObjectId = new mongoose.Types.ObjectId(userId); // Convert userId to ObjectId

  // Handle player disconnection
  if (user.role === "player") {
    if (!session.connectedUsers.includes(userObjectId)) throw new Error("User is not in the session");
    
    // Remove player from the connectedUsers and update session
    session.connectedUsers = session.connectedUsers.filter(id => !id.equals(userObjectId));
    await session.save();

    user.sessionId = 0;
    await user.save();
    return { message: "Player successfully disconnected from the session", session };
  }

  // Handle admin disconnection
  if (user.role === "admin") {
    session.isActive = false;
    await session.save(); // Deactivate session first

    // Remove all players from the connectedUsers list and reset their sessionId
    for (const connectedUserId of session.connectedUsers) {
      const connectedUser = await User.findById(connectedUserId);
      if (connectedUser) {
        connectedUser.sessionId = 0;
        await connectedUser.save();
      }
    }

    await session.deleteOne(); // Delete the session from DB

    user.sessionId = 0;
    await user.save();
    return { message: "Admin successfully disconnected. Session is finished.", session };
  }

  throw new Error("Invalid user role");
};