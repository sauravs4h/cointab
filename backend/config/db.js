const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("sql8683965",process.env.Sql_username,process.env.Sql_password, {
  host: "sql8.freesqldatabase.com",
  dialect: "mysql",
});


module.exports = { sequelize };
