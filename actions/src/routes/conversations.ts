import express from "express";
import ConversationModel from "../models/Conversation";

const router = express.Router();

// GET all conversations of a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const conversations = await ConversationModel.find({
      members: userId,
    }).sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (e: any) {
    console.error("GET /conversations error:", e);
    res.status(500).json({ error: e.message });
  }
});

// Create or get private conversation between 2 users
router.post("/", async (req, res) => {
  try {
    const { userA, userB } = req.body;
    if (!userA || !userB) {
      return res.status(400).json({ error: "userA & userB required" });
    }

    const members = [userA, userB].sort();
    const roomId = members.join("_");

    let convo = await ConversationModel.findOne({ roomId });
    if (!convo) {
      convo = await ConversationModel.create({ roomId, members });
    }

    res.json(convo);
  } catch (e: any) {
    console.error("POST /conversations error:", e);
    res.status(500).json({ error: e.message });
  }
});

export default router;
