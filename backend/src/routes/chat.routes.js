import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getStreamToken } from "../controllers/chat.controller.js";

const ChatRoutes = express.Router();

ChatRoutes.get("/token", protectRoute, getStreamToken);

export default ChatRoutes;