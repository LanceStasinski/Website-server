"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CLIENT_URL = process.env.CLIENT_URL;
let io;
const socket = {
    init: (httpServer) => {
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
exports.default = socket;
