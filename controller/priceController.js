class PriceController {
   async getPrice(req, res) {
      try {
         console.log("ok");
         return res.json({ message: "Get price" });
      } catch (e) {
         console.log(e);
      }
   }
   async postPrice(req, res) {
      try {
         console.log("ok");
         return res.json({ message: "Post price" });
      } catch (e) {
         console.log(e);
      }
   }
   async updatePrice(req, res) {
      try {
         console.log("ok");
         return res.json({ message: "Update price" });
      } catch (e) {
         console.log(e);
      }
   }
   async removePrice(req, res) {
      try {
         console.log("ok");
         return res.json({ message: "Remove price" });
      } catch (e) {
         console.log(e);
      }
   }
}

module.exports = new PriceController();
