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
  vinylPCLam: { type: DataTypes.INTEGER },
  banner: { type: DataTypes.INTEGER },
  photoPaper: { type: DataTypes.INTEGER },
  whiteVinylCut: { type: DataTypes.INTEGER },
  colorVinylCut: { type: DataTypes.INTEGER },
  cutOnly: { type: DataTypes.INTEGER },
  thermalVinyl: { type: DataTypes.INTEGER },
});
//////////////////////////////
const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  randomNumber: { type: DataTypes.INTEGER },
  owner: { type: DataTypes.STRING },
  author: { type: DataTypes.STRING },
  orderTotalCost: { type: DataTypes.FLOAT },
  orderStatus: { type: DataTypes.STRING },
  orderMessage: { type: DataTypes.STRING },
  orderPaid: { type: DataTypes.BOOLEAN },
  createdDate: { type: DataTypes.STRING },
});
const OrderItem = sequelize.define("orderItem", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  width: { type: DataTypes.FLOAT }, /////старое значение INTEGER (есть проблемы с добавление в базу чисел с плавающей запятой)
  height: { type: DataTypes.FLOAT }, /////старое значение INTEGER (есть проблемы с добавление в базу чисел с плавающей запятой)
  description: { type: DataTypes.STRING },
  count: { type: DataTypes.INTEGER },
  material: { type: DataTypes.STRING },
  lamination: { type: DataTypes.BOOLEAN },
  borderCut: { type: DataTypes.BOOLEAN },
  orderCategory: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT }, /////старое значение INTEGER (есть проблемы с добавление в базу чисел с плавающей запятой)
  random: { type: DataTypes.INTEGER },
  totalArea: { type: DataTypes.FLOAT }, /////старое значение INTEGER (есть проблемы с добавление в базу чисел с плавающей запятой)
  onePcsArea: { type: DataTypes.FLOAT }, /////старое значение INTEGER (есть проблемы с добавление в базу чисел с плавающей запятой)
  onePcsCost: { type: DataTypes.FLOAT }, /////старое значение INTEGER (есть проблемы с добавление в базу чисел с плавающей запятой)
  totalCost: { type: DataTypes.FLOAT }, /////старое значение INTEGER (есть проблемы с добавление в базу чисел с плавающей запятой)
  filePath: { type: DataTypes.STRING },
});

////////////////////
User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
///////////////////////////////
module.exports = { ToDo, User, PriceList, Order, OrderItem };
