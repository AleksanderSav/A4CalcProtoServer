const Router = require("express");
const router = new Router();
const priceController = require("../controller/priceController");

router.get("/getRetailPrice", priceController.getRetailPrice);
router.get("/getWholesalePrice", priceController.getWholesalePrice);
router.post("/", priceController.postPrice);
router.put("/", priceController.updatePrice);
router.delete("/", priceController.removePrice);

module.exports = router;
