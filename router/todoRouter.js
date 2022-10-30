const Router = require('express')
const router = new Router()
const todoController = require("../controller/todoController")

router.get("/", todoController.todoGet)
router.get("/byOwner", todoController.todoGetByOwner)
router.post("/", todoController.todoPost)
router.post("/byOwner", todoController.todoPostByOwner)
router.put('/', todoController.todoUpdate)
router.delete("/", todoController.todoRemove)

module.exports = router