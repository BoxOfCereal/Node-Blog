const express = require("express");
const router = express.Router();
const db = require("../data/helpers/postDb");

router.get("/", async (req, res) => {
  try {
    const posts = await db.get();
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ error: "Could Not Retrieve Posts" });
  }
});

module.exports = router;
