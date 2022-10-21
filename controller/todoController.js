const {ToDo} = require("../dbModels/dbModels")

class TodoController {
   async todoGet(req, res) {
      try {
          res.json({ message: "response ok!" });
          console.log("todoGet1");


      } catch (e) {
         console.log(e);
      }
   }
   async todoPost(req,res) {
      try {
         const {message,randomNumber} = req.body
         const toDo = await ToDo.create({message,randomNumber})
         return res.json(toDo)

      } catch (e) {
         console.log(e);
      }
   }
   async todoRemove() {
      try {
         console.log("todoRemove");
      } catch (e) {
         console.log(e);
      }
   }
}

module.exports = new TodoController();
