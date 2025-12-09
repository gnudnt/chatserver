import express from "express";
const router = express.Router();

// Example endpoint
router.get("/", (req, res) => {
  res.json({ message: "User route placeholder" });
});

export default router;
