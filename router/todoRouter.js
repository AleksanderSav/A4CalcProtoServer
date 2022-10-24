const Router = require('express')
const router = new Router()
const todoController = require("../controller/todoController")

router.get("/", todoController.todoGet)
router.post("/", todoController.todoPost)
router.put('/', todoController.todoUpdate)
router.delete("/", todoController.todoRemove)

module.exports = router