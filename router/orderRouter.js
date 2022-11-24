const Router = require("express");
const router = new Router();
const orderController = require("./../controller/orderController");

router.get("/", orderController.getAllOrders);
router.get("/getNotPaid", orderController.getNotPaidOrders);
router.get(
  "/getCustomersWithNoPaidOrders",
  orderController.getCustomersWithNoPaidOrders
);
router.post("/", orderController.createOrder);
router.post("/file", orderController.fileUpload);
router.get("/download", orderController.fileDownload);
module.exports = router;
