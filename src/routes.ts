import express from "express";

import { sequelize } from "./db";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Server Online :3");
});

router.post("/getUser", async (req, res) => {
  let [user, metadata] = await sequelize.query(
    `SELECT * 
                              FROM radcheck 
                              WHERE identity LIKE '${req.body.identity}%'
                              OR username LIKE '%${req.body.identity.toLowerCase()}%'
                              LIMIT 20`
  );

  res.send(user);
});

router.post("/updatePassword", async (req, res) => {
  console.log(req.body);

  let [result, metadata] = await sequelize.query(
    `UPDATE radcheck SET value = '${req.body.user.value}' WHERE id = ${req.body.user.id}`
  );
  
  res.send(metadata);
});

module.exports = router;
