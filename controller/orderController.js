const { Order, OrderItem, User } = require("../dbModels/dbModels");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class OrderController {
  async getAllOrders(req, res) {
    try {
      let { limit, page } = req.query;
      limit = limit || 5;
      page = page || 1;
      const offset = page * limit - limit;
      const findAll = await Order.findAndCountAll({
        limit,
        offset,
        include: {
          model: OrderItem,
        },
        order: [["id", "DESC"]], // сортировка из базы по id заказа по убыванию
      });
      const countPages = await Order.findAndCountAll({});
      console.log(countPages);
      res.json({ findAll, countPages });
    } catch (e) {
      console.log(e);
    }
  }

  async createOrder(req, res) {
    try {
      //TODO ПАДАЕТ ЕСЛИ НЕ ПРИХОДИТ ФАЙЛ С КЛИЕНТА
      const orderItems = req.body.data;
      const orderMessage = req.body.orderMessage;

      const number = (Math.random() * 100000).toFixed();
      const date = new Date().toLocaleString();
      const findOrderOwner = await User.findOne({
        where: {
          alias: orderItems[0].orderOwner,
        },
      });
      console.log(findOrderOwner);
      const order = await Order.create({
        randomNumber: number,
        owner: orderItems[0].orderOwner,
        author: orderItems[0].orderAuthor,
        orderTotalCost: orderItems.reduce(function (sum, orderItem) {
          return sum + orderItem.totalCost;
        }, 0),
        orderMessage: orderMessage,
        orderStatus: "Заказ создан",
        createdDate: date,
        orderPaid: false,
        userId: findOrderOwner.id,
      });
      const orderDirPath = path.resolve(__dirname, "..", "ORDERS", number);
      await fs.mkdirSync(orderDirPath, { recursive: true });
      ///////////////////////////////
      const findCurrentOrder = await Order.findOne({
        where: { randomNumber: number },
      });
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
          filePath,
        } = el;
        let test = el.filePath.split(".");
        let ex = test[test.length - 1];
        console.log(el.path);

        let newName = path.resolve(
          orderDirPath,
          el.material +
            "_" +
            el.width +
            "x" +
            el.height +
            "_" +
            el.count +
            "шт" +
            "_" +
            (Math.random() * 10000).toFixed() +
            "." +
            ex
        );
        if (fs.existsSync(el.filePath)) {
          fs.renameSync(el.filePath, path.resolve(orderDirPath, newName));
        }
        
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
          filePath: newName,
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
      const { material, width, height, count, random } = req.body;
      const name = `${material}_${width}x${height}_${count}шт__${random}`;
      const { file } = req.files;
      console.log(req.files);
      const fileExtension = file.name.split(".")[1];
      await file.mv(
        path.resolve(
          __dirname,
          "..",
          "ORDERS",
          "FILE",
          name + "." + fileExtension
        )
      );
      const adr = path.resolve(
        __dirname,
        "..",
        "ORDERS",
        "FILE",
        name + "." + fileExtension
      );
      console.log(adr); //// отправить путь до файла в массив что бы потом при создании заказа пробежать по массиву и переместить все файлы
      // fs.rename( Перемещение из папки в другую папку
      //   adr,
      //   path.resolve(
      //     __dirname,
      //     "..",
      //     "ORDERS",
      //     "MOVED",
      //     "moved" + "." + fileExtension
      //   ),
      //   (err) => {
      //     if (err) throw err; // не удалось переместить файл
      //     console.log("Файл успешно перемещён");
      //   }
      // );
      /////

      // fs.mkdir(path.resolve(__dirname, "..", name), (err) => {
      //   if (err) throw err; // не удалось создать папку
      //   console.log("Папка успешно создана");
      // });
      res.json(adr);
    } catch (e) {
      console.log(e);
    }
  }
  async fileDownload(req, res) {
    try {
      res.download(req.query.path);
    } catch (e) {
      console.log(e);
    }
  }
  async changeOrderStatus(req, res) {
    try {
      const { status, randomNumber } = req.body;
      const findOrder = await Order.findOne({
        include: { model: OrderItem },
        where: { randomNumber },
      });
      const findOrderOwner = await User.findOne({
        include: {
          model: Order,
          where: { randomNumber },
        },
      });
      findOrder.update({ orderStatus: status });

      ////////////send to email
      let transporter = nodemailer.createTransport({
        // service: "gmail",
        // auth: {
        //   user: "a4yug1@gmail.com",
        //   pass: "jpko tvpe bmpu prrx",
        // },
        host: "mail.netangels.ru",
        secure: false,
        auth: {
          user: "robot@sprint-print.ru",
          pass: "sprint-print.ru",
        },
        tls: {
          ciphers: "SSLv3",
        },
      });
      let result = await transporter.sendMail({
        from: "robot@sprint-print.ru",
        to: findOrderOwner.email,
        subject: `Статус заказа ${randomNumber} изменился  `,
        html: `<h3>Статус вашего заказа изменился на ${status}</h3> <br>
                <h3>Здравствуйте,${
                  findOrderOwner.alias
                } статус вашего заказа изменился на ${status}</h3>
                <h3>Состав заказа:</h3><br>
                <table border="1">
                ${findOrder.orderItems.map(
                  (el) =>
                    `<tr><td style="padding: 20px"><h3>${el.orderCategory}</h3></td><td style="padding: 20px"><h3>${el.width}x${el.height}</h3></td><td style="padding: 20px"><h3>${el.count} шт</h3></td></tr>`
                )}
                </table>
                `,
      });
      console.log(result);
      res.json(findOrder);
    } catch (e) {
      console.log(e);
    }
  }
  async searchOrder(req, res) {
    try {
      const { word } = req.query;
      // const offset = page * limit - limit; //Пока без пагинации
      const findAll = await Order.findAndCountAll({
        // limit,
        // offset,
        where: { owner: { [Op.iLike]: "%" + word + "%" } },
        include: { model: OrderItem },
        order: [["id", "DESC"]],
      });
      const countPages = await Order.findAndCountAll({});
      res.json({ findAll, countPages });
    } catch (e) {
      console.log(e);
    }
  }
  async getOrdersByFilter(req, res) {
    try {
      const { filter } = req.query;
      console.log(filter);
      const findAll = await Order.findAndCountAll({
        // limit,
        // offset,
        where: { orderStatus: filter },
        include: { model: OrderItem },
        order: [["id", "DESC"]],
      });
      const countPages = await Order.findAndCountAll({});
      res.json({ findAll, countPages });
    } catch (e) {
      console.log(e);
    }
  }
  async changeOrderPrice(req, res) {
    try {
      const { newPrice, random } = req.body;
      const orderForUpdate = await OrderItem.findOne({ where: { random } });
      orderForUpdate.update({
        totalCost: newPrice,
        description: "Стоимость изменена администратором",
      });
      res.json(orderForUpdate);
    } catch (e) {
      console.log(e);
    }
  }
  async changeOrderPrice(req, res) {
    try {
      const { newPrice, random } = req.body;
      const orderForUpdate = await OrderItem.findOne({ where: { random } });
      orderForUpdate.update({
        totalCost: newPrice,
        description: "Стоимость изменена администратором",
      });
      res.json(orderForUpdate);
    } catch (e) {
      console.log(e);
    }
  }
  async searchOrdersByUser(req, res) {
    try {
      const { alias } = req.query;
      
      const findAll = await Order.findAndCountAll({
        // limit,
        // offset,
        where: { owner: alias },
        include: { model: OrderItem },
        order: [["id", "DESC"]],
      });
      const countPages = await Order.findAndCountAll({});
      res.json({ findAll, countPages });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new OrderController();
