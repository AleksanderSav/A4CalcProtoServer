const Router = require("express");
const router = new Router();
const orderController = require("./../controller/orderController");

router.get("/", orderController.getAllOrders);
router.get("/searchOrdersByUser", orderController.searchOrdersByUser)
router.post("/", orderController.createOrder);
router.post("/file", orderController.fileUpload);
router.get("/download", orderController.fileDownload);
router.put("/changeStatus", orderController.changeOrderStatus);
router.get("/searchOrder", orderController.searchOrder);
router.get("/getOrdersByFilter", orderController.getOrdersByFilter);
router.put("/changeOrderPrice", orderController.changeOrderPrice);

module.exports = router;
