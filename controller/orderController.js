const { Order, OrderItem } = require("../dbModels/dbModels");
const path = require("path");
const fs = require("fs");

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
        fs.renameSync(el.filePath, path.resolve(orderDirPath, newName));
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
      // orderItems.forEach((file) => {
      //   let test = file.path.split(".");
      //   let ex = test[test.length - 1];
      //   console.log(file.path);
      //   fs.renameSync(
      //     file.path,
      //     path.resolve(
      //       orderDirPath,
      //       file.material +
      //         "_" +
      //         file.width +
      //         "x" +
      //         file.height +
      //         "_" +
      //         file.count +
      //         "шт" +
      //         "_" +
      //         (Math.random() * 10000).toFixed() +
      //         "." +
      //         ex
      //     )
      //   );
      // });
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
}

module.exports = new OrderController();
