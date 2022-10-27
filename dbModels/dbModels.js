const sequelize = require("../db_connection/sequelize");
const { DataTypes } = require("sequelize");

/////////////////////TASK MODEL///////////////////////////////////////////
const ToDo = sequelize.define("todo", {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   message: { type: DataTypes.STRING },
   randomNumber: { type: DataTypes.INTEGER },
   highPriority: { type: DataTypes.BOOLEAN },
});
//////////////////////USER MODEL/////////////////////////////////
const User = sequelize.define("user", {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   email: { type: DataTypes.STRING },
   password: { type: DataTypes.STRING },
   alias: { type: DataTypes.STRING, unique: true },
   role: { type: DataTypes.STRING },
   priceCategory: { type: DataTypes.STRING },
});
//////////////////PRICE MODEL///////////////////
const PriceList = sequelize.define("priceList", {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   priceCategory: {type:DataTypes.STRING},
   vinyl: { type: DataTypes.INTEGER },
   vinylPC: { type: DataTypes.INTEGER },
   banner: { type: DataTypes.INTEGER },
   photoPapper: { type: DataTypes.INTEGER },
});

////////////////////
module.exports = { ToDo, User, PriceList };
