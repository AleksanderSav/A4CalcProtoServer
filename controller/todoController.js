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
         console.log(req.body)
         const { randomNumber } = req.body;
         const toDo = await ToDo.destroy({ where: { randomNumber } });
         return res.json(toDo);
      } catch (e) {
         console.log(e);
      }
   }
   async todoUpdate(req,res){
      try{
         console.log("put")
         const {randomNumber,message} = req.body
         console.log(message)
         const find = await ToDo.findOne({where:{randomNumber}})
         await find.update({
           message: message
         })
         res.json(find)
      }catch (e){

      }

   }
}

module.exports = new TodoController();
