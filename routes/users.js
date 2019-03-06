const express = require("express");
const router = express.Router();
const db = require("../data/helpers/userDb");

router.get("/", async (req, res) => {
  try {
    const users = await db.get();
    res.status(200).json(users);
  } catch (e) {
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

module.exports = router;
