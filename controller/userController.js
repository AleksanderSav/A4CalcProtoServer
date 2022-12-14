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
      console.log(id);
      const findOne = await User.findOne({ where: { alias: id } });
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
      let { limit, page } = req.query;
      limit = limit || 5;
      page = page || 1;
      const offset = page * limit - limit;
      const allUsers = await User.findAndCountAll({
        limit,
        offset,
        where: { role: "customer" },
      });
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
  //////////////////////////////////
  async searchUser(req, res) {
    try {
      const { word } = req.body;
      const search = await User.findAndCountAll({
        where: { alias: { [Op.iLike]: "%" + word + "%" } },
      });
      return res.json(search);
    } catch (e) {
      console.log(e);
    }
  }
  ///////////////////////////////////////////
  async getAllAdmins(req, res) {
    try {
      const getAllAdmins = await User.findAndCountAll({
        where: {
          role: "admin",
        },
      });
      return res.json(getAllAdmins);
    } catch (e) {
      console.log(e);
    }
  }
  async getAllWorkers(req, res) {
    try {
      const getAllWorkers = await User.findAndCountAll({
        where: {
          role: "worker",
        },
      });
      return res.json(getAllWorkers);
    } catch (e) {
      console.log(e);
    }
  }
  async getAllManagers(req, res) {
    try {
      const getAllManagers = await User.findAndCountAll({
        where: {
          role: "manager",
        },
      });
      return res.json(getAllManagers);
    } catch (e) {
      console.log(e);
    }
  }
  // async getOneUser(req, res) {
  //   try {
  //     const { id } = req.params;
  //     console.log(id);
  //     return res.json(id);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  ///////////////////////////
  async updateUserEmail(req, res) {
    try {
      const { email, alias } = req.body;
      const user = await User.findOne({ where: { alias } });
      await user.update({
        email: email,
      });
      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
  async updateUserPassword(req, res) {
    try {
      const { password, alias } = req.body;
      const user = await User.findOne({ where: { alias } });
      await user.update({
        password: password,
      });
      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
  async updateUserAlias(req, res) {
    try {
      const { email,alias} = req.body;
      const user = await User.findOne({ where: { email } });
      
      await user.update({
        alias: alias,
      });
      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new UserController();
