class TodoController {
   async todoGet(req, res) {
      try {
         res.json({ message: "response ok" });
         console.log("todoGet1");
      } catch (e) {
         console.log(e);
      }
   }
   async todoPost() {
      try {
         console.log("todoPost");
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
