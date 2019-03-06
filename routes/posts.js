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

router.get("/:id", async ({ params: { id } }, res) => {
  try {
    const post = await db.getById(id);
    if (!post) res.status(404).json({ message: "Post Does Not Exist" });
    else res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ error: "Could Not Retrieve Post" });
  }
});

module.exports = router;
