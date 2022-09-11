import dotenv from "dotenv";
import express from "express";


dotenv.config();

const app = express();
const port:number = Number(process.env.APP_PORT);
const cors = require("cors");

app.use(express.json())
app.use(cors());
app.use(require("./routes"));

app.listen(port,'0.0.0.0', () => {
  console.log("Server Escuchando en puerto", port);
});
