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

//write middleware to handle missing stuff
router.post("/", async ({ body: name }, res) => {
  try {
    if (!name) {
      res.status(400).json({
        errorMessage: "Please provide a name for the user."
      });
    } else {
      const user = await db.insert(name);
      res.status(201).json(user);
    }
  } catch (e) {
    res.status(500).json({ error: "Could Not Create the User" });
  }
});

//{ body: name } === const name = req.body
router.put("/:id", async ({ body: name, params: { id } }, res) => {
  try {
    if (!name) {
      res.status(400).json({
        errorMessage: "Please provide a name for the user."
      });
    } else {
      //returns number of users updated
      const updated = await db.update(id, name);
      if (!updated) {
        res.status(500).json({ error: "Could Not Update The User" });
      } else {
        const user = await db.getById(id);
        res.status(201).json(user);
      }
    }
  } catch (e) {
    res.status(500).json({ error: "Could Not Update the User" });
  }
});

router.get("/:id", async ({ params: { id } }, res) => {
  try {
    const user = await db.getById(id);
    if (user) res.status(200).json(user);
    else res.status(404).json({ error: "User Does Not Exist" });
  } catch (e) {
    res.status(500).json({ error: "Could Not Get User" });
  }
});

router.delete("/:id", async ({ params: { id } }, res) => {
  try {
    const count = await db.remove(id);
    if (count) res.status(200).json({ message: "User Deleted" });
    else res.status(404).json({ error: "Cannot Delete Nonexistent User" });
  } catch (e) {
    res.status(500).json({ error: "Could Not Delete User" });
  }
});

router.get("/:id/posts", async ({ params: { id } }, res) => {
  try {
    const posts = await db.getUserPosts(id);
    if (posts) res.status(200).json(posts);
    else
      res.status(404).json({ error: "Cannot Get Posts From Nonexistent User" });
  } catch (e) {
    res.status(500).json({ error: "Could Not Retrieve Posts" });
  }
});

module.exports = router;
