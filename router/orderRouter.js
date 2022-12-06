const Router = require("express");
const router = new Router();
const orderController = require("./../controller/orderController");

router.get("/", orderController.getAllOrders);
router.post("/", orderController.createOrder);
router.post("/file", orderController.fileUpload);
router.get("/download", orderController.fileDownload);
router.put("/changeStatus", orderController.changeOrderStatus);
router.post("/searchOrder", orderController.searchOrder);

module.exports = router;
