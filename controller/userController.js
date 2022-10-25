class UserController {
   async getOneUser(req, res) {
      try {
         return res.json({ message: "Get one" });
      } catch (e) {
         console.log(e);
      }
   }
   async getAllUsers(req, res) {
      try {
         return res.json({ message: "Get All" });
      } catch (e) {
         console.log(e);
      }
   }
   async createUser(req, res) {
      try {
         return res.json({ message: "Create" });
      } catch (e) {
         console.log(e);
      }
   }
   async updateUser(req, res) {
      try {
         return res.json({ message: "Update" });
      } catch (e) {
         console.log(e);
      }
   }
   async removeUser(req, res) {
      try {
         return res.json({ message: "Remove" });
      } catch (e) {
         console.log(e);
      }
   }
}

module.exports = new UserController();
