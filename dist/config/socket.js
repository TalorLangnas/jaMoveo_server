import { Server as SocketIOServer } from "socket.io";
let io;
export const initSocket = (server) => {
    io = new SocketIOServer(server, {
        cors: {
            origin: "*",
        },
    });
    io.on("connection", (socket) => {
        console.log("🟢 Socket connected:", socket.id);
        // Optional: add your socket listeners here
        socket.on("disconnect", () => {
            console.log("🔴 Socket disconnected:", socket.id);
        });
    });
    return io;
};
export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};
