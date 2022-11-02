const { verifyToken } = require("../helpers/index");
const { User } = require("../models/index");
const chalk = require("chalk");

class Authentication {
  static async authentication(req, res, next) {
    try {
      // REQUIRE ACCESS TOKEN
      const { access_token } = req.headers;
      if (!access_token) {
        throw { name: "INVALID_TOKEN" };
      }

      // CHECK TOKEN IS VALID OR NOT
      const validToken = verifyToken(access_token);
      if (!validToken) {
        throw { name: "INVALID_TOKEN" };
      }

      // CHECK IF USER FOUND
      const user = await User.findByPk(validToken.id);
      if (!user) {
        throw { name: "DATA_NOT_FOUND" };
      }

      // PASSING DATA
      req.author = {
        id: user.id,
        email: user.email,
      };

      next();
      console.log(
        chalk.green("SUCCESS FROM AUTHENTICATION WITH USER : ", user.email)
      );
    } catch (error) {
      next(error);
      console.log(chalk.red("ERROR FROM AUTHENTICATION : "), error);
    }
  }
}

module.exports = Authentication;
