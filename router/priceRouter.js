const Router = require("express");
const router = new Router();
const priceController = require("../controller/priceController");

router.get("/getRetailPrice", priceController.getRetailPrice);
router.get("/getWholesalePrice", priceController.getWholesalePrice);
router.post("/", priceController.postPrice);
router.put("/updateRetailPrice", priceController.updateRetailPrice);
router.put("/updateWholesalePrice", priceController.updateWholesalePrice);
router.delete("/", priceController.removePrice);

module.exports = router;
