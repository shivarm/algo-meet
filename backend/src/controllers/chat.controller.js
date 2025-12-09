import { chatClient } from "../lib/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    const token = chatClient.createToken(req.user?.clerkId);
    res.status(200).json({
      token,
      userId: req.user?.clerkId,
      userName: req.user?.name,
      userImg: req.user?.image,
    });
  } catch (error) {
    res.status(500).json({ mesaage: "Internal Server Error" });
  }
}
