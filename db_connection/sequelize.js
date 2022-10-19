const Sequelize = require("sequelize");

module.exports = new Sequelize(
   process.env.DBNAME,
   process.env.DBUSER,
   process.env.DBPASS,
   {
      dialect: "postgres",
      host: process.env.DBHOST,
   }
);
