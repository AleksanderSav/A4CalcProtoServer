const Router = require("express");
const userController = require("../controller/userController");
const router = new Router();

router.get("/getOne/:id", userController.getOneUser);
router.get("/getall", userController.getAllUsers);
router.post("/", userController.createUser);
router.post("/login", userController.loginUser);
router.put("/", userController.updateUser); ///////
router.delete("/", userController.removeUser);
router.post("/searchUser", userController.searchUser);
//////////////////ADMIN PANEL///////////////////
router.get("/getAllAdmins", userController.getAllAdmins);
router.get("/getAllManagers", userController.getAllManagers);
router.get("/getAllWorkers", userController.getAllWorkers);
router.get("/getAllCustomers", userController.getAllCustomers);
//////////////////USER INFO PAGE////////////////////
router.post("/updateUserEmail", userController.updateUserEmail);
router.post("/updateUserPassword", userController.updateUserPassword);
router.post("/updateUserAlias", userController.updateUserAlias);
module.exports = router;
