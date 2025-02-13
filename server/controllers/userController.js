const { compareSync } = require("bcryptjs");
const { User} = require("../models");
const { signToken} = require("../helpers/jwt");

class userController {
  static async addUser(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      let data = await User.create({
        username: username,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        address: address,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res
        .status(201)
        .json({ message: { username, email, phoneNumber, address } });
    } catch (error) {
      next(error)
    }
  }

  static async userLogin(req, res, next) {
    try {
      const { username, email, password } = req.body;
      if (!email) {
        throw { name: "emailRequired" };
      }
      if (!password) {
        throw { name: "passwordRequired" };
      }
      let user = await User.findOne({ where: { email: email } });
      if (!user) {
        throw { name: "401" };
      }
      const isPassValid = compareSync(password, user.password);
      if (!isPassValid) {
        throw { name: "401" };
      }
      const token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      res.status(200).json({ access_token: token });
    } catch (error) {
      next(error)
      
    }
  }
}

module.exports = userController;
