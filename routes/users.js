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

module.exports = router;
