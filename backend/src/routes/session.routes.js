import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createSession, endSession, getActiveSessions, getMyRecentSessions, getSessionById, joinSession } from "../controllers/session.controller.js";

const SessionRoutes = express.Router();

SessionRoutes.post("/", protectRoute, createSession);
SessionRoutes.get("/active-sessions", protectRoute, getActiveSessions);
SessionRoutes.get("/recent-sessions", protectRoute, getMyRecentSessions);

SessionRoutes.get("/:id", protectRoute, getSessionById);
SessionRoutes.get("/:id/join", protectRoute, joinSession);
SessionRoutes.get("/:id/end", protectRoute, endSession);

export default SessionRoutes;
