import express from "express";

import { sequelize } from "../db";

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
  let [result, metadata] = await sequelize.query(
    `UPDATE radcheck SET value = '${req.body.user.value}' WHERE id = ${req.body.user.id}`
  );

  res.send(metadata);
});

router.post("/createUser", async (req, res) => {
  let user = req.body;
  try {
    let [result, metadata] = await sequelize.query(
      "INSERT INTO radcheck(id,identity,username,attribute,op,value,name,last_name,email,`career-unit`,`period-position`,date,`expire`,`status`) VALUES (0,:identity,:username,'Cleartext-Password',':=',:value,:name,:last_name,:email,:career,NULL,NOW(),NULL,1)",
      {
        replacements: {
          identity: user.identity,
          username: user.username,
          value: user.password,
          name: user.name,
          last_name: user.last_name,
          email: user.email,
          career: user.career,
        },
      }
    );

    res.send({ id: result });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/deleteUser", async (req, res) => {
  let [result, metadata] = await sequelize.query(
    `DELETE FROM radcheck WHERE id = :user_id`,
    {
      replacements: {
        user_id: req.body.user_id,
      },
    }
  );

  res.send(result);
});

module.exports = router;
