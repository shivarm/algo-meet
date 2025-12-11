import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createSession, getActiveSessions, getMyRecentSessions, getSessionById } from "../controllers/session.controller.js";

const SessionRoutes = express.Router();

SessionRoutes.post("/", protectRoute, createSession);
SessionRoutes.get("/active-sessions", protectRoute, getActiveSessions);
SessionRoutes.get("/recent-sessions", protectRoute, getMyRecentSessions);

SessionRoutes.get("/:id", protectRoute, getSessionById);



export default SessionRoutes;
