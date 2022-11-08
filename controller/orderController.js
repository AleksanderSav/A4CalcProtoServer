const { Order, OrderItem } = require("../dbModels/dbModels");
const path = require("path");
const fs = require("fs");

const fileNameArray = [];

class OrderController {
  async getAllOrders(req, res) {
    try {
      const findAll = await Order.findAll({
        include: {
          model: OrderItem,
        },
      });
      console.log(findAll);
      res.json(findAll);
    } catch (e) {
      console.log(e);
    }
  }
  async createOrder(req, res) {
    try {
      const orderItems = req.body.data;
      const number = (Math.random() * 100000).toFixed();
      const date = new Date().toLocaleString();
      const order = await Order.create({
        randomNumber: number,
        owner: "Администратор",
        createdDate: date,
      });
      ///////////////////////////////
      const findCurrentOrder = await Order.findOne({
        where: { randomNumber: number },
      });
      console.log(findCurrentOrder.id);
      orderItems.forEach(async (el) => {
        let {
          width,
          height,
          description,
          count,
          material,
          lamination,
          borderCut,
          orderCategory,
          price,
          random,
          totalArea,
          onePcsArea,
          onePcsCost,
          totalCost,
        } = el;
        const orderItem = await OrderItem.create({
          width,
          height,
          description,
          count,
          material,
          lamination,
          borderCut,
          orderCategory,
          price,
          random,
          totalArea,
          onePcsArea,
          onePcsCost,
          totalCost,
          orderId: findCurrentOrder.id,
        });
      });
      res.json(order);
    } catch (e) {
      console.log(e);
    }
  }
  async fileUpload(req, res) {
    try {
      const { name } = req.body;
      const { file } = req.files;
      const fileExtension = file.name.split(".")[1];
      await file.mv(
        path.resolve(__dirname, "..", "FILE", name + "." + fileExtension)
      );
      const adr = path.resolve(
        __dirname,
        "..",
        "FILE",
        name + "." + fileExtension
      );
      console.log(adr);
      fs.rename(
        adr,
        path.resolve(__dirname, "..", "test" + "." + fileExtension),
        (err) => {
          if (err) throw err; // не удалось переместить файл
          console.log("Файл успешно перемещён");
        }
      );

      // fs.mkdir(path.resolve(__dirname, "..", name), (err) => {
      //   if (err) throw err; // не удалось создать папку
      //   console.log("Папка успешно создана");
      // });
      res.json(name);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new OrderController();
