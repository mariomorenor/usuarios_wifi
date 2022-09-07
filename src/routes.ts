import express from "express";

import { User } from "./db";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Server Online :3");
});

router.post("/getUsers", async (req, res) => {
  let users = await User.findAll({ raw: true });
  res.send(users)
});

module.exports = router;
