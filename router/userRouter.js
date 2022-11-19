const Router = require("express");
const userController = require("../controller/userController");
const router = new Router();

router.get("/getone/:id", userController.getOneUser);
router.get("/getall", userController.getAllUsers);
router.get("/getAllCustomers", userController.getAllCustomers);
router.post("/", userController.createUser);
router.post("/login", userController.loginUser);
router.put("/", userController.updateUser); ///////
router.delete("/", userController.removeUser);

module.exports = router;
