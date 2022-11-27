const Router = require("express");
const router = new Router();
const todoRouter = require("./todoRouter");
const userRouter = require("./userRouter");
const priceRouter = require("./priceRouter");
const orderRouter = require("./orderRouter");
const financeRouter = require("./financeRouter");

router.use("/user", userRouter);
router.use("/todo", todoRouter);
router.use("/price", priceRouter);
router.use("/order", orderRouter);
router.use("/finance", financeRouter);

module.exports = router;
