const Router = require("express");
const router = new Router();
const priceController = require("../controller/priceController");

router.get("/", priceController.getPrice);
router.post("/", priceController.postPrice);
router.put("/", priceController.updatePrice);
router.delete("/", priceController.removePrice);

module.exports = router;
