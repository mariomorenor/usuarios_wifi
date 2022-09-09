import express from "express";

import { sequelize } from "../db/db";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Server Online :3");
});

router.post("/getUser/:key", async (req, res) => {
  
  let [user, metadata] = await sequelize.query(
    `SELECT * FROM radcheck WHERE identity LIKE '${req.params.key}%' OR username LIKE '${req.params.key}%'
                              LIMIT 20;`
  );

  res.send(user);
});

module.exports = router;
