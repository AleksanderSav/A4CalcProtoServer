class UserController {
   async getOneUser(req, res) {
      try {
         console.log("Get one");
      } catch (e) {
         console.log(e);
      }
   }
   async getAllUsers() {
      console.log("Get all");
      try {
      } catch (e) {
         console.log(e);
      }
   }
   async createUser() {
      console.log("Create user");
      try {
      } catch (e) {
         console.log(e);
      }
   }
   async updateUser() {
      console.log("Update user");
      try {
      } catch (e) {
         console.log(e);
      }
   }
   async removeUser() {
      console.log("Remove user");
      try {
      } catch (e) {
         console.log(e);
      }
   }
}

module.exports = new UserController();
