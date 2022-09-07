import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const User = sequelize.define("user", {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  name: DataTypes.STRING,
  last_name: DataTypes.STRING,
},{
    tableName:"usuarios",
    timestamps:false
});

User.removeAttribute("id");

User.sync();

export { User };
