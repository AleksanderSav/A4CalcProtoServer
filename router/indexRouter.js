const Router = require("express");
const router = new Router();
const todoRouter = require("./todoRouter")

router.use("/todo",todoRouter)

module.exports = router;
