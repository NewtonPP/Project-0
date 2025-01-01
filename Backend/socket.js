import { Server } from "socket.io";

const userSocketMap = {}; // {userId: socketId}

let io; // Declare `io` globally so it can be used across the application.

export const InitializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"], // Allowed origins
      methods: ["GET", "POST"], // Allowed HTTP methods
      credentials: true, // Allow cookies or Authorization headers
    },
  });

  io.on("connection", (socket) => {
    console.log("server connected with client");

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") {
      userSocketMap[userId] = socket.id;
    }

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      // Remove user from the map on disconnect
      for (const [key, value] of Object.entries(userSocketMap)) {
        if (value === socket.id) {
          delete userSocketMap[key];
        }
      }
    });
  });
};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// Export `io` for use in other parts of the application.
export const getIO = () => io;
