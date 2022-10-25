const Router = require("express");
const userController = require("../controller/userController");
const router = new Router();

router.get("/getone", userController.getOneUser);

module.exports = router;
