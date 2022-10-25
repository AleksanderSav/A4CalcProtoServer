const Router = require("express");
const router = new Router();
const todoRouter = require("./todoRouter");
const userRouter = require("./userRouter");

router.use("/user", userRouter);
router.use("/todo", todoRouter);

module.exports = router;
