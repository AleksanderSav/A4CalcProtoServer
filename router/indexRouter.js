const Router = require("express");
const router = new Router();
const todoRouter = require("./todoRouter");
const userRouter = require("./userRouter");
const priceRouter = require("./priceRouter");

router.use("/user", userRouter);
router.use("/todo", todoRouter);
router.use("/price", priceRouter);

module.exports = router;
