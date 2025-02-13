const { verifToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authenticate(req, res, next) {
  let access_token = req.headers.authorization;
  try {
    if (!access_token) {
      throw { name: "invalidToken" };
    }
    let [bearer, token] = access_token.split(" ");
    if (bearer !== "Bearer") throw { name: "invalidToken" };
    let payload = verifToken(token);
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "404" };
    }
    req.user = {
        userId : user.id,
        email : user.email,
        role : user.role
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authenticate;
