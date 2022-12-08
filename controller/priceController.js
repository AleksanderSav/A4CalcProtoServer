const { where } = require("sequelize");
const { PriceList } = require("../dbModels/dbModels");

class PriceController {
   async getRetailPrice(req, res) { //Розничный прайс лист ищется по полю priceCategory с ключем "retail"
      try {
         const findPrice = await PriceList.findOne({where: {priceCategory:"retail"}});
         return res.json(findPrice);
      } catch (e) {
         console.log(e);
      }
   }
   async getWholesalePrice(req, res) { //Оптовый прайс лист ищется по полю priceCategory с ключем "wholesale"
      try {
         const findPrice = await PriceList.findOne({where: {priceCategory:"wholesale"}});
         return res.json(findPrice);
      } catch (e) {
         console.log(e);
      }
   }
   async postPrice(req, res) {
      try {
         const {priceCategory, vinyl, vinylPC, banner, photoPapper } = req.body;
         const priceList = await PriceList.create({
            priceCategory,
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
