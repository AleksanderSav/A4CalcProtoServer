const Router = require("express");
const router = new Router();
const financeController = require("./../controller/financeController");

router.get(
  "/getCustomersWithNoPaidOrders",
  financeController.getCustomersWithNoPaidOrders
);
router.put("/makePayment", financeController.makePayment);

module.exports = router;
