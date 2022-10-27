const { where } = require("sequelize");
const { PriceList } = require("../dbModels/dbModels");

class PriceController {
   async getPrice(req, res) {
      try {
         const findPrice = await PriceList.findAll();
         return res.json(findPrice);
      } catch (e) {
         console.log(e);
      }
   }
   async postPrice(req, res) {
      try {
         const { vinyl, vinylPC, banner, photoPapper } = req.body;
         const priceList = await PriceList.create({
            vinyl,
            vinylPC,
            banner,
            photoPapper,
         });
         return res.json(priceList);
      } catch (e) {
         console.log(e);
      }
   }
   async updatePrice(req, res) {
      try {
         const { vinyl, vinylPC, banner, photoPapper } = req.body;
         const updatePrice = await PriceList.findOne({ where: { banner } });
         console.log(updatePrice);
         await updatePrice.update({
            vinyl: vinyl,
            vinylPC: vinylPC,
            banner: banner,
            photoPapper: photoPapper,
         });
         return res.json(updatePrice);
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
