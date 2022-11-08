const Router = require("express");
const router = new Router();
const orderController = require("./../controller/orderController");

router.get("/", orderController.getAllOrders);
router.post("/", orderController.createOrder);
router.post("/file", orderController.fileUpload);
module.exports = router;
