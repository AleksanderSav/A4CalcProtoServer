const sequelize = require("../db_connection/sequelize");
const { DataTypes } = require("sequelize");

/////////////////////TASK MODEL///////////////////////////////////////////
const ToDo = sequelize.define("todo", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  message: { type: DataTypes.STRING },
  randomNumber: { type: DataTypes.INTEGER },
  highPriority: { type: DataTypes.BOOLEAN },
  owner: { type: DataTypes.STRING },
  createdDate: { type: DataTypes.STRING },
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
  priceCategory: { type: DataTypes.STRING },
  vinyl: { type: DataTypes.INTEGER },
  vinylPC: { type: DataTypes.INTEGER },
  banner: { type: DataTypes.INTEGER },
  photoPapper: { type: DataTypes.INTEGER },
});
//////////////////////////////
const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  randomNumber: { type: DataTypes.INTEGER },
  owner: { type: DataTypes.STRING },
  createdDate: { type: DataTypes.STRING },
});
const OrderItem = sequelize.define("orderItem", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  width: { type: DataTypes.STRING },
  height: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  count: { type: DataTypes.INTEGER },
  material: { type: DataTypes.STRING },
  lamination: { type: DataTypes.BOOLEAN },
  borderCut: { type: DataTypes.BOOLEAN },
  orderCategory: { type: DataTypes.STRING },
  price: { type: DataTypes.INTEGER },
  random: { type: DataTypes.INTEGER },
  totalArea: { type: DataTypes.INTEGER },
  onePcsArea: { type: DataTypes.INTEGER },
  onePcsCost: { type: DataTypes.INTEGER },
  totalCost: { type: DataTypes.INTEGER },
});

////////////////////
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
///////////////////////////////
module.exports = { ToDo, User, PriceList, Order, OrderItem };
