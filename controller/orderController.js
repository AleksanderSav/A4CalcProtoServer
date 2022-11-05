const { Order, OrderItem } = require("../dbModels/dbModels");

class OrderController {
  async getAllOrders(req, res) {
    try {
      const findAll = await Order.findAll();
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
        owner: "test",
        createdDate: date,
      });
      ///////////////////////////////
      const findCurrentOrder = await Order.findOne({
        where: { randomNumber: number },
      });

      orderItems.forEach((el) => console.log(el.width));

      // orderItems.forEach(async (el) => {
      //   let {
      //     width,
      //     height,
      //     description,
      //     count,
      //     material,
      //     lamination,
      //     borderCut,
      //     orderCategory,
      //     price,
      //     random,
      //     totalArea,
      //     onePcsArea,
      //     onePcsCost,
      //     totalCost,
      //   } = el;
      //   const orderItem = await OrderItem.create({
      //     width,
      //     height,
      //     description,
      //     count,
      //     material,
      //     lamination,
      //     borderCut,
      //     orderCategory,
      //     price,
      //     random,
      //     totalArea,
      //     onePcsArea,
      //     onePcsCost,
      //     totalCost,
      //     orderid: findCurrentOrder.id,
      //   });
      // });
      res.json(order);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new OrderController();
