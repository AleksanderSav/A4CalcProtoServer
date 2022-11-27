const Router = require("express");
const router = new Router();
const financeController = require("./../controller/financeController");

router.get(
  "/getCustomersWithNoPaidOrders",
  financeController.getCustomersWithNoPaidOrders
);

module.exports = router;
