const { ToDo } = require("../dbModels/dbModels");

class TodoController {
   async todoGet(req, res) {
      try {
         const toDo = await ToDo.findAll();
         res.json(toDo);
      } catch (e) {
         console.log(e);
      }
   }
   async todoPost(req, res) {
      try {
         const { message, randomNumber } = req.body;
         const toDo = await ToDo.create({ message, randomNumber });
         return res.json(toDo);
      } catch (e) {
         console.log(e);
      }
   }
   async todoRemove(req, res) {
      try {
         const { randomNumber } = req.body;
         const toDo = await ToDo.destroy({ where: { randomNumber } });
         return res.json(toDo);
      } catch (e) {
         console.log(e);
      }
   }
}

module.exports = new TodoController();
