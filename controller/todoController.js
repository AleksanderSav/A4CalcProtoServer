const { ToDo } = require("../dbModels/dbModels");
const jwt = require('jsonwebtoken')

class TodoController {
   async todoGet(req, res) {
      try {
         const toDo = await ToDo.findAll();
         res.json(toDo);
      } catch (e) {
         console.log(e);
      }
   }
   async todoGetByOwner(req,res){
      try{
         const headers = req.headers.authorization.split(" ")[1]
         const decoded = jwt.verify(headers, "1234")
         const findTodo = await ToDo.findAll({where:{owner:decoded.alias}})
         res.json(findTodo)
      }catch (e){
         console.log(e)
      }
   }
   async todoPost(req, res) {
      try {
         const { message, randomNumber,highPriority } = req.body;
         const toDo = await ToDo.create({ message, randomNumber,highPriority });
         return res.json(toDo);
      } catch (e) {
         console.log(e);
      }
   }
   async todoPostByOwner(req, res) {
      try {
         const { message, randomNumber,highPriority,createdDate } = req.body;
         const headers = req.headers.authorization.split(" ")[1]
         const decoded = jwt.verify(headers, "1234")
         console.log(req.body,decoded.alias)
         const toDo = await ToDo.create({ message, randomNumber,highPriority,createdDate,owner:decoded.alias });
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
   async todoUpdate(req, res) {
      try {
         const { randomNumber, message,highPriority } = req.body;
         const find = await ToDo.findOne({ where: { randomNumber } });
         await find.update({
            message: message,
            highPriority:highPriority
         });
         res.json(find);
      } catch (e) {
         console.log(e);
      }
   }
}

module.exports = new TodoController();
