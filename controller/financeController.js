const { Order, User } = require("../dbModels/dbModels");

class FinanceController {
  async getCustomersWithNoPaidOrders(req, res) {
    try {
      const find = await User.findAll({
        include: {
          model: Order,
          where: {
            orderPaid: false,
          },
        },
      });
      res.json(find);
    } catch (e) {
      console.log(e);
    }
  }
  async makePayment(req, res) {
    try {
      const { randomNumber } = req.body;
      const findOrder = await Order.findOne({
        where: {
          randomNumber: randomNumber,
        },
      });
      await findOrder.update({ orderPaid: true });
      res.json(findOrder);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new FinanceController();
