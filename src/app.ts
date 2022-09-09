import dotenv from "dotenv";
import express from "express";


dotenv.config();

const app = express();
const port = process.env.APP_PORT;
const cors = require("cors");

app.use(cors());
app.use(require("./routes/routes"));

app.listen(port, () => {
  console.log("Server Escuchando en puerto", port);
});
