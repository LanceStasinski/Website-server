import dotenv from "dotenv";

dotenv.config();
const CLIENT_URL = process.env.CLIENT_URL;

let io: any;

const socket = {
  init: (httpServer: any) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: `${CLIENT_URL}`,
        methods: ["GET", "POST"],
      }
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized.");
    }
    return io;
  },
};

export default socket;
