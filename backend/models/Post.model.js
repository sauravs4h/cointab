const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "posts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      //autoIncrement:true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { createdAt: false, updatedAt: false }
);

module.exports = { User };
