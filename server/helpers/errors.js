class Error {
  static async Error(err, req, res, next) {
    console.log(err, "<<<< FROM ERROR HANDLER");
    switch (err.name) {
      case "SequelizeUniqueConstraintError":
        const errors = err.errors.map((error) => error.message);
        res.status(400).json({
          message: errors,
        });
        break;

      case "SequelizeValidationError":
        const errors2 = err.errors.map((error) => error.message);
        res.status(400).json({
          message: errors2,
        });
        break;

      case "SequelizeDatabaseError":
        res.status(400).json({
          message: err,
        });
        break;

      case "CREDENTIAL_INVALID":
        res.status(401).json({
          message: "Invalid Email / Password",
        });
        break;

      case "INVALID_TOKEN":
        res.status(401).json({
          message: "Invalid Access Token",
        });
        break;

      case "ACCESS_DENIED":
        res.status(403).json({
          message: "You are unauthorized",
        });
        break;

      case "DATA_NOT_FOUND":
        res.status(404).json({
          message: "Data not found",
        });
        break;

      default:
        res.status(500).json({
          message: "Internal Server Error",
        });
        break;
    }
  }
}

module.exports = Error;
