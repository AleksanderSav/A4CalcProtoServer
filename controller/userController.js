const { User } = require("../dbModels/dbModels");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const generateJWT = (id, email, alias, role, priceCategory) => {
  return jwt.sign({ id, email, alias, role, priceCategory }, "1234", {
    expiresIn: "24h",
  });
};

class UserController {
  /////////////////////////////////////////////
  async getOneUser(req, res) {
    try {
      const { id } = req.params;
      const findOne = await User.findOne({ where: { id } });
      if (findOne === null) {
        return res.json("User is not found");
      }
      return res.json(findOne);
    } catch (e) {
      console.log(e);
    }
  }
  ///////////////////////////////////////
  async getAllUsers(req, res) {
    try {
      const allUsers = await User.findAll();
      return res.json(allUsers);
    } catch (e) {
      console.log(e);
    }
  }
  /////////////////////////////////////
  async getAllCustomers(req, res) {
    try {
      const allUsers = await User.findAll({ where: { role: "customer" } });
      return res.json(allUsers);
    } catch (e) {
      console.log(e);
    }
  }
  /////////////////////////////////////////
  async createUser(req, res) {
    try {
      const { email, password, alias, role, priceCategory } = req.body;
      if (!email || !password) {
        return res.json({ message: "Enter login and password" });
      }
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return res.json({ message: "User already exist " });
      }

      const user = await User.create({
        email,
        password,
        alias,
        role,
        priceCategory,
      });
      const token = generateJWT(
        user.id,
        user.email,
        user.alias,
        user.role,
        user.priceCategory
      );
      return res.json({ token });
    } catch (e) {
      console.log(e);
    }
  }
  ////////////////////////////////////////
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.json({ message: "User not found" });
      }
      if (password !== user.password) {
        res.json({ message: "Password error" });
      }
      const token = generateJWT(
        user.id,
        user.email,
        user.alias,
        user.role,
        user.priceCategory
      );
      res.json({ token });
    } catch (e) {
      console.log(e);
    }
  }
  ////////////////////////////////////////////
  async updateUser(req, res) {
    try {
      const { email, password, alias, role, priceCategory } = req.body;
      const user = await User.findOne({ where: { email } });
      await user.update({
        email: email,
        password: password,
        alias: alias,
        role: role,
        priceCategory: priceCategory,
      });
      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
  /////////////////////////////////////////////////
  async removeUser(req, res) {
    try {
      const { email } = req.body;
      const user = await User.destroy({ where: { email } });
      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
  async search(req, res) {
    try {
      const { word } = req.body;
      const s = await User.findAll({
        where: { alias: { [Op.iLike]: "%" + word + "%" } },
      });
      return res.json(s);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new UserController();
