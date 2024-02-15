const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("sql8683965","sql8683965","yc46y6LN6I", {
  host: "sql8.freesqldatabase.com",
  dialect: "mysql",
});


module.exports = { sequelize };
