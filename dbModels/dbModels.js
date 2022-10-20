const sequelize = require("../db_connection/sequelize");
const { DataTypes } = require("sequelize");

const ToDo = sequelize.define("todo", {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   message: { type: DataTypes.STRING },
});

module.exports = { ToDo };
