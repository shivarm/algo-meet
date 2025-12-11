import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/session.model.js";

export const createSession = async (req, res) => {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user?._id;
    const clerkId = req.user?.clerkId;

    if (!problem || !difficulty) {
      return res.status(400).json({ message: "Problem and difficulty are required" });
    }

    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // create session in db
    const session = await Session.create({ problem, difficulty, host: userId, callId });

    // create stream video call
    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: { problem, difficulty, sessionId: session._id.toString() },
      },
    });

    // chat messaging
    const channel = chatClient.channel("messaging", callId, {
      name: `${problem} Session`,
      created_by_id: clerkId,
      members: [clerkId],
    });

    await channel.create();
    res.status(201).json({ session });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getActiveSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: "active" })
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name, profileImage email, clerkId")
      .sort({ createdAt: -1 })
      .limit(15);

    res.status(200).json({ sessions });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get sessions where user is either host or participant
export const getMyRecentSessions = async (req, res) => {
  try {
    const userId = req.user?._id;
    const sessions = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(15);

    res.status(200).json({ sessions });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await Session.findById(id)
      .populate("host", "name email profileImage clerkId")
      .populate("participant", "name email profileImage clerkId");

    if (!session) return res.status(404).json({ message: "Session not found" });
    res.status(200).json({ session });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
